package com.yash.crm.repository;

import com.yash.crm.entity.Lead;
import com.yash.crm.entity.LeadStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LeadRepository extends JpaRepository<Lead, Long> {

    long countByStatus(LeadStatus status);

    long countByAssignedToId(Long userId);

    long countByAssignedToIdAndStatus(Long userId, LeadStatus status);

    List<Lead> findByAssignedToId(Long userId);
}
