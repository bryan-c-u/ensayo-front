package com.inklusport.suscripciones.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.inklusport.suscripciones.config.JwtAuthenticationFilter;
import com.inklusport.suscripciones.config.SecurityConfig;
import com.inklusport.suscripciones.dto.SuscripcionResponse;
import com.inklusport.suscripciones.enums.EstadoSuscripcion;
import com.inklusport.suscripciones.exception.GlobalExceptionHandler;
import com.inklusport.suscripciones.security.JwtTokenProvider;
import com.inklusport.suscripciones.service.SuscripcionService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = AdminSuscripcionController.class)
@Import({SecurityConfig.class, JwtAuthenticationFilter.class, JwtTokenProvider.class,
        GlobalExceptionHandler.class, AdminSuscripcionControllerSecurityTest.JacksonTestConfig.class})
@TestPropertySource(properties = {
        "jwt.secret=inklusport2024superSecretKeyForJWTtokenGenerationWith512bitsAlgorithmHS512",
        "jwt.expiration=86400000"
})
class AdminSuscripcionControllerSecurityTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @MockBean
    private SuscripcionService suscripcionService;

    @Test
    void cambiarEstado_conTokenAdmin_devuelve200() throws Exception {
        when(suscripcionService.cambiarEstado(1L, EstadoSuscripcion.SUSPENDIDA)).thenReturn(
                SuscripcionResponse.builder().id(1L).estado(EstadoSuscripcion.SUSPENDIDA).build()
        );

        String token = jwtTokenProvider.generateToken("admin@test.com", List.of("ADMIN"));

        mockMvc.perform(patch("/api/suscripciones/admin/1/estado")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"estado\":\"SUSPENDIDA\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.estado").value("SUSPENDIDA"));
    }

    @Test
    void cambiarEstado_conTokenOrganizador_devuelve403() throws Exception {
        String token = jwtTokenProvider.generateToken("organizador@test.com", List.of("ORGANIZADOR"));

        mockMvc.perform(patch("/api/suscripciones/admin/1/estado")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"estado\":\"SUSPENDIDA\"}"))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.message").value("Acceso denegado"));
    }

    @Test
    void cambiarEstado_sinToken_devuelve401() throws Exception {
        mockMvc.perform(patch("/api/suscripciones/admin/1/estado")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"estado\":\"SUSPENDIDA\"}"))
                .andExpect(status().isUnauthorized());
    }

    @TestConfiguration
    static class JacksonTestConfig {
        @Bean
        ObjectMapper objectMapper() {
            return new ObjectMapper().registerModule(new JavaTimeModule());
        }
    }
}
