package com.jangular.backend.enums;

public enum RoleName {
    ROLE_USER, ROLE_ADMIN, ROLE_MODERATOR;

    @Override
    public String toString() {
        return this.name();
    }
}
