package com.inklusport.search;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.scheduling.annotation.EnableScheduling;

/**
 * Microservicio de Administracion y Filtros (M07).
 * Mantiene un indice de solo lectura (MongoDB) de usuarios, deportes, eventos y
 * discapacidades sincronizado desde ink-ms-users e ink-ms-sports, para exponer
 * busquedas y filtros avanzados sin sobrecargar los microservicios de origen.
 */
@SpringBootApplication
@EnableFeignClients
@EnableScheduling
public class SearchApplication {
    public static void main(String[] args) {
        SpringApplication.run(SearchApplication.class, args);
    }
}
