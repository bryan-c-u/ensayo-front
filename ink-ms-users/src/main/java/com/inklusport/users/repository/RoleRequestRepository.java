package com.inklusport.users.repository;

import com.inklusport.users.entity.RoleRequest;
import com.inklusport.users.enums.RoleRequestStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoleRequestRepository extends JpaRepository<RoleRequest, String> {

    Page<RoleRequest> findByStatus(RoleRequestStatus status, Pageable pageable);

    List<RoleRequest> findByUserIdOrderByRequestedAtDesc(String userId);
}
