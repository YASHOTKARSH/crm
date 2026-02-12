package com.yash.crm.controller;

import com.yash.crm.entity.User;
import com.yash.crm.repository.UserRepository;
import com.yash.crm.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;
    private final UserRepository userRepository;

    private User getLoggedInUser(Authentication authentication) {
        return userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @GetMapping("/admin/dashboard")
    public Map<String, Object> adminDashboard() {
        return dashboardService.getAdminDashboard();
    }

    @GetMapping("/employee/dashboard")
    public Map<String, Object> employeeDashboard(Authentication authentication) {
        User user = getLoggedInUser(authentication);
        return dashboardService.getEmployeeDashboard(user.getId());
    }

    @GetMapping("/teamlead/dashboard")
    public Map<String, Object> teamLeadDashboard(Authentication authentication) {
        User user = getLoggedInUser(authentication);
        return dashboardService.getTeamLeadDashboard(user.getId());
    }

    @GetMapping("/manager/dashboard")
    public Map<String, Object> managerDashboard(Authentication authentication) {
        User user = getLoggedInUser(authentication);
        return dashboardService.getManagerDashboard(user.getId());
    }
}
