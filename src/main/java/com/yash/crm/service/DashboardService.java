package com.yash.crm.service;

import com.yash.crm.entity.LeadStatus;
import com.yash.crm.entity.User;
import com.yash.crm.repository.ClientRepository;
import com.yash.crm.repository.LeadRepository;
import com.yash.crm.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final LeadRepository leadRepository;
    private final ClientRepository clientRepository;
    private final UserRepository userRepository;

    // ADMIN DASHBOARD
    public Map<String, Object> getAdminDashboard() {

        Map<String, Object> data = new HashMap<>();

        long totalLeads = leadRepository.count();
        long convertedLeads = leadRepository.countByStatus(LeadStatus.CONVERTED);
        long totalClients = clientRepository.count();
        long totalUsers = userRepository.count();

        double conversionRate = totalLeads == 0 ? 0 :
                ((double) convertedLeads / totalLeads) * 100;

        data.put("totalLeads", totalLeads);
        data.put("convertedLeads", convertedLeads);
        data.put("totalClients", totalClients);
        data.put("totalUsers", totalUsers);
        data.put("conversionRate", conversionRate);

        return data;
    }

    // EMPLOYEE DASHBOARD
    public Map<String, Object> getEmployeeDashboard(Long userId) {

        Map<String, Object> data = new HashMap<>();

        long totalLeads = leadRepository.countByAssignedToId(userId);
        long convertedLeads =
                leadRepository.countByAssignedToIdAndStatus(userId, LeadStatus.CONVERTED);

        double conversionRate = totalLeads == 0 ? 0 :
                ((double) convertedLeads / totalLeads) * 100;

        data.put("totalLeads", totalLeads);
        data.put("convertedLeads", convertedLeads);
        data.put("conversionRate", conversionRate);

        return data;
    }

    // TEAM LEAD DASHBOARD
    public Map<String, Object> getTeamLeadDashboard(Long teamLeadId) {

        Map<String, Object> data = new HashMap<>();

        List<User> employees = userRepository.findByTeamLeadId(teamLeadId);

        long totalLeads = 0;
        long convertedLeads = 0;

        for (User emp : employees) {
            totalLeads += leadRepository.countByAssignedToId(emp.getId());
            convertedLeads += leadRepository
                    .countByAssignedToIdAndStatus(emp.getId(), LeadStatus.CONVERTED);
        }

        double conversionRate = totalLeads == 0 ? 0 :
                ((double) convertedLeads / totalLeads) * 100;

        data.put("teamMembers", employees.size());
        data.put("totalLeads", totalLeads);
        data.put("convertedLeads", convertedLeads);
        data.put("conversionRate", conversionRate);

        return data;
    }

    // MANAGER DASHBOARD
    public Map<String, Object> getManagerDashboard(Long managerId) {

        Map<String, Object> data = new HashMap<>();

        List<User> teamLeads = userRepository.findByManagerId(managerId);

        long totalLeads = 0;
        long convertedLeads = 0;

        for (User tl : teamLeads) {

            List<User> employees = userRepository.findByTeamLeadId(tl.getId());

            for (User emp : employees) {
                totalLeads += leadRepository.countByAssignedToId(emp.getId());
                convertedLeads += leadRepository
                        .countByAssignedToIdAndStatus(emp.getId(), LeadStatus.CONVERTED);
            }
        }

        double conversionRate = totalLeads == 0 ? 0 :
                ((double) convertedLeads / totalLeads) * 100;

        data.put("teamLeads", teamLeads.size());
        data.put("totalLeads", totalLeads);
        data.put("convertedLeads", convertedLeads);
        data.put("conversionRate", conversionRate);

        return data;
    }
}
