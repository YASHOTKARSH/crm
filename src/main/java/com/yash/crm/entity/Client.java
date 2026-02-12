package com.yash.crm.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "clients")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String email;

    private String phone;

    @ManyToOne
    @JoinColumn(name = "plan_id")
    private Plan plan;

    @ManyToOne
    @JoinColumn(name = "assigned_employee")
    private User assignedEmployee;

    @Column(name = "conversion_date")
    private LocalDateTime conversionDate;

    @PrePersist
    public void prePersist() {
        this.conversionDate = LocalDateTime.now();
    }
}
