import Sidebar from '@/app/components/sidebar';
import Header from '@/app/components/header';

export default function BackendPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar />
      
      <div className="lg-pl-64">
        <Header />
        
        <div className="py-8 px-4 sm-px-6 lg-px-8 overflow-x-hidden">
          <div className="max-w-4xl mx-auto">
            <main className="animate-fade-in-up">
              {/* Page Header */}
              <div className="mb-12">
                <h1 className="text-4xl font-bold text-foreground mb-4">Backend Features</h1>
                <p className="text-xl text-foreground-muted leading-relaxed">
                  Comprehensive overview of the JAngular Spring Boot backend architecture, security features, and enterprise-grade capabilities.
                </p>
              </div>

              {/* Content */}
              <div className="prose prose-gray dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-foreground/90 prose-strong:text-foreground prose-code:text-foreground prose-code:bg-card/50 prose-pre:bg-gray-900 prose-pre:text-gray-100">
                
                <p>The JAngular backend is built on <strong>Spring Boot 3.x</strong> and provides a robust, enterprise-ready foundation for full-stack applications. It includes comprehensive authentication, database integration, and security features out of the box.</p>

                <h2 id="authentication">Authentication & Authorization</h2>
                <p>The backend implements a complete JWT-based authentication system with enterprise-grade security features:</p>

                <h3>Token Management</h3>
                <ul>
                  <li><strong>JWT Access Tokens</strong> - Short-lived tokens for API authentication (15 minutes default)</li>
                  <li><strong>Refresh Tokens</strong> - Long-lived tokens for seamless session renewal (7 days default)</li>
                  <li><strong>Token Blacklisting</strong> - Immediate token invalidation on logout</li>
                  <li><strong>Automatic Refresh</strong> - Transparent token renewal before expiration</li>
                </ul>

                <h3>Password Security</h3>
                <ul>
                  <li><strong>BCrypt Hashing</strong> - Industry-standard password encryption with configurable rounds</li>
                  <li><strong>Password History</strong> - Prevents reuse of last 12 passwords</li>
                  <li><strong>Complexity Requirements</strong> - Configurable policy enforcement (length, special chars, etc.)</li>
                  <li><strong>Password Expiration</strong> - Optional password aging with configurable intervals</li>
                </ul>

                <h3>Account Protection</h3>
                <ul>
                  <li><strong>Account Lockout</strong> - Automatic lockout after 5 failed attempts (configurable)</li>
                  <li><strong>Progressive Delays</strong> - Increasing delays between failed attempts</li>
                  <li><strong>IP-based Restrictions</strong> - Optional IP whitelisting/blacklisting</li>
                  <li><strong>Session Management</strong> - Concurrent session limits per user</li>
                </ul>

                <hr />

                <h2 id="database-integration">Database Integration</h2>
                <p>JAngular supports multiple database systems with automatic configuration and migration management:</p>

                <h3>Supported Databases</h3>
                <ul>
                  <li><strong>MySQL 8.0+</strong> - Optimized for performance with proper charset handling</li>
                  <li><strong>PostgreSQL 13+</strong> - Advanced features with JSON support</li>
                  <li><strong>Microsoft SQL Server 2019+</strong> - Enterprise integration capabilities</li>
                </ul>

                <h3>Database Features</h3>
                <ul>
                  <li><strong>Flyway Migrations</strong> - Versioned schema management with rollback support</li>
                  <li><strong>Connection Pooling</strong> - HikariCP for optimal performance</li>
                  <li><strong>Transaction Management</strong> - Declarative transactions with Spring @Transactional</li>
                  <li><strong>Database Health Checks</strong> - Built-in monitoring and diagnostics</li>
                  <li><strong>Read/Write Splitting</strong> - Support for master-slave configurations</li>
                </ul>

                <h3>Migration Structure</h3>
                <div className="bg-gray-900 rounded-lg p-6 my-6 overflow-x-auto">
                  <div className="text-sm font-mono text-gray-100 whitespace-pre leading-relaxed">
{`src/main/resources/db/migration/
├── mysql/
│   ├── V1__Create_users_table.sql
│   ├── V2__Create_roles_table.sql
│   └── V3__Create_user_sessions_table.sql
├── postgresql/
│   ├── V1__Create_users_table.sql
│   ├── V2__Create_roles_table.sql
│   └── V3__Create_user_sessions_table.sql
└── mssql/
    ├── V1__Create_users_table.sql
    ├── V2__Create_roles_table.sql
    └── V3__Create_user_sessions_table.sql`}
                  </div>
                </div>

                <hr />

                <h2 id="security-features">Security Features</h2>
                <p>Comprehensive security implementation following OWASP best practices:</p>

                <h3>Spring Security Configuration</h3>
                <ul>
                  <li><strong>Method-level Security</strong> - Fine-grained access control with @PreAuthorize</li>
                  <li><strong>CSRF Protection</strong> - Configurable for stateless APIs</li>
                  <li><strong>CORS Configuration</strong> - Flexible cross-origin resource sharing</li>
                  <li><strong>Security Headers</strong> - Automatic injection of security headers</li>
                </ul>

                <h3>API Protection</h3>
                <ul>
                  <li><strong>Rate Limiting</strong> - Configurable request throttling per endpoint</li>
                  <li><strong>Input Validation</strong> - Bean validation with custom validators</li>
                  <li><strong>SQL Injection Prevention</strong> - Parameterized queries and JPA protection</li>
                  <li><strong>XSS Protection</strong> - Output encoding and sanitization</li>
                </ul>

                <h3>Audit & Monitoring</h3>
                <ul>
                  <li><strong>Login History</strong> - Detailed tracking of authentication attempts</li>
                  <li><strong>API Access Logs</strong> - Request/response logging with correlation IDs</li>
                  <li><strong>Security Events</strong> - Failed logins, privilege escalations, etc.</li>
                  <li><strong>Performance Metrics</strong> - Built-in actuator endpoints</li>
                </ul>

                <hr />

                <h2 id="api-endpoints">REST API Endpoints</h2>
                <p>Comprehensive RESTful API following OpenAPI 3.0 specification:</p>

                <h3>Authentication Endpoints</h3>
                <ul>
                  <li><code>POST /auth/login</code> - User authentication with credentials</li>
                  <li><code>POST /auth/register</code> - New user registration</li>
                  <li><code>POST /auth/refresh</code> - Token refresh using refresh token</li>
                  <li><code>POST /auth/logout</code> - Secure logout with token blacklisting</li>
                  <li><code>POST /auth/forgot-password</code> - Password reset initiation</li>
                  <li><code>POST /auth/reset-password</code> - Password reset completion</li>
                </ul>

                <h3>User Management Endpoints</h3>
                <ul>
                  <li><code>GET /api/users</code> - List users with pagination and filtering</li>
                  <li><code>GET /api/users/&#123;id&#125;</code> - Get user details</li>
                  <li><code>PUT /api/users/&#123;id&#125;</code> - Update user information</li>
                  <li><code>DELETE /api/users/&#123;id&#125;</code> - Deactivate user account</li>
                  <li><code>POST /api/users/&#123;id&#125;/roles</code> - Assign roles to user</li>
                  <li><code>GET /api/users/&#123;id&#125;/sessions</code> - View active user sessions</li>
                </ul>

                <h3>Profile Management</h3>
                <ul>
                  <li><code>GET /api/profile</code> - Get current user profile</li>
                  <li><code>PUT /api/profile</code> - Update profile information</li>
                  <li><code>POST /api/profile/change-password</code> - Change password</li>
                  <li><code>GET /api/profile/login-history</code> - View login history</li>
                </ul>

                <hr />

                <h2 id="configuration">Configuration Management</h2>
                <p>Flexible configuration system supporting multiple environments and deployment scenarios:</p>

                <h3>Configuration Files</h3>
                <ul>
                  <li><code>application.properties</code> - Base configuration with JWT and security settings</li>
                  <li><code>application-mysql.properties</code> - MySQL-specific database configuration</li>
                  <li><code>application-postgresql.properties</code> - PostgreSQL-specific database configuration</li>
                  <li><code>application-mssql.properties</code> - SQL Server-specific database configuration</li>
                  <li><code>application-dev.properties</code> - Development environment overrides</li>
                  <li><code>application-prod.properties</code> - Production environment optimizations</li>
                </ul>

                <h3>Key Configuration Properties</h3>
                <div className="bg-gray-900 rounded-lg p-6 my-6 overflow-x-auto">
                  <div className="text-sm font-mono text-gray-100 whitespace-pre leading-relaxed">
{`# JWT Configuration
app.jwt.secret=your-secret-key
app.jwt.access-token-expiration=900000    # 15 minutes
app.jwt.refresh-token-expiration=604800000 # 7 days

# Security Settings
app.security.max-login-attempts=5
app.security.account-lockout-duration=1800000 # 30 minutes
app.security.password-history-limit=12

# Database Settings
spring.datasource.url=jdbc:mysql://localhost:3306/myapp
spring.datasource.username=user
spring.datasource.password=password
spring.jpa.hibernate.ddl-auto=validate`}
                  </div>
                </div>

                <hr />

                <h2 id="user-management">User Management System</h2>
                <p>Complete user lifecycle management with role-based access control:</p>

                <h3>User Roles & Permissions</h3>
                <ul>
                  <li><strong>ROLE_USER</strong> - Standard user with basic access permissions</li>
                  <li><strong>ROLE_MODERATOR</strong> - Enhanced permissions for content moderation</li>
                  <li><strong>ROLE_ADMIN</strong> - Full administrative access to all features</li>
                  <li><strong>Custom Roles</strong> - Support for application-specific role definitions</li>
                </ul>

                <h3>User Lifecycle</h3>
                <ul>
                  <li><strong>Registration</strong> - Self-registration with email verification</li>
                  <li><strong>Activation</strong> - Email-based account activation workflow</li>
                  <li><strong>Profile Management</strong> - User-controlled profile updates</li>
                  <li><strong>Deactivation</strong> - Soft delete preserving audit trails</li>
                </ul>

                <h3>Session Management</h3>
                <ul>
                  <li><strong>Active Sessions</strong> - Track concurrent user sessions</li>
                  <li><strong>Session Limits</strong> - Configurable maximum concurrent sessions</li>
                  <li><strong>Remote Logout</strong> - Administrative session termination</li>
                  <li><strong>Session Monitoring</strong> - Real-time session analytics</li>
                </ul>

                <hr />

                <h2 id="project-structure">Backend Project Structure</h2>
                <p>Well-organized Maven project following Spring Boot best practices:</p>

                <div className="bg-gray-900 rounded-lg p-6 my-6 overflow-x-auto">
                  <div className="text-sm font-mono text-gray-100 whitespace-pre leading-relaxed">
{`backend/
├── src/main/java/com/example/myapp/
│   ├── BackendApplication.java          # Main Spring Boot application class
│   ├── config/
│   │   ├── SecurityConfig.java          # Spring Security configuration
│   │   ├── JwtConfig.java              # JWT token configuration
│   │   ├── DatabaseConfig.java         # Database connection setup
│   │   └── CorsConfig.java             # CORS policy configuration
│   ├── controller/
│   │   ├── AuthController.java         # Authentication endpoints
│   │   ├── UserController.java         # User management endpoints
│   │   └── ProfileController.java      # User profile endpoints
│   ├── dto/
│   │   ├── LoginRequest.java           # Request/response DTOs
│   │   ├── LoginResponse.java
│   │   └── UserDto.java
│   ├── entity/
│   │   ├── User.java                   # JPA entity classes
│   │   ├── Role.java
│   │   ├── UserSession.java
│   │   └── LoginHistory.java
│   ├── repository/
│   │   ├── UserRepository.java         # JPA repositories
│   │   ├── RoleRepository.java
│   │   └── UserSessionRepository.java
│   ├── service/
│   │   ├── AuthService.java            # Business logic services
│   │   ├── UserService.java
│   │   └── JwtService.java
│   ├── security/
│   │   ├── JwtAuthenticationFilter.java # JWT processing
│   │   ├── UserDetailsServiceImpl.java # User details for Spring Security
│   │   └── JwtUtils.java               # JWT utility methods
│   └── exception/
│       ├── GlobalExceptionHandler.java # Global error handling
│       └── CustomExceptions.java       # Application-specific exceptions
├── src/main/resources/
│   ├── application.properties          # Base configuration
│   ├── application-mysql.properties    # Database-specific configs
│   ├── application-postgresql.properties
│   ├── application-mssql.properties
│   └── db/migration/                   # Flyway migration scripts
├── src/test/java/                      # Unit and integration tests
├── pom.xml                            # Maven dependencies and build config
├── Dockerfile                         # Docker container configuration
└── README.md                          # Backend-specific documentation`}
                  </div>
                </div>

                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6 my-6">
                  <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-100 mb-3">💡 Development Note</h3>
                  <p className="text-amber-800 dark:text-amber-200">
                    The backend includes comprehensive unit and integration tests, Docker support for containerized deployment, and detailed API documentation generated from OpenAPI annotations.
                  </p>
                </div>

              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}