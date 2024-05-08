package com.example.backend.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String password;
    private String email;
    private Date birthday;
    private String phone;
    private int status;
    @Column(name = "is_deleted")
    private int delete;

    // 1 user chỉ thuộc 1 role và 1 role có thể có nhiều user
    @ManyToOne
    @JoinColumn(name = "role_id")
    private RoleEntity role;
}
