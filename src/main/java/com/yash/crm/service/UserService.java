package com.yash.crm.service;

import com.yash.crm.dto.CreateUserRequest;
import com.yash.crm.entity.Role;
import com.yash.crm.entity.User;
import com.yash.crm.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public User createUser(CreateUserRequest request) {

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());

        // 🔥 Hierarchy Logic

        if (request.getRole() == Role.TEAM_LEAD) {
            if (request.getManagerId() == null) {
                throw new RuntimeException("Team Lead must have managerId");
            }
            User manager = userRepository.findById(request.getManagerId())
                    .orElseThrow(() -> new RuntimeException("Manager not found"));

            user.setManager(manager);
        }

        if (request.getRole() == Role.EMPLOYEE) {
            if (request.getTeamLeadId() == null) {
                throw new RuntimeException("Employee must have teamLeadId");
            }
            User teamLead = userRepository.findById(request.getTeamLeadId())
                    .orElseThrow(() -> new RuntimeException("Team Lead not found"));

            user.setTeamLead(teamLead);
        }

        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
