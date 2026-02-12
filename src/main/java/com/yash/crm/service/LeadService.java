package com.yash.crm.service;

import com.yash.crm.entity.*;
import com.yash.crm.repository.ClientRepository;
import com.yash.crm.repository.LeadRepository;
import com.yash.crm.repository.PlanRepository;
import com.yash.crm.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j

@RequiredArgsConstructor
public class LeadService {

    private final LeadRepository leadRepository;
    private final UserRepository userRepository;
    private final ClientRepository clientRepository;
    private final PlanRepository planRepository;

    public Lead createLead(Lead lead,
                           Long assignedToId,
                           Authentication authentication) {

        String email = authentication.getName();

        User loggedInUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        User assignedUser = userRepository.findById(assignedToId)
                .orElseThrow(() -> new RuntimeException("Assigned user not found"));

        // 🔥 ADMIN → assign to anyone
        if (loggedInUser.getRole() == Role.ADMIN) {
            lead.setAssignedTo(assignedUser);
        }

        // 🔥 MANAGER → only assign within their hierarchy
        else if (loggedInUser.getRole() == Role.MANAGER) {

            List<User> teamLeads = userRepository.findByManagerId(loggedInUser.getId());

            boolean valid = false;

            for (User tl : teamLeads) {
                List<User> employees = userRepository.findByTeamLeadId(tl.getId());
                for (User emp : employees) {
                    if (emp.getId().equals(assignedToId)) {
                        valid = true;
                        break;
                    }
                }
            }

            if (!valid) {
                throw new RuntimeException("You cannot assign outside your hierarchy");
            }

            lead.setAssignedTo(assignedUser);
        }

        // 🔥 TEAM_LEAD → only assign to their employees
        else if (loggedInUser.getRole() == Role.TEAM_LEAD) {

            List<User> employees = userRepository.findByTeamLeadId(loggedInUser.getId());

            boolean valid = employees.stream()
                    .anyMatch(emp -> emp.getId().equals(assignedToId));

            if (!valid) {
                throw new RuntimeException("You can assign only to your employees");
            }

            lead.setAssignedTo(assignedUser);
        }

        // 🔥 EMPLOYEE → only assign to self
        else if (loggedInUser.getRole() == Role.EMPLOYEE) {

            if (!loggedInUser.getId().equals(assignedToId)) {
                throw new RuntimeException("Employee can only assign lead to self");
            }

            lead.setAssignedTo(loggedInUser);
        }

        lead.setStatus(LeadStatus.NEW);

        return leadRepository.save(lead);
    }


    public List<Lead> getLeadsForLoggedInUser(Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getRole() == Role.ADMIN) {
            return leadRepository.findAll();
        }

        if (user.getRole() == Role.MANAGER) {

            List<User> teamLeads = userRepository.findByManagerId(user.getId());
            List<Lead> leads = new ArrayList<>();

            for (User tl : teamLeads) {
                List<User> employees = userRepository.findByTeamLeadId(tl.getId());
                for (User emp : employees) {
                    leads.addAll(leadRepository.findByAssignedToId(emp.getId()));
                }
            }

            return leads;
        }

        if (user.getRole() == Role.TEAM_LEAD) {

            List<User> employees = userRepository.findByTeamLeadId(user.getId());
            List<Lead> leads = new ArrayList<>();

            for (User emp : employees) {
                leads.addAll(leadRepository.findByAssignedToId(emp.getId()));
            }

            return leads;
        }

        if (user.getRole() == Role.EMPLOYEE) {
            return leadRepository.findByAssignedToId(user.getId());
        }

        return List.of();
    }


    public Lead updateLead(Long id, Lead updatedLead) {

        Lead lead = leadRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Lead not found"));

        lead.setName(updatedLead.getName());
        lead.setEmail(updatedLead.getEmail());
        lead.setPhone(updatedLead.getPhone());
        lead.setSource(updatedLead.getSource());
        lead.setInterestedPercentage(updatedLead.getInterestedPercentage());
        lead.setStatus(updatedLead.getStatus());

        return leadRepository.save(lead);
    }

    public void deleteLead(Long id) {
        leadRepository.deleteById(id);
    }

    public String convertLead(Long leadId, Long planId) {

        Lead lead = leadRepository.findById(leadId)
                .orElseThrow(() -> new RuntimeException("Lead not found"));

        if (lead.getStatus() == LeadStatus.CONVERTED) {
            return "Lead already converted";
        }

        Plan plan = planRepository.findById(planId)
                .orElseThrow(() -> new RuntimeException("Plan not found"));

        Client client = Client.builder()
                .name(lead.getName())
                .email(lead.getEmail())
                .phone(lead.getPhone())
                .plan(plan)
                .assignedEmployee(lead.getAssignedTo())
                .build();

        clientRepository.save(client);

        lead.setStatus(LeadStatus.CONVERTED);
        leadRepository.save(lead);

        return "Lead converted to client successfully";
    }
}
