package com.inklusport.users.service;

import com.inklusport.users.dto.AssignRoleRequest;
import com.inklusport.users.dto.ReviewRoleRequest;
import com.inklusport.users.dto.RoleRequestResponse;
import com.inklusport.users.entity.Role;
import com.inklusport.users.entity.RoleRequest;
import com.inklusport.users.entity.User;
import com.inklusport.users.enums.RoleRequestStatus;
import com.inklusport.users.repository.RoleRepository;
import com.inklusport.users.repository.RoleRequestRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Gestiona las solicitudes de rol (ENTRENADOR/ORGANIZADOR) que requieren
 * revision de un administrador antes de quedar activas.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class RoleRequestService {

    private final RoleRequestRepository roleRequestRepository;
    private final RoleRepository roleRepository;
    private final RoleService roleService;

    /**
     * Crea una solicitud pendiente para que el usuario obtenga el rol indicado.
     */
    @Transactional
    public RoleRequestResponse createRoleRequest(User user, String requestedRoleName) {
        Role role = roleRepository.findByName(requestedRoleName)
                .orElseThrow(() -> new RuntimeException("Rol no reconocido: " + requestedRoleName));

        RoleRequest roleRequest = RoleRequest.builder()
                .user(user)
                .requestedRole(role)
                .status(RoleRequestStatus.PENDING)
                .build();

        RoleRequest saved = roleRequestRepository.save(roleRequest);
        log.info("Solicitud de rol {} creada para {}", requestedRoleName, user.getEmail());

        return convertToResponse(saved);
    }

    /**
     * Devuelve la solicitud pendiente mas reciente del usuario, o null si no tiene.
     * Usado para exponer el estado de la solicitud en el perfil.
     */
    @Transactional(readOnly = true)
    public RoleRequestResponse getLatestPendingRequestForUser(String userId) {
        return roleRequestRepository.findByUserIdOrderByRequestedAtDesc(userId).stream()
                .filter(r -> r.getStatus() == RoleRequestStatus.PENDING)
                .findFirst()
                .map(this::convertToResponse)
                .orElse(null);
    }

    @Transactional(readOnly = true)
    public Page<RoleRequestResponse> getRequestsByStatus(RoleRequestStatus status, Pageable pageable) {
        return roleRequestRepository.findByStatus(status, pageable).map(this::convertToResponse);
    }

    /**
     * Aprueba una solicitud: asigna el rol solicitado reutilizando RoleService
     * y marca la solicitud como aprobada.
     */
    @Transactional
    public RoleRequestResponse approve(String requestId, String adminEmail, ReviewRoleRequest body) {
        RoleRequest roleRequest = getPendingOrThrow(requestId);

        AssignRoleRequest assignRoleRequest = new AssignRoleRequest();
        assignRoleRequest.setRoleId(roleRequest.getRequestedRole().getId());
        roleService.assignRoleToUser(roleRequest.getUser().getEmail(), assignRoleRequest, adminEmail);

        roleRequest.setStatus(RoleRequestStatus.APPROVED);
        roleRequest.setReviewedBy(adminEmail);
        roleRequest.setReviewedAt(java.time.LocalDateTime.now());
        roleRequest.setReviewNotes(body != null ? body.getNotes() : null);

        RoleRequest saved = roleRequestRepository.save(roleRequest);
        log.info("Solicitud de rol {} aprobada por {}", requestId, adminEmail);

        return convertToResponse(saved);
    }

    /**
     * Rechaza una solicitud: el usuario conserva unicamente el rol USUARIO base.
     */
    @Transactional
    public RoleRequestResponse reject(String requestId, String adminEmail, ReviewRoleRequest body) {
        RoleRequest roleRequest = getPendingOrThrow(requestId);

        roleRequest.setStatus(RoleRequestStatus.REJECTED);
        roleRequest.setReviewedBy(adminEmail);
        roleRequest.setReviewedAt(java.time.LocalDateTime.now());
        roleRequest.setReviewNotes(body != null ? body.getNotes() : null);

        RoleRequest saved = roleRequestRepository.save(roleRequest);
        log.info("Solicitud de rol {} rechazada por {}", requestId, adminEmail);

        return convertToResponse(saved);
    }

    private RoleRequest getPendingOrThrow(String requestId) {
        RoleRequest roleRequest = roleRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Solicitud de rol no encontrada: " + requestId));

        if (roleRequest.getStatus() != RoleRequestStatus.PENDING) {
            throw new RuntimeException("La solicitud ya fue revisada (" + roleRequest.getStatus() + ")");
        }

        return roleRequest;
    }

    private RoleRequestResponse convertToResponse(RoleRequest roleRequest) {
        return RoleRequestResponse.builder()
                .id(roleRequest.getId())
                .userEmail(roleRequest.getUser().getEmail())
                .userFullName(roleRequest.getUser().getFullName())
                .requestedRole(roleRequest.getRequestedRole().getName())
                .status(roleRequest.getStatus().name())
                .requestedAt(roleRequest.getRequestedAt())
                .reviewedBy(roleRequest.getReviewedBy())
                .reviewedAt(roleRequest.getReviewedAt())
                .reviewNotes(roleRequest.getReviewNotes())
                .build();
    }
}
