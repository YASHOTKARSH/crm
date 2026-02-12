package com.yash.crm.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class ApiResponse<T> {

    private LocalDateTime timestamp;
    private boolean success;
    private T data;
}
