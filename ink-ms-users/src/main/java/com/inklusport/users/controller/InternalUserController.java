package com.inklusport.users.controller;

import com.inklusport.users.dto.InternalUserResponse;
import com.inklusport.users.service.RoleService;
import com.inklusport.users.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Endpoints internos para consumo entre microservicios.
 * Flujo:
 * 1) Resolucion de roles por email para autorizacion interna
 * 2) Listado completo de usuarios, para que ink-ms-search sincronice su
 *    indice de busqueda (M07)
 */
@RestController
@RequestMapping("/api/internal/users")
@RequiredArgsConstructor
public class InternalUserController {

    private final RoleService roleService;
    private final UserService userService;

    // ===== Bloque 1: Resolucion de roles =====
    /**
     * Retorna los roles de un usuario por correo para validaciones internas.
     */
    @GetMapping("/roles-by-email")
    public List<String> getUserRoles(@RequestParam String email) {
        return roleService.getUserRoles(email);
    }

    // ===== Bloque 2: Sincronizacion para ink-ms-search =====
    /**
     * Retorna una vista minima de todos los usuarios, usada por el
     * microservicio de busqueda/filtros (M07) para mantener su indice al
     * dia. No incluye bio, foto de perfil ni solicitudes de rol pendientes.
     */
    @GetMapping
    public List<InternalUserResponse> getAllUsers() {
        return userService.getAllUsers().stream()
                .map(u -> InternalUserResponse.builder()
                        .id(u.getId())
                        .email(u.getEmail())
                        .fullName(u.getFullName())
                        .phone(u.getPhone())
                        .disability(u.getDisability())
                        .isActive(u.getIsActive())
                        .createdAt(u.getCreatedAt())
                        .updatedAt(u.getUpdatedAt())
                        .roles(u.getRoles())
                        .build())
                .toList();
    }
}
