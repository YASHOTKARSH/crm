package com.yash.crm.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/api/admin/test")
    public String adminTest() {
        return "Admin Access Granted";
    }

    @GetMapping("/api/manager/test")
    public String managerTest() {
        return "Manager Access Granted";
    }

    @GetMapping("/api/teamlead/test")
    public String teamLeadTest() {
        return "Team Lead Access Granted";
    }

    @GetMapping("/api/employee/test")
    public String employeeTest() {
        return "Employee Access Granted";
    }
}
