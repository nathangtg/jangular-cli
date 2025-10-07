package com.jangular.backend.service;

import com.jangular.backend.exception.ResourceNotFoundException;
import com.jangular.backend.exception.TokenException;
import com.jangular.backend.models.User;
import com.jangular.backend.repository.UserRepository;
import com.jangular.backend.security.CustomUserDetailsService;
import com.jangular.backend.security.jwt.JwtTokenUtil;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import javax.crypto.SecretKey;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Date;
import java.util.Set;

@Service
public class TokenService {

    @Value("${app.jwt.secret}")
    private String secret;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    /**
     * Generate access token with user information and roles
     */
    public String generateAccessToken(String username) {
        User user = userRepository.findByUsernameAndIsDeletedFalse(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);
        
        // Add custom claims to the token
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", user.getId());
        claims.put("email", user.getEmail());
        claims.put("roles", user.getRoleNames());
        
        return createAccessToken(claims, userDetails);
    }
    

    /**
     * Generate refresh token
     */
    public String generateRefreshToken(String username) {
        UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);
        return jwtTokenUtil.generateRefreshToken(userDetails);
    }

    /**
     * Create access token with additional claims
     */
    private String createAccessToken(Map<String, Object> claims, UserDetails userDetails) {
        // Use the JWT util but with additional claims
        return jwtTokenUtil.generateToken(userDetails, claims);
    }

    /**
     * Validate token
     */
    public boolean validateToken(String token, UserDetails userDetails) {
        try {
            return jwtTokenUtil.validateToken(token, userDetails);
        } catch (Exception e) {
            throw new TokenException("Invalid token: " + e.getMessage());
        }
    }

    /**
     * Extract username from token
     */
    public String getUsernameFromToken(String token) {
        try {
            return jwtTokenUtil.extractUsername(token);
        } catch (Exception e) {
            throw new TokenException("Failed to extract username: " + e.getMessage());
        }
    }

    /**
     * Extract user ID from token
     */
    public Long getUserIdFromToken(String token) {
        Claims claims = extractAllClaims(token);
        
        Object userIdObj = claims.get("userId");
        if (userIdObj == null) {
            throw new RuntimeException("User ID not found in token");
        }

        return Long.parseLong(userIdObj.toString());  // ✅ Ensure it's converted to Long properly
    }


    /**
     * Extract roles from token
     */
    @SuppressWarnings("unchecked")
    public Set<String> getRolesFromToken(String token) {
        try {
            return jwtTokenUtil.extractClaim(token, claims -> 
                (Set<String>) claims.get("roles"));
        } catch (Exception e) {
            throw new TokenException("Failed to extract roles: " + e.getMessage());
        }
    }

    /**
     * Check if token is expired
     */
    public boolean isTokenExpired(String token) {
        try {
            Date expiration = jwtTokenUtil.extractExpiration(token);
            return expiration.before(new Date());
        } catch (Exception e) {
            throw new TokenException("Failed to check token expiration: " + e.getMessage());
        }
    }

    /**
     * Get token expiration date
     */
    public Date getExpirationDateFromToken(String token) {
        try {
            return jwtTokenUtil.extractExpiration(token);
        } catch (Exception e) {
            throw new TokenException("Failed to get expiration date: " + e.getMessage());
        }
    }

    /**
     * Extract all claims from token
     */
    private Claims extractAllClaims(String token) {
        SecretKey key = Keys.hmacShaKeyFor(secret.getBytes());
        JwtParser parser = Jwts.parser()
                .verifyWith(key)
                .build();

        return parser.parseSignedClaims(token).getPayload();
    }
}