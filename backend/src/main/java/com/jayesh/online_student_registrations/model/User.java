package com.jayesh.online_student_registrations.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue
    private UUID id;

    @Column(unique = true, nullable = true)
    private String email;

    private String password;

    private String role; // "admin", "student"
}