-- V2__add_role_request.sql
-- Solicitudes de rol (ENTRENADOR/ORGANIZADOR) pendientes de aprobacion por un ADMIN.

CREATE TABLE role_request (
    id CHAR(36) PRIMARY KEY,
    user_id CHAR(36) NOT NULL,
    requested_role_id INT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    requested_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    reviewed_by CHAR(36),
    reviewed_at DATETIME,
    review_notes TEXT,
    FOREIGN KEY (user_id) REFERENCES user_profile(id),
    FOREIGN KEY (requested_role_id) REFERENCES role(id)
);
