package com.yash.crm.controller;

import com.yash.crm.dto.ApiResponse;
import com.yash.crm.dto.LoginRequest;
import com.yash.crm.dto.RegisterRequest;
import com.yash.crm.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public String register(@Valid @RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public ApiResponse<String> login(@Valid @RequestBody LoginRequest request) {

        String token = authService.login(request);

        return new ApiResponse<>(
                java.time.LocalDateTime.now(),
                true,
                token
        );
    }

}
