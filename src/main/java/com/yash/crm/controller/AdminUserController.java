package com.yash.crm.controller;

import com.yash.crm.dto.ApiResponse;
import com.yash.crm.dto.CreateUserRequest;
import com.yash.crm.entity.User;
import com.yash.crm.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/users")
@RequiredArgsConstructor
public class AdminUserController {

    private final UserService userService;

    @PostMapping
    public ApiResponse<User> createUser(@Valid @RequestBody CreateUserRequest request) {

        User user = userService.createUser(request);

        return new ApiResponse<>(
                java.time.LocalDateTime.now(),
                true,
                user
        );
    }


    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
}
