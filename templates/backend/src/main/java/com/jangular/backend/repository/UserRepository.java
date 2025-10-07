package com.jangular.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.jangular.backend.models.User;

public interface UserRepository extends JpaRepository<User, Long> {

    @EntityGraph(attributePaths = "roles")
    Optional<User> findByUsernameAndIsDeletedFalse(String username);

    @EntityGraph(attributePaths = "roles")
    Optional<User> findByEmailAndIsDeletedFalse(String email);

    Optional<User> findByIdAndIsDeletedFalse(Long id);

    Optional<User> findByUsernameAndIsDeletedFalseAndIsActive(String username, boolean isActive);

    Optional<User> findByUsername(String username);

    List<User> findByIsActiveAndIsDeletedFalse(boolean isActive);

    boolean existsByUsernameAndIsDeletedFalse(String username);

    boolean existsByEmailAndIsDeletedFalse(String email);
}

