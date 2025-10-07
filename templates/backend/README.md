# Jangular Backend

The robust Spring Boot backend component of the Jangular full-stack enterprise starter kit. This backend provides a complete authentication and authorization system, database integration, and a RESTful API to accelerate enterprise application development.

## Overview

Jangular Backend is designed to be a solid foundation for building secure, scalable enterprise applications. It combines modern Java technologies with best practices for authentication, database management, and API development.

## Features

- **Authentication & Authorization**: Pre-configured Spring Security with JWT token support
- **Multi-Database Support**: Compatible with MySQL, PostgreSQL, and MSSQL
- **Database Migration**: Automated schema management with Flyway
- **RESTful API**: Complete set of endpoints for user management and authentication
- **Service Architecture**: Well-structured layers for maintainable code
- **Security**: CORS configuration, password encryption, and secure token handling

## Technologies

- Java 21
- Spring Boot 3.4.3
- Spring Security
- Spring Data JPA
- JWT Authentication
- Flyway Migration
- Database support for:
  - MySQL
  - PostgreSQL
  - MSSQL
- Lombok
- Maven

## Project Structure

```
src/
├── main/
│   ├── java/
│   │   └── com/
│   │       └── yourpackage/
│   │           ├── config/            # Configuration classes
│   │           │   ├── SecurityConfig.java
│   │           │   └── JwtConfig.java
│   │           ├── controller/        # REST controllers
│   │           │   ├── AuthController.java
│   │           │   └── UserController.java
│   │           ├── dto/               # Data Transfer Objects
│   │           ├── entity/            # JPA entities
│   │           ├── exception/         # Custom exceptions
│   │           ├── repository/        # Data repositories
│   │           ├── security/          # Security components
│   │           │   └── jwt/           # JWT utilities
│   │           ├── service/           # Business logic
│   │           └── Application.java   # Application entry point
│   └── resources/
│       ├── db/
│       │   └── migration/             # Flyway migration scripts
│       ├── application.yml            # Main configuration
│       ├── application-dev.yml        # Development profile
│       └── application-prod.yml       # Production profile
└── test/                              # Test classes
```

## Quick Start

### Prerequisites

- Java 21 or higher
- Maven 3.6 or higher
- MySQL 8.0+, PostgreSQL, or MSSQL database

### Manual Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/nathangtg/jangular-backend.git
   cd jangular-backend
   ```

2. Configure your database connection in `application.yml` or through environment variables.

3. Build and run the application:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

### Using with Jangular CLI

It's recommended to use the Jangular CLI for a complete setup:

```bash
npm install jangular-cli
npx jangular-cli init my-project
```

## Database Configuration

### MySQL

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/your_database
    username: your_username
    password: your_password
    driver-class-name: com.mysql.cj.jdbc.Driver
  jpa:
    properties:
      hibernate:
        dialect: org.hibernate.dialect.MySQLDialect
```

### PostgreSQL

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/your_database
    username: your_username
    password: your_password
    driver-class-name: org.postgresql.Driver
  jpa:
    properties:
      hibernate:
        dialect: org.hibernate.dialect.PostgreSQLDialect
```

### MSSQL

```yaml
spring:
  datasource:
    url: jdbc:sqlserver://localhost:1433;databaseName=your_database
    username: your_username
    password: your_password
    driver-class-name: com.microsoft.sqlserver.jdbc.SQLServerDriver
  jpa:
    properties:
      hibernate:
        dialect: org.hibernate.dialect.SQLServerDialect
```

## API Endpoints

### Authentication

| Method | Endpoint           | Description               | Access  |
|--------|-------------------|---------------------------|---------|
| POST   | /api/auth/login    | User login                | Public  |
| POST   | /api/auth/register | User registration         | Public  |
| POST   | /api/auth/refresh  | Refresh access token      | Public  |
| POST   | /api/auth/logout   | User logout               | Auth    |

### User Management

| Method | Endpoint                         | Description              | Access        |
|--------|----------------------------------|--------------------------|---------------|
| GET    | /api/users/me                    | Get current user info    | Authenticated |
| GET    | /api/users/{id}                  | Get user by ID           | Admin         |
| GET    | /api/users                       | Get all users            | Admin         |
| PUT    | /api/users/{id}                  | Update user information  | User or Admin |
| POST   | /api/users/{id}/change-password  | Change user password     | User or Admin |
| DELETE | /api/users/{id}                  | Soft delete a user       | Admin         |
| POST   | /api/users/{id}/roles            | Add role to user         | Admin         |
| DELETE | /api/users/{id}/roles/{roleName} | Remove role from user    | Admin         |
| GET    | /api/users/{id}/login-history    | Get user login history   | User or Admin |
| GET    | /api/users/{id}/active-sessions  | Get active sessions      | User or Admin |

## Authentication System

Jangular Backend implements a secure JWT-based authentication system:

- **Token-Based**: Uses JWT for stateless authentication
- **Dual Token System**: Short-lived access tokens with refresh token capability
- **Role-Based Authorization**: Granular access control with user roles and permissions
- **Session Management**: Tracking and controlling active user sessions

## Customization

You can customize the backend by:

1. Modifying entity models to fit your domain
2. Adding new controllers for additional functionality
3. Extending security configuration for custom authentication requirements
4. Implementing custom business logic in service classes
5. Adding more Flyway migrations for evolving database schema

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the LICENSE file for details.

## Related Projects

- [Jangular CLI](https://github.com/nathangtg/jangular-cli) - Command-line tool for Jangular projects
- [Jangular Frontend](https://github.com/nathangtg/jangular-frontend) - Angular frontend component

---

Jangular Backend - Enterprise-grade Spring Boot Backend