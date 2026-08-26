package com.inklusport.sports.dto;

import lombok.*;
import java.time.LocalDateTime;

/**
 * Vista minima de una inscripcion para consumo entre microservicios (ej.
 * ink-ms-search, RF37). Este endpoint es permitAll a nivel de red interna,
 * asi que deliberadamente NO incluye el qrCode (credencial de check-in del
 * evento) que si trae RegistrationResponse.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InternalRegistrationResponse {
    private String id;
    private String userId;
    private String eventId;
    private String eventName;
    private LocalDateTime registrationDate;
    private Boolean attended;
    private Integer waitlistPosition;
}
