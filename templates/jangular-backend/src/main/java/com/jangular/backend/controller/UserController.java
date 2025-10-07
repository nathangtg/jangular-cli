package com.jangular.backend.controller;

import com.jangular.backend.dto.UserDTO;
import com.jangular.backend.models.User;
import com.jangular.backend.models.UserLoginHistory;
import com.jangular.backend.service.AuthenticationService;
import com.jangular.backend.service.UserLoginHistoryService;
import com.jangular.backend.service.UserService;
import com.jangular.backend.enums.RoleName;
import com.jangular.backend.exception.ResourceNotFoundException;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserLoginHistoryService loginHistoryService;

    @Autowired
    private AuthenticationService authService;

    /**
     * Get current user information
     */
    @GetMapping("/me")
    public ResponseEntity<UserDTO> getCurrentUser(@RequestAttribute("userId") Long userId) {
        User user = userService.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return ResponseEntity.ok(new UserDTO(user));
    }

    /**
     * Get user by ID (admin only)
     */
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
        User user = userService.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        return ResponseEntity.ok(new UserDTO(user));
    }

    /**
     * Get all users (admin only)
     */
    @GetMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<User> users = userService.findAllActiveUsers();
        List<UserDTO> userDTOs = users.stream()
                .map(UserDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(userDTOs);
    }

    /**
     * Update user information
     */
    @PutMapping("/{id}")
    @PreAuthorize("@securityUtils.isCurrentUser(#id) or hasRole('ROLE_ADMIN')")
    public ResponseEntity<UserDTO> updateUser(
            @PathVariable Long id,
            @Valid @RequestBody UserDTO userDTO) {
        
        User user = userService.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
    
        // Retain existing values if request fields are null
        user.setFirstName(userDTO.getFirstName() != null ? userDTO.getFirstName() : user.getFirstName());
        user.setLastName(userDTO.getLastName() != null ? userDTO.getLastName() : user.getLastName());
        user.setEmail(userDTO.getEmail() != null ? userDTO.getEmail() : user.getEmail());
    
        // Save updates
        User updatedUser = userService.updateUser(user);
        return ResponseEntity.ok(new UserDTO(updatedUser));
    }
    
    /**
     * Change user password
     */
    @PostMapping("/{id}/change-password")
    @PreAuthorize("@securityUtils.isCurrentUser(#id) or hasRole('ROLE_ADMIN')")
    public ResponseEntity<Void> changePassword(
            @PathVariable Long id,
            @RequestBody Map<String, String> passwordRequest) {
        
        String oldPassword = passwordRequest.get("oldPassword");
        String newPassword = passwordRequest.get("newPassword");
        
        if (oldPassword == null || newPassword == null) {
            throw new IllegalArgumentException("Old password and new password are required");
        }
        
        authService.changePassword(id, oldPassword, newPassword);
        return ResponseEntity.ok().build();
    }

    /**
     * Soft delete a user (admin only)
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.softDeleteUser(id);
        return ResponseEntity.ok().build();
    }

    /**
     * Add role to user (admin only)
     */
    @PostMapping("/{id}/roles")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<UserDTO> addRoleToUser(
            @PathVariable Long id,
            @RequestBody Map<String, String> roleRequest) {
        
        String roleName = roleRequest.get("roleName");
        if (roleName == null) {
            throw new IllegalArgumentException("Role name is required");
        }
        
        RoleName role = RoleName.valueOf(roleName);
        User user = userService.addRoleToUser(id, role);
        return ResponseEntity.ok(new UserDTO(user));
    }

    /**
     * Remove role from user (admin only)
     */
    @DeleteMapping("/{id}/roles/{roleName}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<UserDTO> removeRoleFromUser(
            @PathVariable Long id,
            @PathVariable String roleName) {
        
        RoleName role = RoleName.valueOf(roleName);
        User user = userService.removeRoleFromUser(id, role);
        return ResponseEntity.ok(new UserDTO(user));
    }

    /**
     * Get user login history
     */
    @GetMapping("/{id}/login-history")
    @PreAuthorize("@securityUtils.isCurrentUser(#id) or hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<UserLoginHistory>> getUserLoginHistory(@PathVariable Long id) {
        List<UserLoginHistory> loginHistory = loginHistoryService.getUserLoginHistory(id);
        return ResponseEntity.ok(loginHistory);
    }

    /**
     * Get user login history for a specific date range
     */
    @GetMapping("/{id}/login-history/range")
    @PreAuthorize("@securityUtils.isCurrentUser(#id) or hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<UserLoginHistory>> getUserLoginHistoryRange(
            @PathVariable Long id,
            @RequestParam String startDate,
            @RequestParam(required = false) String endDate) {
        
        LocalDateTime start = LocalDate.parse(startDate).atStartOfDay();
        LocalDateTime end = endDate != null 
                ? LocalDate.parse(endDate).atTime(LocalTime.MAX) 
                : LocalDateTime.now();
        
        List<UserLoginHistory> loginHistory = loginHistoryService.getLoginHistoryBetween(id, start, end);
        return ResponseEntity.ok(loginHistory);
    }

    /**
     * Get active sessions
     */
    @GetMapping("/{id}/active-sessions")
    @PreAuthorize("@securityUtils.isCurrentUser(#id) or hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<UserLoginHistory>> getActiveSessions(@PathVariable Long id) {
        List<UserLoginHistory> activeSessions = loginHistoryService.getActiveSessions(id);
        return ResponseEntity.ok(activeSessions);
    }
}