package com.jangular.backend.models;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "users", indexes = {
    @Index(name = "idx_user_username", columnList = "username"),
    @Index(name = "idx_user_email", columnList = "email")
})
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "username", nullable = false, unique = true)
    private String username;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @Column(name = "is_active", nullable = false)
    private boolean isActive = true;

    @Column(name = "account_non_locked", nullable = false)
    private boolean accountNonLocked = true;

    @Column(name = "failed_attempt", nullable = false)
    private int failedAttempt = 0;

    @Column(name = "lock_time", nullable = true)
    private LocalDateTime lockTime = null;

    @Column(name = "last_password_change_date", nullable = true)
    private LocalDateTime lastPasswordChangeDate = null;

    @Column(name = "is_deleted", nullable = false)
    private boolean isDeleted = false;

    @Enumerated(EnumType.STRING)
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "user_roles",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles = new HashSet<>();
    
    @PrePersist
    protected void prePersist() {
        this.isActive = Boolean.TRUE.equals(this.isActive) ? this.isActive : true;
        this.accountNonLocked = true;
        this.failedAttempt = 0;
    }

    public Set<String> getRoleNames() {
        Set<String> roleNames = new HashSet<>();
        for (Role role : roles) {
            roleNames.add(role.getName().toString());
        }
        return roleNames;
    }

    public String getUserInformation() {
        return "User [id=" + id + ", username=" + username + ", firstName=" + firstName + ", lastName=" + lastName
                + ", email=" + email + ", createdAt=" + createdAt + ", updatedAt=" + updatedAt + ", isActive=" + isActive
                + ", accountNonLocked=" + accountNonLocked + ", failedAttempt=" + failedAttempt + ", lockTime="
                + lockTime + ", lastPasswordChangeDate=" + lastPasswordChangeDate + ", isDeleted=" + isDeleted
                + ", roles=" + getRoleNames() + "]";
    }
    
}
