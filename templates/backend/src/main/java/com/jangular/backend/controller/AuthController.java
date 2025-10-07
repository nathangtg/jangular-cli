package com.jangular.backend.controller;

import com.jangular.backend.dto.AuthRequest;
import com.jangular.backend.dto.AuthResponse;
import com.jangular.backend.dto.RegisterRequest;
import com.jangular.backend.dto.TokenRefreshRequest;
import com.jangular.backend.dto.UserDTO;
import com.jangular.backend.exception.BadCredentialsException;
import com.jangular.backend.models.User;
import com.jangular.backend.service.AuthenticationService;
import com.jangular.backend.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.logging.Level;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final Logger log = Logger.getLogger(AuthController.class.getName());

    @Autowired
    private AuthenticationService authService;

    @Autowired
    private UserService userService;

    /**
     * User login endpoint
     */
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @Valid @RequestBody AuthRequest loginRequest,
            HttpServletRequest request) {

        String ipAddress = getClientIp(request);
        String userAgent = request.getHeader("User-Agent");

        // Logging the login attempt
        log.info(String.format("Login attempt - Username: %s, IP: %s, User-Agent: %s",
                loginRequest.getUsername(), ipAddress, userAgent));

        try {
            AuthResponse response = authService.authenticate(loginRequest, ipAddress, userAgent);
            log.info(String.format("Login successful for user: %s", loginRequest.getUsername()));
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.log(Level.SEVERE, String.format("Login failed for user: %s - Reason: %s",
                    loginRequest.getUsername(), e.getMessage()), e);
            throw e;
        }
    }

    /**
     * User registration endpoint
     */
    @PostMapping("/register")
    public ResponseEntity<UserDTO> register(@Valid @RequestBody RegisterRequest registerRequest) {

        log.info(String.format("Registration attempt for username: %s, email: %s",
                registerRequest.getUsername(), registerRequest.getEmail()));

        if (registerRequest.getPasswordConfirm() != null &&
                !registerRequest.getPassword().equals(registerRequest.getPasswordConfirm())) {
            log.warning("Registration failed: Passwords do not match");
            throw new BadCredentialsException("Passwords do not match");
        }

        if (userService.existsByUsername(registerRequest.getUsername())) {
            log.warning("Registration failed: Username is already taken");
            throw new BadCredentialsException("Username is already taken");
        }

        if (userService.existsByEmail(registerRequest.getEmail())) {
            log.warning("Registration failed: Email is already in use");
            throw new BadCredentialsException("Email is already in use");
        }

        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setFirstName(registerRequest.getFirstName());
        user.setLastName(registerRequest.getLastName());
        user.setEmail(registerRequest.getEmail());
        user.setPasswordHash(registerRequest.getPassword());
        user.getRoles().add(userService.getDefaultRole());

        User savedUser = userService.createUser(user);
        UserDTO userDTO = new UserDTO(savedUser);
        userDTO.setRoles(savedUser.getRoleNames());

        log.info(String.format("User registered successfully - Username: %s, Email: %s",
                savedUser.getUsername(), savedUser.getEmail()));

        return new ResponseEntity<>(userDTO, HttpStatus.CREATED);
    }

    /**
     * Refresh token endpoint
     */
    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refreshToken(@Valid @RequestBody TokenRefreshRequest request) {
        log.info("Token refresh attempt");
        try {
            AuthResponse response = authService.refreshToken(request.getRefreshToken());
            log.info("Token refresh successful");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.log(Level.SEVERE, "Token refresh failed - Reason: " + e.getMessage(), e);
            throw e;
        }
    }

    /**
     * Logout endpoint
     */
    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletRequest request) {
        String token = extractTokenFromRequest(request);
        if (token != null) {
            log.info("Logout request received");
            authService.logout(token);
            log.info("User successfully logged out");
        } else {
            log.warning("Logout request received without a valid token");
        }
        return ResponseEntity.ok().build();
    }

    /**
     * Helper method to extract client IP address
     */
    private String getClientIp(HttpServletRequest request) {
        String xfHeader = request.getHeader("X-Forwarded-For");
        if (xfHeader == null) {
            return request.getRemoteAddr();
        }
        return xfHeader.split(",")[0];
    }

    /**
     * Helper method to extract JWT token from request
     */
    private String extractTokenFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
