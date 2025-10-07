package com.jangular.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jangular.backend.models.PasswordHistory;
import com.jangular.backend.models.User;

public interface PasswordHistoryRepository extends JpaRepository<PasswordHistory, Long> {

    List<PasswordHistory> findTop5ByUserOrderByChangedAtDesc(User user);

}
