package com.example.backend.repositories;

import com.example.backend.entities.RoleEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<RoleEntity, Integer> {
}
