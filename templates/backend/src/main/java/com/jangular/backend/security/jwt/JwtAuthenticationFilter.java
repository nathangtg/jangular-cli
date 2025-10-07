package com.jangular.backend.security.jwt;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.jangular.backend.security.CustomUserDetailsService;
import com.jangular.backend.service.TokenService;

import java.io.IOException;

import org.springframework.lang.NonNull;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    @Autowired
    private TokenService tokenService;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain)
            throws ServletException, IOException {
        try {
            String jwt = getJwtFromRequest(request);

            if (StringUtils.hasText(jwt)) {
                try {
                    String username = tokenService.getUsernameFromToken(jwt);
                    Long userId = tokenService.getUserIdFromToken(jwt);
                    
                    // Only proceed if we successfully extracted a username
                    if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                        UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);
                        
                        if (tokenService.validateToken(jwt, userDetails)) {
                            // Store the JWT token in the authentication object
                            // This allows access to the token in the SecurityUtils class if needed
                            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                                    userDetails, jwt, userDetails.getAuthorities());
                            
                            authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                            SecurityContextHolder.getContext().setAuthentication(authentication);
                            
                            // Store userId in request attributes for easy access in controllers
                            request.setAttribute("userId", userId);
                        }
                    }
                } catch (ExpiredJwtException ex) {
                    logger.error("Expired JWT token", ex);
                    request.setAttribute("expired", ex.getMessage());
                } catch (UnsupportedJwtException ex) {
                    logger.error("Unsupported JWT token", ex);
                } catch (MalformedJwtException ex) {
                    logger.error("Invalid JWT token", ex);
                } catch (Exception ex) {
                    logger.error("Cannot set user authentication: {}", ex.getMessage());
                }
            }
        } catch (Exception ex) {
            logger.error("Could not set user authentication in security context", ex);
        }

        filterChain.doFilter(request, response);
    }

    private String getJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}