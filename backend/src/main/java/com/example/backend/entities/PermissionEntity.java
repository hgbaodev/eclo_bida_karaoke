package com.example.backend.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@Entity
@Table(name = "permissions")
public class PermissionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private int status;
    @Column(name = "is_deleted")
    private int delete;

    // 1 permission có thể thuộc nhiều role và 1 role có thể có nhiều permission
    @ManyToMany(mappedBy = "permissions")
    private List<RoleEntity> roles;
}
