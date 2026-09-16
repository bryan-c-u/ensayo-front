package com.inklusport.sports.controller;

import com.inklusport.sports.dto.InternalRegistrationResponse;
import com.inklusport.sports.dto.RegistrationResponse;
import com.inklusport.sports.service.RegistrationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Endpoints internos para consumo entre microservicios (sin autenticacion de
 * usuario final, protegidos a nivel de red/gateway).
 * Usado por ink-ms-search (M07) para RF37: filtrar inscritos por evento.
 */
@RestController
@RequestMapping("/api/internal/registrations")
@RequiredArgsConstructor
public class InternalController {

    private final RegistrationService registrationService;

    @GetMapping("/event/{eventId}")
    public ResponseEntity<List<InternalRegistrationResponse>> getRegistrationsByEvent(@PathVariable String eventId) {
        return ResponseEntity.ok(registrationService.getRegistrationsForEvent(eventId));
    }

    /**
     * Invocado por ink-ms-subscriptions (RF57) cuando un pago de inscripcion a
     * evento queda APROBADO, para crear recien ahi la inscripcion real. Idempotente:
     * si ya existe (p. ej. el webhook de Mercado Pago reintento la notificacion), no
     * duplica.
     */
    @PostMapping("/eventos/{eventoId}/usuarios/{email}/pago-confirmado")
    public ResponseEntity<RegistrationResponse> confirmarInscripcionPagada(@PathVariable String eventoId,
                                                                            @PathVariable String email) {
        return ResponseEntity.ok(registrationService.confirmarInscripcionPagada(eventoId, email));
    }
}
