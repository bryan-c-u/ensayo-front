package com.inklusport.users.service;

import com.inklusport.users.dto.AssignRoleRequest;
import com.inklusport.users.dto.UpdateProfileRequest;
import com.inklusport.users.dto.UserProfileResponse;
import com.inklusport.users.entity.Role;
import com.inklusport.users.entity.User;
import com.inklusport.users.repository.RoleRepository;
import com.inklusport.users.repository.UserRepository;
import com.inklusport.users.repository.UserRoleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Servicio de perfil de usuario.
 * Centraliza alta, consulta, actualización y activación/desactivación.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private static final String ROLE_USUARIO = "USUARIO";
    private static final Set<String> SELF_REQUESTABLE_ROLES = Set.of("USUARIO", "ENTRENADOR", "ORGANIZADOR");

    /**
     * Se inyectan dependencias importadas de los repositorios
     */
    private final UserRepository userRepository;
    private final UserRoleRepository userRoleRepository;
    private final RoleRepository roleRepository;
    private final RoleService roleService;
    private final RoleRequestService roleRequestService;

    /**
     * Crea perfil base del usuario autenticado y resuelve el rol solicitado:
     * USUARIO se asigna de inmediato; ENTRENADOR/ORGANIZADOR quedan como
     * USUARIO mientras un administrador aprueba la solicitud de rol.
     */
    @Transactional
    public UserProfileResponse createUserProfile(String email, String fullName, String requestedRole) {
        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("El usuario ya existe");
        }

        String normalizedRole = StringUtils.hasText(requestedRole)
                ? requestedRole.trim().toUpperCase()
                : ROLE_USUARIO;

        if (!SELF_REQUESTABLE_ROLES.contains(normalizedRole)) {
            throw new RuntimeException("Rol solicitado no valido: " + requestedRole);
        }

        User user = new User();
        user.setEmail(email);
        user.setFullName(fullName);
        user.setActive(true);

        User savedUser = userRepository.save(user);

        Role usuarioRole = roleRepository.findByName(ROLE_USUARIO)
                .orElseThrow(() -> new RuntimeException("Rol base USUARIO no encontrado"));
        AssignRoleRequest baseRoleRequest = new AssignRoleRequest();
        baseRoleRequest.setRoleId(usuarioRole.getId());
        roleService.assignRoleToUser(email, baseRoleRequest, "SYSTEM");

        if (!normalizedRole.equals(ROLE_USUARIO)) {
            roleRequestService.createRoleRequest(savedUser, normalizedRole);
        }

        log.info("Perfil de usuario creado: {} (rol solicitado: {})", email, normalizedRole);

        return convertToResponse(savedUser);
    }

    /**
     * Consulta perfil por email.
     */
    @Transactional(readOnly = true)
    public UserProfileResponse getUserProfileByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con email: " + email));
        return convertToResponse(user);
    }

    /**
     * Consulta perfil por id.
     */
    @Transactional(readOnly = true)
    public UserProfileResponse getUserProfileById(String id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con ID: " + id));
        return convertToResponse(user);
    }

    /**
     * Actualiza solo campos enviados en el request.
     */
    @Transactional
    public UserProfileResponse updateUserProfile(String email, UpdateProfileRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        
        if (request.getFullName() != null) {
            user.setFullName(request.getFullName());
        }

        if (request.getPhone() != null) {
            user.setPhone(request.getPhone());
        }

        if (request.getProfilePicture() != null) {
            user.setProfilePicture(request.getProfilePicture());
        }

        if (request.getBio() != null) {
            user.setBio(request.getBio());
        }

        if (request.getDisability() != null) {
            user.setDisability(request.getDisability());
        }

        User updateUser = userRepository.save(user);
        log.info("Perfil actualizado: {}", email);

        return convertToResponse(updateUser);
    }

    /**
     * Desactiva usuario por correo.
     */
    @Transactional
    public void desactivateUser(String email) {
        userRepository.deactivateUser(email);
        log.info("Usuario desactivado: {}", email);
    }

    /**
     * Reactiva usuario por correo.
     */
    @Transactional
    public void activateUser(String email) {
        userRepository.activateUser(email);
        log.info("Usuario activado: {}", email);
    }

    /**
     * Lista todos los perfiles.
     */
    @Transactional(readOnly = true)
    public List<UserProfileResponse> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Lista solo perfiles activos.
     */
    @Transactional(readOnly = true)
    public List<UserProfileResponse> getActivateUsers() {
        return userRepository.findByIsActiveTrue().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Verifica existencia de usuario por email.
     */
    @Transactional(readOnly = true)
    public boolean userExists(String email) {
        return userRepository.existsByEmail(email);
    }

    /**
     * Mapea entidad User a DTO de salida con roles incluidos.
     */
    private UserProfileResponse convertToResponse(User user) {
        List<String> roles = userRoleRepository.findRoleNamesByUserId(user.getId());

        return UserProfileResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .phone(user.getPhone())
                .profilePicture(user.getProfilePicture())
                .bio(user.getBio())
                .disability(user.getDisability())
                .isActive(user.isActive())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .roles(roles)
                .pendingRoleRequest(roleRequestService.getLatestPendingRequestForUser(user.getId()))
                .build();
    }
}
