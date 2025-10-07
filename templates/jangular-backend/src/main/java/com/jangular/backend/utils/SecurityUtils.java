package com.jangular.backend.utils;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.jangular.backend.repository.UserRepository;



@Configuration
public class SecurityUtils {

    // Access the User Repository
    private UserRepository userRepository;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12);
    }
    
    /**
     * Check if the authenticated user is the user being accessed
     */
    /**
     * Check if the authenticated user is the user being accessed
     */
    public boolean isCurrentUser(Long userId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null) {
            return false;
        }
             
        // Get the authenticated username
        String username = null;
        if (authentication.getPrincipal() instanceof UserDetails) {
            username = ((UserDetails) authentication.getPrincipal()).getUsername();
        } else if (authentication.getPrincipal() instanceof String) {
            username = (String) authentication.getPrincipal();
        }
        
        if (username == null) {
            return false;
        }
        
        // Find the user by username and compare IDs
        try {
            return userRepository.findByUsernameAndIsDeletedFalse(username)
                .map(user -> userId.equals(user.getId()))
                .orElse(false);
        } catch (Exception e) {
            return false;
        }
    }
}