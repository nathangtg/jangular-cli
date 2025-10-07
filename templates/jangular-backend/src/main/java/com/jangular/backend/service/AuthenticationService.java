package com.jangular.backend.service;

import com.jangular.backend.models.User;
import com.jangular.backend.repository.UserRepository;
import com.jangular.backend.security.jwt.JwtTokenUtil;
import com.jangular.backend.dto.AuthRequest;
import com.jangular.backend.dto.AuthResponse;
import com.jangular.backend.exception.AccountLockedException;
import com.jangular.backend.exception.BadCredentialsException;
import com.jangular.backend.exception.ResourceNotFoundException;
import com.jangular.backend.security.UserPrincipal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
public class AuthenticationService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private UserLoginHistoryService loginHistoryService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Value("${auth.max-failed-attempts}")
    private int maxFailedAttempts;

    @Value("${auth.lock-time-duration}")
    private long lockTimeDuration;

    /**
     * Authenticate user and generate JWT tokens
     */
    @Transactional
    public AuthResponse authenticate(AuthRequest request, String ipAddress, String userAgent) {
        // Check if account is locked
        User user = userRepository.findByUsernameAndIsDeletedFalse(request.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (!user.isAccountNonLocked()) {
            if (unlockWhenTimeExpired(user)) {
                // Account was locked but lock duration has passed
                userService.unlockUser(user.getUsername());
            } else {
                // Account is still locked
                throw new AccountLockedException("Your account is locked due to " + maxFailedAttempts 
                        + " failed attempts. It will be unlocked after " + lockTimeDuration + " minutes.");
            }
        }

        try {
            // Try to authenticate
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );

            // If authentication successful, reset failed attempts
            userService.resetFailedAttempts(user.getUsername());

            // Get user details from authentication
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            Map<String, Object> claims = new HashMap<>();
            claims.put("userId", user.getId());
            claims.put("roles", user.getRoleNames());

            // Generate tokens
            String accessToken = jwtTokenUtil.generateToken(userDetails, claims);
            String refreshToken = jwtTokenUtil.generateRefreshToken(userDetails);

            // Log successful login
            loginHistoryService.recordLoginAttempt(user.getId(), ipAddress, userAgent, true, null);

            return new AuthResponse(accessToken, refreshToken, user.getUsername());
        } catch (AuthenticationException e) {
            // If authentication fails, increment failed attempts
            processFailedLogin(user, ipAddress, userAgent, e.getMessage());
            throw new BadCredentialsException("Invalid username or password");
        }
    }

    /**
     * Process failed login attempt
     */
    private void processFailedLogin(User user, String ipAddress, String userAgent, String errorMessage) {
        // Increment failed attempts
        userService.incrementFailedAttempts(user.getUsername());
        
        // Check if need to lock account
        if (user.getFailedAttempt() + 1 >= maxFailedAttempts) {
            userService.lockUser(user.getUsername());
            loginHistoryService.recordLoginAttempt(user.getId(), ipAddress, userAgent, false, 
                    "Account locked after " + maxFailedAttempts + " failed attempts");
        } else {
            loginHistoryService.recordLoginAttempt(user.getId(), ipAddress, userAgent, false, errorMessage);
        }
    }

    /**
     * Check if account lock time has expired
     */
    private boolean unlockWhenTimeExpired(User user) {
        LocalDateTime lockTime = user.getLockTime();
        if (lockTime != null) {
            LocalDateTime unlockTime = lockTime.plusMinutes(lockTimeDuration);
            return LocalDateTime.now().isAfter(unlockTime);
        }
        return false;
    }

    /**
     * Refresh access token using refresh token
     */
    public AuthResponse refreshToken(String refreshToken) {
        // Validate refresh token
        String username = jwtTokenUtil.extractUsername(refreshToken);
        
        User user = userService.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    
        // Convert User to UserDetails
        UserDetails userDetails = UserPrincipal.create(user);
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", user.getId());
        claims.put("roles", user.getRoleNames());
    
        if (!jwtTokenUtil.validateToken(refreshToken, userDetails)) {
            throw new BadCredentialsException("Invalid refresh token");
        }
    
        // Generate new access token
        String newAccessToken = jwtTokenUtil.generateToken(userDetails, claims);
    
        return new AuthResponse(newAccessToken, refreshToken, username);
    }
    
    

    /**
     * Logout user (in a complete implementation, you might want to blacklist the token)
     */
    @Transactional
    public void logout(String token) {
        // In a more complete implementation, you would add the token to a blacklist
        // or implement token revocation
        // For simplicity, we're just recording the logout
        String username = jwtTokenUtil.extractUsername(token);
        
        User user = userRepository.findByUsernameAndIsDeletedFalse(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
                
        loginHistoryService.recordLogout(user.getId());
    }

    /**
     * Change user password
     */
    @Transactional
    public void changePassword(Long userId, String oldPassword, String newPassword) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        // Verify old password
        if (!passwordEncoder.matches(oldPassword, user.getPasswordHash())) {
            throw new BadCredentialsException("Current password is incorrect");
        }

        // Change password
        userService.changePassword(userId, newPassword);
    }
}