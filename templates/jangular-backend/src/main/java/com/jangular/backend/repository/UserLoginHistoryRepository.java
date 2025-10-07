package com.jangular.backend.repository;

import com.jangular.backend.models.UserLoginHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserLoginHistoryRepository extends JpaRepository<UserLoginHistory, Long> {

    List<UserLoginHistory> findByUserIdOrderByLoginTimeDesc(Long userId);
    
    List<UserLoginHistory> findByUserIdAndSuccessfulOrderByLoginTimeDesc(Long userId, boolean successful);
    
    @Query("SELECT h FROM UserLoginHistory h WHERE h.userId = :userId AND h.logoutTime IS NULL ORDER BY h.loginTime DESC")
    List<UserLoginHistory> findActiveSessionsByUserId(@Param("userId") Long userId);
    
    @Query("SELECT h FROM UserLoginHistory h WHERE h.userId = :userId AND h.loginTime >= :startDate AND h.loginTime <= :endDate")
    List<UserLoginHistory> findByUserIdAndLoginTimeBetween(
            @Param("userId") Long userId, 
            @Param("startDate") LocalDateTime startDate, 
            @Param("endDate") LocalDateTime endDate);
            
    Optional<UserLoginHistory> findTopByUserIdAndSuccessfulTrueAndLogoutTimeIsNullOrderByLoginTimeDesc(Long userId);
}
