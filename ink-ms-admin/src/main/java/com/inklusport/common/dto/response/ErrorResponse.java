package com.inklusport.common.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * DTO de error estandar. Originalmente vivia en el modulo compartido ink-ms-common,
 * que no esta disponible en este repo independiente; se recrea aqui para que
 * GlobalExceptionHandler siga compilando sin cambios de codigo.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ErrorResponse {
    private LocalDateTime timestamp;
    private int status;
    private String error;
    private String message;
    private String path;
}
