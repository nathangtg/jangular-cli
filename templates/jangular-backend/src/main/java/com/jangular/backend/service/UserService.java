package com.jangular.backend.service;

import com.jangular.backend.models.User;
import com.jangular.backend.models.PasswordHistory;
import com.jangular.backend.repository.RoleRepository;
import com.jangular.backend.repository.UserRepository;
import com.jangular.backend.repository.PasswordHistoryRepository;
import com.jangular.backend.models.Role;
import com.jangular.backend.enums.RoleName;
import com.jangular.backend.exception.ResourceNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.time.LocalDateTime;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private RoleRepository roleRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private PasswordHistoryRepository passwordHistoryRepository;

    /**
     * Creates a new user with encoded password and default USER role
     */
    @Transactional
    public User createUser(User user) {
        // Encode password
        String encodedPassword = passwordEncoder.encode(user.getPasswordHash());
        user.setPasswordHash(encodedPassword);
        
        // Set default role if none provided
        if (user.getRoles() == null || user.getRoles().isEmpty()) {
            Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
                    .orElseThrow(() -> new ResourceNotFoundException("Default role not found"));
            user.setRoles(Set.of(userRole));
        }
        
        user.setLastPasswordChangeDate(LocalDateTime.now());
        User savedUser = userRepository.save(user);
        
        // Save the initial password to history
        PasswordHistory passwordHistory = new PasswordHistory();
        passwordHistory.setUser(savedUser);
        passwordHistory.setPasswordHash(encodedPassword);
        passwordHistory.setChangedAt(savedUser.getLastPasswordChangeDate());
        passwordHistoryRepository.save(passwordHistory);
        
        return savedUser;
    }

    /**
     * Find user by username
     */
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsernameAndIsDeletedFalse(username);
    }

    /**
     * Find user by email
     */
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmailAndIsDeletedFalse(email);
    }

    /**
     * Find user by ID
     */
    public Optional<User> findById(Long id) {
        return userRepository.findByIdAndIsDeletedFalse(id);
    }

    /**
     * Get all active users
     */
    public List<User> findAllActiveUsers() {
        return userRepository.findByIsActiveAndIsDeletedFalse(true);
    }

    /**
     * Get default role (ROLE_USER)
     */
    public Role getDefaultRole() {
        return roleRepository.findByName(RoleName.ROLE_USER)
                .orElseThrow(() -> new ResourceNotFoundException("Default role not found"));
    }
    
    /**
     * Updates a user's information
     */
    @Transactional
    public User updateUser(User user) {
        return userRepository.save(user);
    }

    /**
     * Soft delete a user
     */
    @Transactional
    public void softDeleteUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        
        user.setDeleted(true);
        user.setActive(false);
        userRepository.save(user);
    }

    /**
     * Change user password with history check to prevent reuse
     */
    @Transactional
    public void changePassword(Long userId, String newPassword) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        
        // Check if the new password is the same as any of the last 5 passwords
        List<PasswordHistory> recentPasswords = passwordHistoryRepository.findTop5ByUserOrderByChangedAtDesc(user);
        String encodedNewPassword = passwordEncoder.encode(newPassword);
        
        for (PasswordHistory oldPassword : recentPasswords) {
            if (passwordEncoder.matches(newPassword, oldPassword.getPasswordHash())) {
                throw new IllegalArgumentException("New password cannot be the same as any of the last 5 passwords");
            }
        }
        
        // Save the old password to history before updating
        PasswordHistory passwordHistory = new PasswordHistory();
        passwordHistory.setUser(user);
        passwordHistory.setPasswordHash(user.getPasswordHash()); // Store the current (soon to be old) password hash
        passwordHistory.setChangedAt(user.getLastPasswordChangeDate() != null ? user.getLastPasswordChangeDate() : LocalDateTime.now());
        passwordHistoryRepository.save(passwordHistory);
        
        // Update the user's password
        user.setPasswordHash(encodedNewPassword);
        user.setLastPasswordChangeDate(LocalDateTime.now());
        userRepository.save(user);
    }

    /**
     * Check if username already exists
     */
    public boolean existsByUsername(String username) {
        return userRepository.existsByUsernameAndIsDeletedFalse(username);
    }

    /**
     * Check if email already exists
     */
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmailAndIsDeletedFalse(email);
    }

    /**
     * Add role to user
     */
    @Transactional
    public User addRoleToUser(Long userId, RoleName roleName) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        
        Role role = roleRepository.findByName(roleName)
                .orElseThrow(() -> new ResourceNotFoundException("Role not found with name: " + roleName));
        
        user.getRoles().add(role);
        return userRepository.save(user);
    }

    /**
     * Remove role from user
     */
    @Transactional
    public User removeRoleFromUser(Long userId, RoleName roleName) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        
        Role role = roleRepository.findByName(roleName)
                .orElseThrow(() -> new ResourceNotFoundException("Role not found with name: " + roleName));
        
        user.getRoles().remove(role);
        return userRepository.save(user);
    }

    /**
     * Lock user account after max failed attempts
     */
    @Transactional
    public void lockUser(String username) {
        User user = userRepository.findByUsernameAndIsDeletedFalse(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with username: " + username));
        
        user.setAccountNonLocked(false);
        user.setLockTime(LocalDateTime.now());
        userRepository.save(user);
    }

    /**
     * Unlock user account
     */
    @Transactional
    public void unlockUser(String username) {
        User user = userRepository.findByUsernameAndIsDeletedFalse(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with username: " + username));
        
        user.setAccountNonLocked(true);
        user.setLockTime(null);
        user.setFailedAttempt(0);
        userRepository.save(user);
    }

    /**
     * Increment failed attempts
     */
    @Transactional
    public void incrementFailedAttempts(String username) {
        User user = userRepository.findByUsernameAndIsDeletedFalse(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with username: " + username));
        
        user.setFailedAttempt(user.getFailedAttempt() + 1);
        userRepository.save(user);
    }

    /**
     * Reset failed attempts
     */
    @Transactional
    public void resetFailedAttempts(String username) {
        User user = userRepository.findByUsernameAndIsDeletedFalse(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with username: " + username));
        
        user.setFailedAttempt(0);
        userRepository.save(user);
    }
}