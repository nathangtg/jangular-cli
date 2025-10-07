package com.jangular.backend.service;

import com.jangular.backend.models.UserLoginHistory;
import com.jangular.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UserLoginHistoryService {

    @Autowired
    private UserLoginHistoryRepository loginHistoryRepository;

    /**
     * Record a login attempt (successful or failed)
     */
    @Transactional
    public UserLoginHistory recordLoginAttempt(Long userId, String ipAddress, String userAgent, 
                                             boolean successful, String errorMessage) {
        UserLoginHistory loginHistory = new UserLoginHistory();
        loginHistory.setUserId(userId);
        loginHistory.setIpAddress(ipAddress);
        loginHistory.setUserAgent(userAgent);
        loginHistory.setLoginTime(LocalDateTime.now());
        loginHistory.setSuccessful(successful);
        loginHistory.setErrorMessage(errorMessage);
        
        return loginHistoryRepository.save(loginHistory);
    }

    /**
     * Record a user logout
     */
    @Transactional
    public void recordLogout(Long userId) {
        Optional<UserLoginHistory> activeSessionOpt = 
                loginHistoryRepository.findTopByUserIdAndSuccessfulTrueAndLogoutTimeIsNullOrderByLoginTimeDesc(userId);
        
        activeSessionOpt.ifPresent(session -> {
            session.setLogoutTime(LocalDateTime.now());
            loginHistoryRepository.save(session);
        });
    }

    /**
     * Get user login history
     */
    public List<UserLoginHistory> getUserLoginHistory(Long userId) {
        return loginHistoryRepository.findByUserIdOrderByLoginTimeDesc(userId);
    }

    /**
     * Get successful login history
     */
    public List<UserLoginHistory> getSuccessfulLogins(Long userId) {
        return loginHistoryRepository.findByUserIdAndSuccessfulOrderByLoginTimeDesc(userId, true);
    }

    /**
     * Get failed login attempts
     */
    public List<UserLoginHistory> getFailedLogins(Long userId) {
        return loginHistoryRepository.findByUserIdAndSuccessfulOrderByLoginTimeDesc(userId, false);
    }

    /**
     * Get active sessions (logins without logout)
     */
    public List<UserLoginHistory> getActiveSessions(Long userId) {
        return loginHistoryRepository.findActiveSessionsByUserId(userId);
    }

    /**
     * Get login history within a date range
     */
    public List<UserLoginHistory> getLoginHistoryBetween(Long userId, LocalDateTime startDate, LocalDateTime endDate) {
        return loginHistoryRepository.findByUserIdAndLoginTimeBetween(userId, startDate, endDate);
    }
}
