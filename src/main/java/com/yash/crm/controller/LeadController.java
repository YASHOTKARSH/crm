package com.yash.crm.controller;

import com.yash.crm.dto.ApiResponse;
import com.yash.crm.entity.Lead;
import com.yash.crm.service.LeadService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employee/leads")
@RequiredArgsConstructor
public class LeadController {

    private final LeadService leadService;

    @PostMapping
    public ApiResponse<Lead> createLead(@RequestBody Lead lead,
                                        @RequestParam Long assignedToId,
                                        Authentication authentication) {

        Lead saved = leadService.createLead(lead, assignedToId, authentication);

        return new ApiResponse<>(
                java.time.LocalDateTime.now(),
                true,
                saved
        );
    }


    @GetMapping
    public List<Lead> getLeads(Authentication authentication) {
        return leadService.getLeadsForLoggedInUser(authentication);
    }


    @PutMapping("/{id}")
    public Lead updateLead(@PathVariable Long id,
                           @RequestBody Lead lead) {
        return leadService.updateLead(id, lead);
    }

    @DeleteMapping("/{id}")
    public String deleteLead(@PathVariable Long id) {
        leadService.deleteLead(id);
        return "Lead deleted successfully";
    }

    @PutMapping("/{id}/convert")
    public String convertLead(@PathVariable Long id,
                              @RequestParam Long planId) {
        return leadService.convertLead(id, planId);
    }
}
