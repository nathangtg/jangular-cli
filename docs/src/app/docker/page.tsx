import Sidebar from '@/app/components/sidebar';
import Header from '@/app/components/header';

export default function DockerPage() {
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
                <h1 className="text-4xl font-bold text-foreground mb-4">Docker Integration</h1>
                <p className="text-xl text-foreground-muted leading-relaxed">
                  Complete containerization solution for JAngular applications with Docker Compose, multi-stage builds, and production-ready deployment configurations.
                </p>
              </div>

              {/* Content */}
              <div className="prose prose-gray dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-foreground/90 prose-strong:text-foreground prose-code:text-foreground prose-code:bg-card/50 prose-pre:bg-gray-900 prose-pre:text-gray-100">
                
                <p>JAngular provides comprehensive Docker integration with optimized containerization for all application components. The Docker setup includes multi-stage builds, persistent data storage, service orchestration, and production-ready configurations for seamless deployment across environments.</p>

                <h2 id="containerized-architecture">Containerized Architecture</h2>
                <p>The JAngular Docker setup consists of a complete microservices architecture with the following containerized components:</p>

                <h3>Core Application Services</h3>
                <ul>
                  <li><strong>Backend Service</strong> - Spring Boot application with Eclipse Temurin JDK 21</li>
                  <li><strong>Frontend Service</strong> - Angular application served through Nginx with optimized static content delivery</li>
                  <li><strong>Reverse Proxy</strong> - Nginx-based routing and load balancing for production deployments</li>
                </ul>

                <h3>Database Services</h3>
                <ul>
                  <li><strong>MySQL 8.0+</strong> - High-performance relational database with InnoDB storage engine</li>
                  <li><strong>PostgreSQL 15+</strong> - Advanced open-source database with JSON support and performance optimizations</li>
                  <li><strong>Microsoft SQL Server 2019+</strong> - Enterprise database for Windows-based environments</li>
                </ul>

                <h3>Database Management Tools</h3>
                <ul>
                  <li><strong>phpMyAdmin</strong> - Web-based MySQL administration interface</li>
                  <li><strong>pgAdmin 4</strong> - PostgreSQL administration and development platform</li>
                  <li><strong>SQL Server Management Studio (SSMS)</strong> - Microsoft SQL Server administration tools</li>
                </ul>

                <hr />

                <h2 id="docker-cli-management">Docker CLI Management</h2>
                <p>The JAngular CLI provides an interactive Docker management interface for easy container orchestration:</p>

                <h3>Interactive Docker Menu</h3>
                <pre><code>jangular docker</code></pre>

                <p>This command launches an interactive menu with the following capabilities:</p>

                <h3>Service Management</h3>
                <ul>
                  <li><strong>Start All Services</strong> - Launch complete application stack with one command</li>
                  <li><strong>Stop All Services</strong> - Gracefully shutdown all containers</li>
                  <li><strong>Start Specific Services</strong> - Launch individual components (database, backend, frontend)</li>
                  <li><strong>Restart Services</strong> - Restart containers with configuration changes</li>
                </ul>

                <h3>Monitoring & Diagnostics</h3>
                <ul>
                  <li><strong>View Service Logs</strong> - Real-time log streaming for all or specific services</li>
                  <li><strong>Check Database Health</strong> - Database connectivity and performance checks</li>
                  <li><strong>Container Status</strong> - Monitor container health and resource usage</li>
                  <li><strong>Network Diagnostics</strong> - Inter-service communication testing</li>
                </ul>

                <h3>Data Management</h3>
                <ul>
                  <li><strong>Reset Volumes</strong> - Clean database volumes and reset to initial state</li>
                  <li><strong>Backup Data</strong> - Create persistent backups of database volumes</li>
                  <li><strong>Import/Export</strong> - Database migration and seeding utilities</li>
                </ul>

                <h3>Deployment Options</h3>
                <ul>
                  <li><strong>Development Mode</strong> - Hot reload enabled with debug configurations</li>
                  <li><strong>Production Mode</strong> - Optimized builds with security hardening</li>
                  <li><strong>Testing Mode</strong> - Isolated environment for automated testing</li>
                </ul>

                <hr />

                <h2 id="multi-stage-builds">Multi-Stage Docker Builds</h2>
                <p>Optimized Docker builds using multi-stage architecture for minimal image sizes and enhanced security:</p>

                <h3>Backend Build Configuration</h3>
                <pre><code># Stage 1: Build Environment
FROM eclipse-temurin:21-jdk-jammy AS build
WORKDIR /app
COPY pom.xml .
COPY .mvn .mvn
COPY mvnw .
RUN chmod +x mvnw
COPY src ./src
RUN ./mvnw clean package -DskipTests

# Stage 2: Runtime Environment  
FROM eclipse-temurin:21-jre-jammy
RUN groupadd -r spring && useradd -r -g spring spring
USER spring:spring
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8080/actuator/health || exit 1
ENTRYPOINT [&apos;java&apos;, &apos;-jar&apos;, &apos;app.jar&apos;]</code></pre>

                <h3>Frontend Build Configuration</h3>
                <pre><code># Stage 1: Build Environment
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force
COPY . .
RUN npm run build --prod

# Stage 2: Web Server
FROM nginx:alpine
RUN addgroup -g 1001 -S nginx && adduser -S nginx -u 1001
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
COPY nginx-default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1
CMD [&apos;nginx&apos;, &apos;-g&apos;, &apos;daemon off;&apos;]</code></pre>

                <h3>Build Optimizations</h3>
                <ul>
                  <li><strong>Layer Caching</strong> - Optimized layer ordering for maximum cache efficiency</li>
                  <li><strong>Multi-Architecture</strong> - Support for ARM64 and AMD64 architectures</li>
                  <li><strong>Security Hardening</strong> - Non-root users and minimal attack surface</li>
                  <li><strong>Health Checks</strong> - Built-in health monitoring for container orchestration</li>
                </ul>

                <hr />

                <h2 id="docker-compose-orchestration">Docker Compose Orchestration</h2>
                <p>Comprehensive service orchestration with environment-specific configurations:</p>

                <h3>Development Configuration</h3>
                <pre><code># Start development environment
docker-compose up -d

# View aggregated logs
docker-compose logs -f

# View logs for specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mysql

# Stop all services
docker-compose down

# Stop and remove volumes (clean slate)
docker-compose down -v --remove-orphans</code></pre>

                <h3>Production Configuration</h3>
                <pre><code># Deploy production environment
docker-compose -f docker-compose.prod.yml up -d

# Production health check
docker-compose -f docker-compose.prod.yml ps

# Scale services
docker-compose -f docker-compose.prod.yml up -d --scale backend=3

# Production shutdown
docker-compose -f docker-compose.prod.yml down</code></pre>

                <h3>Service Dependencies</h3>
                <ul>
                  <li><strong>Startup Order</strong> - Database services start before application services</li>
                  <li><strong>Health Dependencies</strong> - Applications wait for database readiness</li>
                  <li><strong>Network Isolation</strong> - Services communicate through dedicated Docker networks</li>
                  <li><strong>Volume Management</strong> - Persistent storage for databases and configuration</li>
                </ul>

                <hr />

                <h2 id="environment-configuration">Environment Configuration</h2>
                <p>Flexible configuration management supporting multiple deployment scenarios:</p>

                <h3>Environment Variables</h3>
                <pre><code># Backend Environment
SPRING_PROFILES_ACTIVE=docker
SPRING_DATASOURCE_URL=jdbc:mysql://mysql:3306/jangular
SPRING_DATASOURCE_USERNAME=jangular_user
SPRING_DATASOURCE_PASSWORD=secure_password
JWT_SECRET=your-production-jwt-secret
CORS_ALLOWED_ORIGINS=http://frontend:80

# Frontend Environment  
ANGULAR_ENV=production
API_BASE_URL=http://backend:8080/api
AUTH_BASE_URL=http://backend:8080/auth

# Database Environment
MYSQL_ROOT_PASSWORD=root_password
MYSQL_DATABASE=jangular
MYSQL_USER=jangular_user
MYSQL_PASSWORD=secure_password</code></pre>

                <h3>Configuration Files</h3>
                <ul>
                  <li><strong>.env</strong> - Development environment variables</li>
                  <li><strong>.env.prod</strong> - Production environment variables</li>
                  <li><strong>.env.test</strong> - Testing environment variables</li>
                  <li><strong>docker-compose.override.yml</strong> - Local development overrides</li>
                </ul>

                <h3>Security Considerations</h3>
                <ul>
                  <li><strong>Secret Management</strong> - Docker secrets for sensitive configuration</li>
                  <li><strong>Environment Isolation</strong> - Separate configurations per environment</li>
                  <li><strong>Credential Rotation</strong> - Support for dynamic credential updates</li>
                  <li><strong>Access Control</strong> - Network policies and service isolation</li>
                </ul>

                <hr />

                <h2 id="persistent-storage">Persistent Storage & Volumes</h2>
                <p>Robust data persistence with backup and recovery capabilities:</p>

                <h3>Volume Configuration</h3>
                <ul>
                  <li><strong>Database Volumes</strong> - Persistent storage for database files</li>
                  <li><strong>Configuration Volumes</strong> - Application configuration and secrets</li>
                  <li><strong>Log Volumes</strong> - Centralized logging and audit trails</li>
                  <li><strong>Upload Volumes</strong> - User-generated content storage</li>
                </ul>

                <h3>Backup Strategy</h3>
                <pre><code># Database backup
docker-compose exec mysql mysqldump -u root -p jangular &gt; backup.sql

# Volume backup
docker run --rm -v jangular_mysql_data:/data -v $(pwd):/backup \
  alpine tar czf /backup/mysql-backup.tar.gz /data

# Restore from backup
docker run --rm -v jangular_mysql_data:/data -v $(pwd):/backup \
  alpine tar xzf /backup/mysql-backup.tar.gz -C /</code></pre>

                <h3>Data Management</h3>
                <ul>
                  <li><strong>Volume Snapshots</strong> - Point-in-time backup creation</li>
                  <li><strong>Data Migration</strong> - Cross-environment data transfer</li>
                  <li><strong>Cleanup Procedures</strong> - Safe volume removal and cleanup</li>
                  <li><strong>Storage Monitoring</strong> - Disk usage and performance metrics</li>
                </ul>

                <hr />

                <h2 id="production-deployment">Production Deployment</h2>
                <p>Enterprise-ready deployment with advanced orchestration and monitoring:</p>

                <h3>Production Features</h3>
                <ul>
                  <li><strong>SSL/TLS Termination</strong> - Automatic certificate management with Let&apos;s Encrypt</li>
                  <li><strong>Load Balancing</strong> - Multi-instance backend scaling with health checks</li>
                  <li><strong>Reverse Proxy</strong> - Nginx-based traffic routing and caching</li>
                  <li><strong>Resource Limits</strong> - Memory and CPU constraints for optimal performance</li>
                  <li><strong>Health Monitoring</strong> - Comprehensive health checks and alerting</li>
                  <li><strong>Log Aggregation</strong> - Centralized logging with structured output</li>
                </ul>

                <h3>Production Commands</h3>
                <pre><code># Production deployment
docker-compose -f docker-compose.prod.yml up -d

# Scale backend services
docker-compose -f docker-compose.prod.yml up -d --scale backend=3

# Rolling updates
docker-compose -f docker-compose.prod.yml up -d --force-recreate backend

# Monitor production health
docker-compose -f docker-compose.prod.yml ps
docker-compose -f docker-compose.prod.yml top</code></pre>

                <h3>Monitoring & Observability</h3>
                <ul>
                  <li><strong>Health Endpoints</strong> - Application and database health monitoring</li>
                  <li><strong>Metrics Collection</strong> - Performance metrics and resource usage</li>
                  <li><strong>Log Analysis</strong> - Error tracking and performance analysis</li>
                  <li><strong>Alerting</strong> - Automated notifications for critical issues</li>
                </ul>

                <hr />

                <h2 id="database-integration">Database Integration</h2>
                <p>Comprehensive database support with administration tools and health monitoring:</p>

                <h3>Database Health Checks</h3>
                <pre><code># MySQL health check
docker-compose exec mysql mysqladmin ping -h localhost -u root -p

# PostgreSQL health check  
docker-compose exec postgres pg_isready -U postgres

# SQL Server health check
docker-compose exec mssql /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P password -Q &quot;SELECT @@VERSION&quot;</code></pre>

                <h3>Database Administration</h3>
                <ul>
                  <li><strong>Web Interfaces</strong> - Browser-based database management</li>
                  <li><strong>Migration Tools</strong> - Automated schema migration and seeding</li>
                  <li><strong>Performance Monitoring</strong> - Query analysis and optimization tools</li>
                  <li><strong>Backup Automation</strong> - Scheduled backup and retention policies</li>
                </ul>

                <h3>Connection Management</h3>
                <ul>
                  <li><strong>Connection Pooling</strong> - Optimized database connection management</li>
                  <li><strong>SSL Encryption</strong> - Secure database communications</li>
                  <li><strong>Access Control</strong> - Role-based database access permissions</li>
                  <li><strong>Network Isolation</strong> - Database network security and isolation</li>
                </ul>

                <blockquote>
                  <p><strong>Production Note:</strong> The Docker configuration includes comprehensive security hardening, performance optimization, and monitoring capabilities suitable for enterprise production environments.</p>
                </blockquote>

              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}