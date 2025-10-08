import Sidebar from '@/app/components/sidebar';
import Header from '@/app/components/header';

export default function DeploymentPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar />
      
      <div className="lg:pl-64">
        <Header />
        
        <div className="py-8 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
          <div className="max-w-4xl mx-auto">
            <main className="animate-fade-in-up">
              {/* Page Header */}
              <div className="mb-12">
                <h1 className="text-4xl font-bold text-foreground mb-4">Deployment Guide</h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Comprehensive deployment strategies for JAngular applications across development, staging, and production environments with cloud platform integration.
                </p>
              </div>

              {/* Content */}
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p>JAngular applications can be deployed across various environments and platforms using multiple strategies. This guide covers everything from local development to enterprise cloud deployments with comprehensive configuration management and best practices.</p>

                <h2 id="development-deployment">Development Deployment</h2>
                <p>Development deployments focus on rapid iteration, debugging capabilities, and ease of testing:</p>

                <h3>Local Development Setup</h3>
                <div className="bg-gray-900 rounded-lg p-6 my-6 overflow-x-auto not-prose">
                  <pre className="text-gray-100 text-sm leading-relaxed">
{`# Install all project dependencies
npm run install:all

# Start backend with hot reload (Terminal 1)
npm run start:backend

# Start frontend with hot reload (Terminal 2)
npm run start:frontend

# Access application
# Frontend: http://localhost:4200
# Backend API: http://localhost:8080
# Database: See docker-compose.yml for ports`}
                  </pre>
                </div>

                <h3>Docker Development Environment</h3>
                <div className="bg-gray-900 rounded-lg p-6 my-6 overflow-x-auto not-prose">
                  <pre className="text-gray-100 text-sm leading-relaxed">
{`# Start complete development stack
docker-compose up -d

# View aggregated logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mysql

# Stop development environment
docker-compose down

# Clean restart (removes volumes)
docker-compose down -v && docker-compose up -d`}
                  </pre>
                </div>

                <h3>Development Features</h3>
                <ul>
                  <li><strong>Hot Reload</strong> - Automatic application restart on code changes</li>
                  <li><strong>Debug Configuration</strong> - Enhanced logging and error reporting</li>
                  <li><strong>Database Seeding</strong> - Automatic test data population</li>
                  <li><strong>Live API Documentation</strong> - Swagger UI for API testing</li>
                  <li><strong>Development Tools</strong> - Angular DevTools and Spring Boot DevTools integration</li>
                </ul>

                <hr />

                <h2 id="staging-deployment">Staging Deployment</h2>
                <p>Staging environments replicate production conditions for thorough testing:</p>

                <h3>Staging Build Process</h3>
                <div className="bg-gray-900 rounded-lg p-6 my-6 overflow-x-auto not-prose">
                  <pre className="text-gray-100 text-sm leading-relaxed">
{`# Build applications for staging
jangular build --all

# Deploy to staging with environment-specific configuration
docker-compose -f docker-compose.staging.yml up -d

# Run staging health checks
docker-compose -f docker-compose.staging.yml ps
curl -f http://staging.yourapp.com/actuator/health`}
                  </pre>
                </div>

                <h3>Staging Configuration</h3>
                <ul>
                  <li><strong>Production-like Data</strong> - Realistic dataset for comprehensive testing</li>
                  <li><strong>Performance Monitoring</strong> - Metrics collection and analysis</li>
                  <li><strong>Security Testing</strong> - Vulnerability scanning and penetration testing</li>
                  <li><strong>Load Testing</strong> - Performance validation under simulated load</li>
                  <li><strong>Integration Testing</strong> - End-to-end workflow validation</li>
                </ul>

                <hr />

                <h2 id="production-deployment">Production Deployment</h2>
                <p>Production deployments prioritize performance, security, and reliability:</p>

                <h3>Production Build Optimization</h3>
                <div className="bg-gray-900 rounded-lg p-6 my-6 overflow-x-auto not-prose">
                  <pre className="text-gray-100 text-sm leading-relaxed">
{`# Build optimized production artifacts
jangular build --all --prod

# Build specific components with production optimizations
jangular build --backend --prod
jangular build --frontend --prod

# Verify build artifacts
ls -la backend/target/
ls -la frontend/dist/`}
                  </pre>
                </div>

                <h3>Production Docker Deployment</h3>
                <div className="bg-gray-900 rounded-lg p-6 my-6 overflow-x-auto not-prose">
                  <pre className="text-gray-100 text-sm leading-relaxed">
{`# Deploy production environment
docker-compose -f docker-compose.prod.yml up -d

# Scale backend services for high availability
docker-compose -f docker-compose.prod.yml up -d --scale backend=3

# Monitor production services
docker-compose -f docker-compose.prod.yml ps
docker-compose -f docker-compose.prod.yml top

# Production health monitoring
docker-compose -f docker-compose.prod.yml exec backend curl http://localhost:8080/actuator/health
docker-compose -f docker-compose.prod.yml logs --tail=100 -f`}
                  </pre>
                </div>

                <h3>Production Features</h3>
                <ul>
                  <li><strong>SSL/TLS Termination</strong> - Automatic HTTPS with Let&apos;s Encrypt integration</li>
                  <li><strong>Load Balancing</strong> - Multi-instance deployment with health checks</li>
                  <li><strong>Resource Optimization</strong> - Memory and CPU limits for optimal performance</li>
                  <li><strong>Caching Strategy</strong> - Redis integration for session and data caching</li>
                  <li><strong>Database Optimization</strong> - Connection pooling and query optimization</li>
                </ul>

                <hr />

                <h2 id="environment-configuration">Environment Configuration</h2>
                <p>Comprehensive configuration management across all deployment environments:</p>

                <h3>Backend Environment Configuration</h3>
                <div className="bg-gray-900 rounded-lg p-6 my-6 overflow-x-auto not-prose">
                  <pre className="text-gray-100 text-sm leading-relaxed">
{`# application.properties (Base configuration)
spring.application.name=jangular-backend
spring.profiles.active=@spring.profiles.active@
logging.level.com.example=INFO

# application-dev.properties (Development)
spring.datasource.url=jdbc:mysql://localhost:3306/jangular_dev
spring.jpa.hibernate.ddl-auto=update
logging.level.com.example=DEBUG
cors.allowed-origins=http://localhost:4200

# application-prod.properties (Production)
spring.datasource.url=jdbc:mysql://prod-db:3306/jangular_prod
spring.jpa.hibernate.ddl-auto=validate
logging.level.com.example=WARN
cors.allowed-origins=https://yourapp.com`}
                  </pre>
                </div>

                <h3>Frontend Environment Configuration</h3>
                <div className="bg-gray-900 rounded-lg p-6 my-6 overflow-x-auto not-prose">
                  <pre className="text-gray-100 text-sm leading-relaxed">
{`# environment.ts (Development)
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api',
  authUrl: 'http://localhost:8080/auth',
  enableDebugTools: true,
  logLevel: 'debug'
};

# environment.prod.ts (Production)
export const environment = {
  production: true,
  apiUrl: 'https://api.yourapp.com/api',
  authUrl: 'https://api.yourapp.com/auth',
  enableDebugTools: false,
  logLevel: 'error'
};`}
                  </pre>
                </div>

                <h3>Docker Environment Variables</h3>
                <div className="bg-gray-900 rounded-lg p-6 my-6 overflow-x-auto not-prose">
                  <pre className="text-gray-100 text-sm leading-relaxed">
{`# .env.prod (Production Environment Variables)
SPRING_PROFILES_ACTIVE=prod
MYSQL_ROOT_PASSWORD=secure_root_password
MYSQL_DATABASE=jangular_prod
MYSQL_USER=jangular_prod_user
MYSQL_PASSWORD=secure_database_password
JWT_SECRET=your-256-bit-production-secret
CORS_ALLOWED_ORIGINS=https://yourapp.com
SSL_CERTIFICATE_PATH=/etc/ssl/certs/yourapp.com.crt
SSL_PRIVATE_KEY_PATH=/etc/ssl/private/yourapp.com.key`}
                  </pre>
                </div>

                <hr />

                <h2 id="container-registry">Container Registry & Image Management</h2>
                <p>Professional container image management for deployment pipelines:</p>

                <h3>Image Building & Tagging</h3>
                <div className="bg-gray-900 rounded-lg p-6 my-6 overflow-x-auto not-prose">
                  <pre className="text-gray-100 text-sm leading-relaxed">
{`# Build production images
docker-compose -f docker-compose.prod.yml build

# Tag images with version and registry information
docker tag jangular-backend:latest registry.yourcompany.com/jangular/backend:v1.2.0
docker tag jangular-frontend:latest registry.yourcompany.com/jangular/frontend:v1.2.0

# Tag with latest for rolling deployments
docker tag jangular-backend:latest registry.yourcompany.com/jangular/backend:latest
docker tag jangular-frontend:latest registry.yourcompany.com/jangular/frontend:latest`}
                  </pre>
                </div>

                <h3>Registry Operations</h3>
                <div className="bg-gray-900 rounded-lg p-6 my-6 overflow-x-auto not-prose">
                  <pre className="text-gray-100 text-sm leading-relaxed">
{`# Login to container registry
docker login registry.yourcompany.com

# Push versioned images
docker push registry.yourcompany.com/jangular/backend:v1.2.0
docker push registry.yourcompany.com/jangular/frontend:v1.2.0

# Push latest tags
docker push registry.yourcompany.com/jangular/backend:latest
docker push registry.yourcompany.com/jangular/frontend:latest

# Pull images for deployment
docker pull registry.yourcompany.com/jangular/backend:v1.2.0
docker pull registry.yourcompany.com/jangular/frontend:v1.2.0`}
                  </pre>
                </div>

                <h3>Image Security & Optimization</h3>
                <ul>
                  <li><strong>Vulnerability Scanning</strong> - Automated security scanning with tools like Clair or Snyk</li>
                  <li><strong>Image Signing</strong> - Docker Content Trust for image authenticity verification</li>
                  <li><strong>Multi-Architecture</strong> - Support for AMD64 and ARM64 architectures</li>
                  <li><strong>Layer Optimization</strong> - Minimized layers and optimized caching strategies</li>
                </ul>

                <hr />

                <h2 id="deployment-strategies">Advanced Deployment Strategies</h2>
                <p>Enterprise-grade deployment patterns for zero-downtime and risk mitigation:</p>

                <h3>Blue-Green Deployment</h3>
                <ol>
                  <li><strong>Preparation</strong> - Maintain two identical production environments (Blue and Green)</li>
                  <li><strong>Deployment</strong> - Deploy new version to the inactive environment (Green)</li>
                  <li><strong>Testing</strong> - Perform comprehensive testing in Green environment</li>
                  <li><strong>Traffic Switch</strong> - Route production traffic from Blue to Green</li>
                  <li><strong>Monitoring</strong> - Monitor Green environment for issues</li>
                  <li><strong>Rollback</strong> - Switch back to Blue if issues are detected</li>
                  <li><strong>Cleanup</strong> - Prepare Blue environment for next deployment</li>
                </ol>

                <div className="bg-gray-900 rounded-lg p-6 my-6 overflow-x-auto not-prose">
                  <pre className="text-gray-100 text-sm leading-relaxed">
{`# Blue-Green deployment with Docker
# Deploy to Green environment
docker-compose -f docker-compose.green.yml up -d

# Test Green environment
curl -f https://green.yourapp.com/actuator/health

# Switch traffic to Green (load balancer configuration)
# Update DNS or load balancer to point to Green

# Monitor and validate
docker-compose -f docker-compose.green.yml logs -f`}
                  </pre>
                </div>

                <h3>Canary Deployment</h3>
                <ol>
                  <li><strong>Initial Deployment</strong> - Deploy new version alongside current version</li>
                  <li><strong>Traffic Splitting</strong> - Route small percentage (5-10%) to new version</li>
                  <li><strong>Monitoring</strong> - Monitor error rates, performance metrics, and user feedback</li>
                  <li><strong>Gradual Rollout</strong> - Increase traffic percentage gradually (25%, 50%, 75%)</li>
                  <li><strong>Full Deployment</strong> - Route all traffic to new version once validated</li>
                  <li><strong>Rollback Plan</strong> - Immediate rollback if metrics indicate issues</li>
                </ol>

                <h3>Rolling Deployment</h3>
                <ul>
                  <li><strong>Sequential Updates</strong> - Update instances one at a time</li>
                  <li><strong>Health Checks</strong> - Verify each instance before proceeding</li>
                  <li><strong>Automatic Rollback</strong> - Stop deployment if health checks fail</li>
                  <li><strong>Zero Downtime</strong> - Maintain service availability throughout deployment</li>
                </ul>

                <hr />

                <h2 id="cloud-deployment">Cloud Platform Deployment</h2>
                <p>Platform-specific deployment guides for major cloud providers:</p>

                <h3>Amazon Web Services (AWS)</h3>

                <h4>ECS (Elastic Container Service) Deployment</h4>
                <div className="bg-gray-900 rounded-lg p-6 my-6 overflow-x-auto not-prose">
                  <pre className="text-gray-100 text-sm leading-relaxed">
{`# AWS CLI deployment to ECS
aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin 123456789012.dkr.ecr.us-west-2.amazonaws.com

# Tag and push to ECR
docker tag jangular-backend:latest 123456789012.dkr.ecr.us-west-2.amazonaws.com/jangular-backend:latest
docker push 123456789012.dkr.ecr.us-west-2.amazonaws.com/jangular-backend:latest

# Update ECS service
aws ecs update-service --cluster jangular-cluster --service jangular-backend-service --force-new-deployment`}
                  </pre>
                </div>

                <h4>EKS (Elastic Kubernetes Service) Deployment</h4>
                <div className="bg-gray-900 rounded-lg p-6 my-6 overflow-x-auto not-prose">
                  <pre className="text-gray-100 text-sm leading-relaxed">
{`# Kubernetes deployment manifest
apiVersion: apps/v1
kind: Deployment
metadata:
  name: jangular-backend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: jangular-backend
  template:
    metadata:
      labels:
        app: jangular-backend
    spec:
      containers:
      - name: backend
        image: 123456789012.dkr.ecr.us-west-2.amazonaws.com/jangular-backend:latest
        ports:
        - containerPort: 8080`}
                  </pre>
                </div>

                <h3>Google Cloud Platform (GCP)</h3>

                <h4>Cloud Run Deployment</h4>
                <div className="bg-gray-900 rounded-lg p-6 my-6 overflow-x-auto not-prose">
                  <pre className="text-gray-100 text-sm leading-relaxed">
{`# Deploy to Cloud Run
gcloud builds submit --tag gcr.io/PROJECT_ID/jangular-backend

gcloud run deploy jangular-backend \\
  --image gcr.io/PROJECT_ID/jangular-backend \\
  --platform managed \\
  --region us-central1 \\
  --allow-unauthenticated`}
                  </pre>
                </div>

                <h4>GKE (Google Kubernetes Engine) Deployment</h4>
                <div className="bg-gray-900 rounded-lg p-6 my-6 overflow-x-auto not-prose">
                  <pre className="text-gray-100 text-sm leading-relaxed">
{`# Configure kubectl for GKE
gcloud container clusters get-credentials jangular-cluster --zone us-central1-a --project PROJECT_ID

# Deploy to GKE
kubectl apply -f k8s-deployment.yaml
kubectl expose deployment jangular-backend --type=LoadBalancer --port=80 --target-port=8080`}
                  </pre>
                </div>

                <h3>Microsoft Azure</h3>

                <h4>Azure Container Instances (ACI)</h4>
                <div className="bg-gray-900 rounded-lg p-6 my-6 overflow-x-auto not-prose">
                  <pre className="text-gray-100 text-sm leading-relaxed">
{`# Deploy to Azure Container Instances
az container create \\
  --resource-group jangular-rg \\
  --name jangular-backend \\
  --image jangularregistry.azurecr.io/jangular-backend:latest \\
  --ports 8080 \\
  --environment-variables SPRING_PROFILES_ACTIVE=prod`}
                  </pre>
                </div>

                <h4>Azure Kubernetes Service (AKS)</h4>
                <div className="bg-gray-900 rounded-lg p-6 my-6 overflow-x-auto not-prose">
                  <pre className="text-gray-100 text-sm leading-relaxed">
{`# Get AKS credentials
az aks get-credentials --resource-group jangular-rg --name jangular-cluster

# Deploy to AKS
kubectl apply -f azure-deployment.yaml
kubectl get services`}
                  </pre>
                </div>

                <hr />

                <h2 id="cicd-integration">CI/CD Pipeline Integration</h2>
                <p>Automated deployment pipelines for consistent and reliable releases:</p>

                <h3>GitHub Actions Pipeline</h3>
                <div className="bg-gray-900 rounded-lg p-6 my-6 overflow-x-auto not-prose">
                  <pre className="text-gray-100 text-sm leading-relaxed">
{`# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Build and test
        run: |
          jangular build --all --prod
          jangular test --all
      
      - name: Build Docker images
        run: docker-compose -f docker-compose.prod.yml build
      
      - name: Deploy to production
        run: |
          docker-compose -f docker-compose.prod.yml up -d
          docker-compose -f docker-compose.prod.yml exec backend curl -f http://localhost:8080/actuator/health`}
                  </pre>
                </div>

                <h3>GitLab CI/CD Pipeline</h3>
                <div className="bg-gray-900 rounded-lg p-6 my-6 overflow-x-auto not-prose">
                  <pre className="text-gray-100 text-sm leading-relaxed">
{`# .gitlab-ci.yml
stages:
  - build
  - test
  - deploy

build:
  stage: build
  script:
    - jangular build --all --prod
    - docker-compose -f docker-compose.prod.yml build

test:
  stage: test
  script:
    - jangular test --all

deploy:
  stage: deploy
  script:
    - docker-compose -f docker-compose.prod.yml up -d
  only:
    - main`}
                  </pre>
                </div>

                <h3>Pipeline Best Practices</h3>
                <ul>
                  <li><strong>Automated Testing</strong> - Unit, integration, and end-to-end tests in pipeline</li>
                  <li><strong>Security Scanning</strong> - Vulnerability assessment and dependency checks</li>
                  <li><strong>Quality Gates</strong> - Code quality thresholds and approval processes</li>
                  <li><strong>Rollback Automation</strong> - Automatic rollback on deployment failures</li>
                  <li><strong>Notification Integration</strong> - Slack, email, or webhook notifications</li>
                </ul>

                <hr />

                <h2 id="monitoring-observability">Monitoring & Observability</h2>
                <p>Comprehensive monitoring strategy for production deployments:</p>

                <h3>Application Monitoring</h3>
                <ul>
                  <li><strong>Health Endpoints</strong> - Spring Boot Actuator for application health</li>
                  <li><strong>Metrics Collection</strong> - Prometheus integration for performance metrics</li>
                  <li><strong>Distributed Tracing</strong> - Request tracing across microservices</li>
                  <li><strong>Error Tracking</strong> - Centralized error logging and alerting</li>
                </ul>

                <h3>Infrastructure Monitoring</h3>
                <ul>
                  <li><strong>Container Metrics</strong> - Docker container resource usage</li>
                  <li><strong>Database Performance</strong> - Query performance and connection monitoring</li>
                  <li><strong>Network Monitoring</strong> - Inter-service communication analysis</li>
                  <li><strong>Storage Monitoring</strong> - Disk usage and I/O performance</li>
                </ul>

                <h3>Alerting Strategy</h3>
                <div className="bg-gray-900 rounded-lg p-6 my-6 overflow-x-auto not-prose">
                  <pre className="text-gray-100 text-sm leading-relaxed">
{`# Example Prometheus alerting rules
groups:
- name: jangular-alerts
  rules:
  - alert: HighErrorRate
    expr: rate(http_requests_total{status=~"5.."}[5m]) > 0.1
    for: 5m
    labels:
      severity: critical
    annotations:
      summary: High error rate detected
  
  - alert: DatabaseConnectionFailure
    expr: mysql_up == 0
    for: 1m
    labels:
      severity: critical
    annotations:
      summary: Database connection failed`}
                  </pre>
                </div>

                <hr />

                <h2 id="security-considerations">Security & Compliance</h2>
                <p>Production security requirements and best practices:</p>

                <h3>Network Security</h3>
                <ul>
                  <li><strong>HTTPS Enforcement</strong> - SSL/TLS certificates with automatic renewal</li>
                  <li><strong>Firewall Configuration</strong> - Restrictive inbound and outbound rules</li>
                  <li><strong>VPC/VNET Setup</strong> - Private network isolation</li>
                  <li><strong>API Gateway</strong> - Centralized API security and rate limiting</li>
                </ul>

                <h3>Application Security</h3>
                <ul>
                  <li><strong>Secret Management</strong> - Secure storage of credentials and API keys</li>
                  <li><strong>JWT Security</strong> - Strong secret keys and proper token validation</li>
                  <li><strong>Database Security</strong> - Encrypted connections and least-privilege access</li>
                  <li><strong>Container Security</strong> - Non-root users and minimal attack surface</li>
                </ul>

                <h3>Compliance Requirements</h3>
                <ul>
                  <li><strong>Data Encryption</strong> - Encryption at rest and in transit</li>
                  <li><strong>Audit Logging</strong> - Comprehensive activity logging</li>
                  <li><strong>Access Controls</strong> - Role-based access and authentication</li>
                  <li><strong>Regular Updates</strong> - Security patch management</li>
                </ul>

                <blockquote>
                  <p><strong>Production Readiness:</strong> This deployment guide covers enterprise-grade deployment practices suitable for high-availability production environments with comprehensive security, monitoring, and compliance considerations.</p>
                </blockquote>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}