package com.inklusport.users.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Vista minima de un usuario para consumo entre microservicios (ej.
 * ink-ms-search, M07). Deliberadamente NO incluye bio, foto de perfil ni
 * solicitudes de rol pendientes: ese endpoint es permitAll a nivel de
 * red interna, asi que solo expone lo que un indice de busqueda necesita.
 */
@Data
@Builder
public class InternalUserResponse {
    private String id;
    private String email;
    private String fullName;
    private String phone;
    private String disability;
    private Boolean isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<String> roles;
}
