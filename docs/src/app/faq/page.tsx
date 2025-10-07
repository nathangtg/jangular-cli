import Sidebar from '@/app/components/sidebar';
import Header from '@/app/components/header';

export default function FAQPage() {
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
                <h1 className="text-4xl font-bold text-foreground mb-4">Frequently Asked Questions</h1>
                <p className="text-xl text-foreground-muted leading-relaxed">
                  Common questions and answers about JAngular CLI, covering installation, configuration, development workflows, and troubleshooting.
                </p>
              </div>

              {/* Content */}
              <div className="prose prose-gray dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-foreground/90 prose-strong:text-foreground prose-code:text-foreground prose-code:bg-card/50 prose-pre:bg-gray-900 prose-pre:text-gray-100">
                
                <h2 id="getting-started">Getting Started</h2>
                
                <h3>What is JAngular CLI?</h3>
                <p>JAngular CLI is a comprehensive command-line interface tool for rapidly bootstrapping enterprise-grade full-stack applications. It combines Angular 17+ (frontend) with Spring Boot 3.x (Java 21 backend), providing integrated security, authentication, database management, Docker containerization, and deployment strategies. The tool follows industry best practices and generates production-ready code with comprehensive documentation.</p>

                <h3>What are the system requirements?</h3>
                <p>To use JAngular CLI, you need:</p>
                <ul>
                  <li><strong>Node.js</strong> - Version 18.x or higher</li>
                  <li><strong>Java</strong> - JDK 21 or higher (Eclipse Temurin recommended)</li>
                  <li><strong>Maven</strong> - Version 3.6.0 or higher</li>
                  <li><strong>Angular CLI</strong> - Version 17.x or higher</li>
                  <li><strong>Docker</strong> - Latest stable version (optional but recommended)</li>
                  <li><strong>Git</strong> - For version control and project management</li>
                </ul>

                <h3>How do I install JAngular CLI?</h3>
                <p>Install JAngular CLI globally using npm:</p>
                <pre><code># Install JAngular CLI
npm install -g jangular-cli

# Verify installation
jangular --version

# Check system requirements
jangular --test</code></pre>

                <h3>Do I need to install Angular CLI separately?</h3>
                <p>Yes, Angular CLI is a prerequisite. Install it globally before using JAngular:</p>
                <pre><code># Install Angular CLI
npm install -g @angular/cli@^17.0.0

# Verify Angular CLI installation
ng version</code></pre>

                <hr />

                <h2 id="project-creation">Project Creation & Configuration</h2>

                <h3>How do I create a new project?</h3>
                <p>Create a new JAngular project using the init command:</p>
                <pre><code># Create new project
jangular init my-enterprise-app

# Create with custom configuration
jangular init my-app --group-id com.mycompany --artifact-id backend-service</code></pre>

                <h3>Can I customize the project structure during initialization?</h3>
                <p>Yes, JAngular CLI provides several customization options during project creation:</p>
                <ul>
                  <li><strong>Java Package Structure</strong> - Custom group ID and artifact ID</li>
                  <li><strong>Database Selection</strong> - Choose between MySQL, PostgreSQL, or SQL Server</li>
                  <li><strong>Authentication Configuration</strong> - JWT settings and security policies</li>
                  <li><strong>Project Name</strong> - Custom application name and metadata</li>
                </ul>

                <h3>What happens after project creation?</h3>
                <p>JAngular generates a complete project structure with:</p>
                <ul>
                  <li>Spring Boot backend with security configuration</li>
                  <li>Angular frontend with authentication components</li>
                  <li>Docker configuration for all services</li>
                  <li>Database migrations and initial schema</li>
                  <li>Comprehensive documentation and README files</li>
                  <li>CI/CD pipeline templates</li>
                </ul>

                <hr />

                <h2 id="database">Database Management</h2>

                <h3>Which databases are supported?</h3>
                <p>JAngular supports multiple enterprise databases:</p>
                <ul>
                  <li><strong>MySQL 8.0+</strong> - Popular open-source database with excellent performance</li>
                  <li><strong>PostgreSQL 13+</strong> - Advanced open-source database with JSON support</li>
                  <li><strong>Microsoft SQL Server 2019+</strong> - Enterprise database for Windows environments</li>
                </ul>

                <h3>How do database migrations work?</h3>
                <p>JAngular uses Flyway for robust database migration management:</p>
                <ul>
                  <li><strong>Versioned Migrations</strong> - Sequential SQL scripts with version control</li>
                  <li><strong>Database-Specific Scripts</strong> - Optimized SQL for each database type</li>
                  <li><strong>Automatic Execution</strong> - Migrations run automatically on application startup</li>
                  <li><strong>Rollback Support</strong> - Safe rollback capabilities for failed migrations</li>
                  <li><strong>Environment Consistency</strong> - Same schema across development, staging, and production</li>
                </ul>

                <h3>Can I change the database after project creation?</h3>
                <p>While possible, it requires manual configuration changes:</p>
                <ol>
                  <li>Update database dependencies in <code>pom.xml</code></li>
                  <li>Modify database configuration in <code>application.properties</code></li>
                  <li>Replace Flyway migration scripts with database-specific versions</li>
                  <li>Update Docker Compose configuration</li>
                  <li>Test thoroughly in development environment</li>
                </ol>
                <p>For significant changes, creating a new project is often more efficient.</p>

                <h3>How do I connect to external databases?</h3>
                <p>Update the database configuration in your environment-specific properties files:</p>
                <pre><code># application-prod.properties
spring.datasource.url=jdbc:mysql://production-db.example.com:3306/myapp
spring.datasource.username=prod_user
spring.datasource.password=secure_password
spring.jpa.hibernate.ddl-auto=validate</code></pre>

                <hr />

                <h2 id="authentication-security">Authentication & Security</h2>

                <h3>How is authentication implemented?</h3>
                <p>JAngular implements comprehensive JWT-based authentication:</p>
                <ul>
                  <li><strong>Access Tokens</strong> - Short-lived JWT tokens for API authentication (15 minutes default)</li>
                  <li><strong>Refresh Tokens</strong> - Long-lived tokens for session renewal (7 days default)</li>
                  <li><strong>Automatic Refresh</strong> - Seamless token renewal without user intervention</li>
                  <li><strong>Secure Storage</strong> - Browser storage with automatic cleanup</li>
                  <li><strong>Token Blacklisting</strong> - Immediate invalidation on logout</li>
                </ul>

                <h3>What security features are included?</h3>
                <p>JAngular provides enterprise-grade security features:</p>
                <ul>
                  <li><strong>Password Security</strong> - BCrypt hashing with configurable strength</li>
                  <li><strong>Account Protection</strong> - Automatic lockout after failed attempts</li>
                  <li><strong>Password Policies</strong> - Complexity requirements and history tracking</li>
                  <li><strong>CSRF Protection</strong> - Cross-site request forgery prevention</li>
                  <li><strong>CORS Configuration</strong> - Flexible cross-origin resource sharing</li>
                  <li><strong>SQL Injection Prevention</strong> - Parameterized queries and JPA protection</li>
                  <li><strong>XSS Protection</strong> - Output encoding and sanitization</li>
                </ul>

                <h3>Can I customize the authentication system?</h3>
                <p>Yes, the authentication system is fully customizable:</p>
                <ul>
                  <li><strong>JWT Configuration</strong> - Custom secret keys and token expiration</li>
                  <li><strong>Additional Providers</strong> - OAuth2, LDAP, or custom authentication</li>
                  <li><strong>Password Policies</strong> - Custom complexity and history requirements</li>
                  <li><strong>Role-Based Access</strong> - Custom roles and permission systems</li>
                  <li><strong>Security Headers</strong> - Additional security header configuration</li>
                </ul>

                <h3>How do I implement role-based access control?</h3>
                <p>JAngular includes built-in RBAC with three default roles:</p>
                <ul>
                  <li><strong>ROLE_USER</strong> - Standard user permissions</li>
                  <li><strong>ROLE_MODERATOR</strong> - Enhanced permissions for content management</li>
                  <li><strong>ROLE_ADMIN</strong> - Full administrative access</li>
                </ul>
                <p>You can extend this system by adding custom roles and permissions in the backend security configuration.</p>

                <hr />

                <h2 id="frontend-development">Frontend Development</h2>

                <h3>What frontend technologies are used?</h3>
                <p>The JAngular frontend leverages modern Angular features:</p>
                <ul>
                  <li><strong>Angular 17+</strong> - Latest Angular with standalone components</li>
                  <li><strong>TypeScript 5.0+</strong> - Strong typing and modern JavaScript features</li>
                  <li><strong>Tailwind CSS</strong> - Utility-first CSS framework</li>
                  <li><strong>RxJS</strong> - Reactive programming for asynchronous operations</li>
                  <li><strong>Angular Signals</strong> - Modern state management</li>
                  <li><strong>Control Flow Syntax</strong> - New @if, @for, @switch directives</li>
                </ul>

                <h3>Can I customize the UI framework?</h3>
                <p>Yes, you can replace or supplement Tailwind CSS:</p>
                <ul>
                  <li><strong>Bootstrap</strong> - Add Bootstrap for component-based styling</li>
                  <li><strong>Angular Material</strong> - Integrate Material Design components</li>
                  <li><strong>PrimeNG</strong> - Rich UI component library</li>
                  <li><strong>Custom CSS</strong> - Implement your own design system</li>
                </ul>

                <h3>How do I add new components?</h3>
                <p>Use Angular CLI commands within the frontend directory:</p>
                <pre><code># Navigate to frontend directory
cd frontend

# Generate new component
ng generate component features/my-feature

# Generate service
ng generate service services/my-service

# Generate guard
ng generate guard guards/my-guard</code></pre>

                <h3>What routing patterns are implemented?</h3>
                <p>The frontend uses advanced Angular routing:</p>
                <ul>
                  <li><strong>Lazy Loading</strong> - Feature modules loaded on demand</li>
                  <li><strong>Route Guards</strong> - Authentication and authorization protection</li>
                  <li><strong>Route Resolvers</strong> - Pre-load data before navigation</li>
                  <li><strong>Deep Linking</strong> - Bookmarkable URLs with state restoration</li>
                  <li><strong>Route Preloading</strong> - Strategic module preloading</li>
                </ul>

                <hr />

                <h2 id="backend-development">Backend Development</h2>

                <h3>What backend technologies are used?</h3>
                <p>The JAngular backend uses modern Spring ecosystem:</p>
                <ul>
                  <li><strong>Spring Boot 3.x</strong> - Modern Spring framework with Java 21</li>
                  <li><strong>Spring Security 6.x</strong> - Comprehensive security framework</li>
                  <li><strong>Spring Data JPA</strong> - Data access layer with Hibernate</li>
                  <li><strong>Spring Web</strong> - RESTful web services</li>
                  <li><strong>Flyway</strong> - Database migration management</li>
                  <li><strong>Maven</strong> - Dependency management and build tool</li>
                </ul>

                <h3>How do I add new API endpoints?</h3>
                <p>Follow the established patterns in the generated code:</p>
                <ol>
                  <li><strong>Create Entity</strong> - JPA entity in the <code>entity</code> package</li>
                  <li><strong>Create Repository</strong> - JPA repository interface</li>
                  <li><strong>Create Service</strong> - Business logic in the <code>service</code> package</li>
                  <li><strong>Create Controller</strong> - REST endpoints in the <code>controller</code> package</li>
                  <li><strong>Create DTOs</strong> - Data transfer objects for API responses</li>
                  <li><strong>Add Tests</strong> - Unit and integration tests</li>
                </ol>

                <h3>How is the backend structured?</h3>
                <p>The backend follows Spring Boot best practices:</p>
                <ul>
                  <li><strong>Package Organization</strong> - Separation by feature and layer</li>
                  <li><strong>Configuration Classes</strong> - Centralized configuration management</li>
                  <li><strong>Exception Handling</strong> - Global exception handling with custom responses</li>
                  <li><strong>Validation</strong> - Bean validation with custom validators</li>
                  <li><strong>Documentation</strong> - OpenAPI 3.0 specification generation</li>
                </ul>

                <h3>What Java version is required?</h3>
                <p>JAngular requires <strong>Java 21 or higher</strong>. This is because:</p>
                <ul>
                  <li>Spring Boot 3.x requires Java 17+ as minimum</li>
                  <li>Java 21 provides the latest LTS features and performance improvements</li>
                  <li>Modern language features improve code quality and maintainability</li>
                  <li>Better performance and memory management</li>
                </ul>

                <hr />

                <h2 id="docker-containerization">Docker & Containerization</h2>

                <h3>What Docker features are included?</h3>
                <p>JAngular provides comprehensive Docker integration:</p>
                <ul>
                  <li><strong>Multi-Stage Builds</strong> - Optimized Docker images with minimal size</li>
                  <li><strong>Docker Compose</strong> - Complete application stack orchestration</li>
                  <li><strong>Database Services</strong> - Containerized database with persistent storage</li>
                  <li><strong>Database Administration</strong> - Web-based database management tools</li>
                  <li><strong>Production Configuration</strong> - Separate production Docker Compose setup</li>
                  <li><strong>Health Checks</strong> - Container health monitoring</li>
                </ul>

                <h3>Do I need Docker to use JAngular?</h3>
                <p>Docker is optional but highly recommended:</p>
                <ul>
                  <li><strong>Without Docker</strong> - Run backend with Maven and frontend with Angular CLI</li>
                  <li><strong>With Docker</strong> - Consistent environment across development and production</li>
                  <li><strong>Database</strong> - Docker simplifies database setup and management</li>
                  <li><strong>Deployment</strong> - Docker enables easy deployment to cloud platforms</li>
                </ul>

                <h3>How do I manage Docker services?</h3>
                <p>Use the interactive Docker management command:</p>
                <pre><code># Launch Docker management interface
jangular docker

# Manual Docker Compose commands
docker-compose up -d          # Start all services
docker-compose logs -f        # View logs
docker-compose down          # Stop services
docker-compose down -v       # Stop and remove volumes</code></pre>

                <h3>What&apos;s included in the Docker setup?</h3>
                <p>The Docker configuration includes:</p>
                <ul>
                  <li><strong>Application Services</strong> - Backend and frontend containers</li>
                  <li><strong>Database Service</strong> - MySQL, PostgreSQL, or SQL Server</li>
                  <li><strong>Database GUI</strong> - phpMyAdmin, pgAdmin, or SSMS</li>
                  <li><strong>Network Configuration</strong> - Service discovery and communication</li>
                  <li><strong>Volume Management</strong> - Persistent data storage</li>
                  <li><strong>Environment Variables</strong> - Configuration management</li>
                </ul>

                <hr />

                <h2 id="development-workflow">Development Workflow</h2>

                <h3>What&apos;s the recommended development workflow?</h3>
                <p>Follow this workflow for optimal development experience:</p>
                <ol>
                  <li><strong>Project Setup</strong> - Initialize project with <code>jangular init</code></li>
                  <li><strong>Install Dependencies</strong> - Run <code>npm run install:all</code></li>
                  <li><strong>Start Services</strong> - Use Docker or run services directly</li>
                  <li><strong>Development</strong> - Develop with hot reload enabled</li>
                  <li><strong>Testing</strong> - Run tests with <code>jangular test</code></li>
                  <li><strong>Building</strong> - Build for production with <code>jangular build --prod</code></li>
                  <li><strong>Deployment</strong> - Deploy using Docker or cloud platforms</li>
                </ol>

                <h3>How do I run the application in development?</h3>
                <p>You have multiple options for development:</p>

                <h4>Option 1: Docker (Recommended)</h4>
                <pre><code># Start complete development stack
docker-compose up -d

# View logs
docker-compose logs -f</code></pre>

                <h4>Option 2: Direct Execution</h4>
                <pre><code># Terminal 1: Start backend
npm run start:backend

# Terminal 2: Start frontend
npm run start:frontend</code></pre>

                <h3>How do I test the application?</h3>
                <p>JAngular provides comprehensive testing capabilities:</p>
                <pre><code># Run all tests
jangular test

# Run backend tests only
jangular test --backend

# Run frontend tests only
jangular test --frontend

# System requirements test
jangular --test</code></pre>

                <h3>How do I build for production?</h3>
                <p>Build optimized production artifacts:</p>
                <pre><code># Build everything for production
jangular build --all --prod

# Build specific components
jangular build --backend --prod
jangular build --frontend</code></pre>

                <hr />

                <h2 id="deployment">Deployment & Production</h2>

                <h3>What deployment options are available?</h3>
                <p>JAngular supports multiple deployment strategies:</p>
                <ul>
                  <li><strong>Docker Compose</strong> - Simple containerized deployment</li>
                  <li><strong>Cloud Platforms</strong> - AWS, GCP, Azure with container services</li>
                  <li><strong>Kubernetes</strong> - Scalable orchestration with provided manifests</li>
                  <li><strong>Traditional Servers</strong> - JAR deployment with reverse proxy</li>
                </ul>

                <h3>How do I deploy to cloud platforms?</h3>
                <p>JAngular includes guides for major cloud providers:</p>
                <ul>
                  <li><strong>AWS</strong> - ECS, EKS, and Elastic Beanstalk deployment</li>
                  <li><strong>Google Cloud</strong> - Cloud Run, GKE, and App Engine deployment</li>
                  <li><strong>Azure</strong> - Container Instances, AKS, and App Service deployment</li>
                  <li><strong>DigitalOcean</strong> - App Platform and Kubernetes deployment</li>
                </ul>

                <h3>What about CI/CD integration?</h3>
                <p>The generated project includes CI/CD templates for:</p>
                <ul>
                  <li><strong>GitHub Actions</strong> - Complete workflow with testing and deployment</li>
                  <li><strong>GitLab CI/CD</strong> - Pipeline configuration with Docker integration</li>
                  <li><strong>Jenkins</strong> - Jenkinsfile for traditional CI/CD setups</li>
                  <li><strong>Azure DevOps</strong> - Pipeline templates for Microsoft ecosystem</li>
                </ul>

                <hr />

                <h2 id="troubleshooting">Troubleshooting</h2>

                <h3>What if the requirements check fails?</h3>
                <p>Run the system requirements test to identify issues:</p>
                <pre><code># Check system requirements
jangular --test

# Common issues and solutions:
# - Node.js version: Update to version 18+
# - Java version: Install JDK 21+
# - Maven: Install Maven 3.6.0+
# - Angular CLI: Install @angular/cli@^17.0.0</code></pre>

                <h3>How do I resolve port conflicts?</h3>
                <p>Default ports used by JAngular:</p>
                <ul>
                  <li><strong>Frontend</strong> - Port 4200 (Angular dev server)</li>
                  <li><strong>Backend</strong> - Port 8080 (Spring Boot)</li>
                  <li><strong>Database</strong> - Port 3306 (MySQL), 5432 (PostgreSQL), 1433 (SQL Server)</li>
                  <li><strong>Database GUI</strong> - Port 8081 (phpMyAdmin), 5050 (pgAdmin)</li>
                </ul>
                <p>Modify ports in <code>docker-compose.yml</code> or application configuration files.</p>

                <h3>What if Docker services fail to start?</h3>
                <p>Common Docker troubleshooting steps:</p>
                <ol>
                  <li>Check Docker is running: <code>docker --version</code></li>
                  <li>Check port availability: <code>netstat -an | grep :8080</code></li>
                  <li>Clean Docker resources: <code>docker-compose down -v</code></li>
                  <li>Rebuild images: <code>docker-compose build --no-cache</code></li>
                  <li>Check logs: <code>docker-compose logs</code></li>
                </ol>

                <h3>How do I resolve database connection issues?</h3>
                <p>Database connection troubleshooting:</p>
                <ol>
                  <li>Verify database is running: <code>docker-compose ps</code></li>
                  <li>Check database health: Use the Docker management menu</li>
                  <li>Verify credentials in <code>application.properties</code></li>
                  <li>Check network connectivity between services</li>
                  <li>Review database logs: <code>docker-compose logs mysql</code></li>
                </ol>

                <h3>What if frontend build fails?</h3>
                <p>Frontend build troubleshooting:</p>
                <ol>
                  <li>Clear npm cache: <code>npm cache clean --force</code></li>
                  <li>Delete node_modules: <code>rm -rf node_modules && npm install</code></li>
                  <li>Check Angular CLI version: <code>ng version</code></li>
                  <li>Update dependencies: <code>npm update</code></li>
                  <li>Check for TypeScript errors: <code>ng build --verbose</code></li>
                </ol>

                <hr />

                <h2 id="support-community">Support & Community</h2>

                <h3>How do I get help?</h3>
                <p>Multiple support channels are available:</p>
                <ul>
                  <li><strong>Documentation</strong> - Comprehensive guides covering all features</li>
                  <li><strong>GitHub Issues</strong> - Report bugs and request features</li>
                  <li><strong>Community Discussions</strong> - Ask questions and share solutions</li>
                  <li><strong>Stack Overflow</strong> - Tag questions with &quot;jangular-cli&quot;</li>
                </ul>

                <h3>How do I report issues?</h3>
                <p>When reporting issues on <a href="https://github.com/nathangtg/jangular-cli" className="text-primary hover:underline">GitHub</a>, include:</p>
                <ul>
                  <li><strong>System Information</strong> - OS, Node.js, Java, and CLI versions</li>
                  <li><strong>Steps to Reproduce</strong> - Exact commands and actions taken</li>
                  <li><strong>Error Messages</strong> - Complete error output and stack traces</li>
                  <li><strong>Expected Behavior</strong> - What should have happened</li>
                  <li><strong>Configuration</strong> - Relevant configuration files and settings</li>
                </ul>

                <h3>How can I contribute to JAngular?</h3>
                <p>Contributions are welcome in many forms:</p>
                <ul>
                  <li><strong>Bug Reports</strong> - Help identify and fix issues</li>
                  <li><strong>Feature Requests</strong> - Suggest new functionality</li>
                  <li><strong>Documentation</strong> - Improve guides and examples</li>
                  <li><strong>Code Contributions</strong> - Submit pull requests</li>
                  <li><strong>Testing</strong> - Test on different platforms and configurations</li>
                  <li><strong>Community Support</strong> - Help other users in discussions</li>
                </ul>

                <h3>How do I stay updated?</h3>
                <p>Keep up with JAngular developments:</p>
                <ul>
                  <li><strong>GitHub Releases</strong> - Watch the repository for new releases</li>
                  <li><strong>CLI Notifications</strong> - Automatic update notifications</li>
                  <li><strong>Release Notes</strong> - Detailed changelog for each version</li>
                  <li><strong>Breaking Changes</strong> - Migration guides for major updates</li>
                </ul>

                <h3>How do I update JAngular CLI?</h3>
                <p>Keep your CLI installation current:</p>
                <pre><code># Update to latest version
npm install -g jangular-cli@latest

# Check current version
jangular --version

# View available updates
npm outdated -g jangular-cli</code></pre>

                <blockquote>
                  <p><strong>Community Support:</strong> JAngular is an open-source project that thrives on community contributions. Whether you&apos;re reporting issues, suggesting features, or helping other developers, your participation helps make JAngular better for everyone.</p>
                </blockquote>

              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}