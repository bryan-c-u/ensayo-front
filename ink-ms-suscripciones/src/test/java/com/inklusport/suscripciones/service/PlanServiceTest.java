package com.inklusport.suscripciones.service;

import com.inklusport.suscripciones.dto.PlanResponse;
import com.inklusport.suscripciones.entity.Plan;
import com.inklusport.suscripciones.repository.BeneficioPlanRepository;
import com.inklusport.suscripciones.repository.PlanRepository;
import com.inklusport.suscripciones.repository.SuscripcionRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class PlanServiceTest {

    @Mock
    private PlanRepository planRepository;

    @Mock
    private BeneficioPlanRepository beneficioPlanRepository;

    @Mock
    private SuscripcionRepository suscripcionRepository;

    @InjectMocks
    private PlanService planService;

    @Test
    void desactivar_debeApagarElFlagActivoYPersistir() {
        Plan plan = new Plan();
        plan.setId(1L);
        plan.setNombre("Basico");
        plan.setPrecio(new BigDecimal("49900.00"));
        plan.setLimiteEventosMes(10);
        plan.setPorcentajeComision(new BigDecimal("5.00"));
        plan.setDuracionDias(30);
        plan.setActivo(true);

        when(planRepository.findById(1L)).thenReturn(Optional.of(plan));
        when(planRepository.save(plan)).thenReturn(plan);
        when(beneficioPlanRepository.findByPlanId(1L)).thenReturn(List.of());

        PlanResponse response = planService.desactivar(1L);

        assertFalse(response.getActivo());
        assertFalse(plan.getActivo());
        assertEquals("Basico", response.getNombre());
    }
}
