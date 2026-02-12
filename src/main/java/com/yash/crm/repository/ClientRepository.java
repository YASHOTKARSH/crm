package com.yash.crm.repository;

import com.yash.crm.entity.Client;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClientRepository extends JpaRepository<Client, Long> {

    List<Client> findByAssignedEmployeeId(Long userId);
}
