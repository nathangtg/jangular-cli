# JAngular CLI Documentation

JAngular CLI is a powerful command-line interface tool for rapidly bootstrapping full-stack applications with Angular 17 (frontend) and Spring Boot (Java 21 backend). This enterprise-ready framework provides integrated security, authentication, Docker integration, and best practices to accelerate development.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Commands](#commands)
- [Project Structure](#project-structure)
- [Backend Features](#backend-features)
- [Frontend Features](#frontend-features)
- [Docker Integration](#docker-integration)
- [Deployment](#deployment)
- [FAQ](#faq)

## Overview

JAngular CLI is a comprehensive solution for creating modern, enterprise-grade full-stack applications. It combines the power of Angular 17 for the frontend with Spring Boot for the backend, providing everything you need to build secure, scalable applications.

The framework takes care of complex setup tasks, including:
- Authentication and authorization with JWT
- Multi-database support (MySQL, PostgreSQL, MSSQL)
- Docker containerization
- Security best practices
- Database migrations
- User management systems

## Features

- ✅ **Full-Stack Setup**: Angular 17 frontend with Spring Boot backend
- ✅ **Authentication & Authorization**: JWT-based security with refresh tokens
- ✅ **Multi-Database Support**: MySQL, PostgreSQL, and Microsoft SQL Server
- ✅ **Database Migrations**: Automated schema management with Flyway
- ✅ **Docker Integration**: Full containerization support
- ✅ **User Management**: Complete user registration, login, and role management
- ✅ **Security**: Spring Security with password history and account lockout
- ✅ **Modern Tech Stack**: Latest versions of Angular, Java, and Spring Boot
- ✅ **Enterprise Ready**: Production-ready configurations and best practices

## Requirements

Before using JAngular CLI, ensure your system meets the following requirements:

### System Requirements
- **Node.js**: v18 or higher
- **Java**: v21 or higher (OpenJDK, Oracle JDK, etc.)
- **Angular CLI**: v17 or higher
- **Apache Maven**: 3.x or higher
- **Git**: Latest version
- **Docker** and **Docker Compose** (optional, for containerization)

### Recommended System
- **Operating System**: macOS, Linux, or Windows (with WSL2 recommended)
- **Memory**: 8GB RAM or more
- **Disk Space**: 2GB available space for initial setup

### Installation Check

To verify your system meets the requirements, run:

```bash
npx jangular --test
```

## Installation

### Prerequisites

First, ensure you have all the required dependencies installed:

```bash
# Check Node.js version (v18+ required)
node --version

# Check Java version (v21+ required)
java -version

# Install Angular CLI globally
npm install -g @angular/cli@^17.0.0

# Install Maven (if not already installed)
# Follow installation guide: https://maven.apache.org/install.html
```

### Install JAngular CLI

Install JAngular CLI globally using npm:

```bash
npm install -g jangular-cli
```

Or install it locally in your project:

```bash
npm install jangular-cli
```

### Verify Installation

After installation, verify the CLI is working:

```bash
jangular --version
jangular --help
```

## Getting Started

### Quick Start

Create a new JAngular project in seconds:

```bash
# Create a new project
jangular init my-project

# Navigate to your project
cd my-project

# Install dependencies
npm run install:all

# Start the backend
npm run start:backend

# In a new terminal, start the frontend
npm run start:frontend
```

### Project Setup Workflow

The JAngular CLI will guide you through the setup process:

1. Enter the project name
2. Configure Java project settings (group ID, artifact ID, package name)
3. Select your database type (MySQL, PostgreSQL, or MSSQL)
4. Configure database connection details

### Copy-Paste Snippets

Here are some common commands you'll use:

#### Basic Project Setup
```bash
# Initialize a new project
npx jangular init my-app

# Install all dependencies
cd my-app
npm run install:all

# Start backend and frontend
npm run start:backend
# In another terminal:
npm run start:frontend
```

#### Database Configuration
```bash
# MySQL database configuration
groupId: com.example
artifactId: backend
database: MySQL
dbName: my_app_db
dbUsername: devuser
dbPassword: devpassword
```

#### Docker Commands
```bash
# Start all services with Docker
docker-compose up -d

# View logs
docker-compose logs

# Stop all services
docker-compose down
```

## Commands

### jangular init `<projectName>`

Initialize a new Java + Angular project with the specified name.

#### Options
- `-g, --group-id <groupId>`: Java group ID (default: com.example)
- `-a, --artifact-id <artifactId>`: Java artifact ID (default: backend)

#### Example
```bash
jangular init my-enterprise-app
jangular init my-app -g com.company -a my-backend
```

### jangular docker

Manage and monitor Docker services for your project.

#### Features
- Start/stop containers
- View service logs
- Check database health
- Reset volumes
- Production mode deployment

### jangular test

Run tests for the generated project.

#### Options
- `-b, --backend`: Test only the backend
- `-f, --frontend`: Test only the frontend
- `-a, --all`: Test both backend and frontend (default)

#### Example
```bash
jangular test
jangular test --backend
jangular test --frontend
```

### jangular build

Build the project for production.

#### Options
- `-b, --backend`: Build only the backend
- `-f, --frontend`: Build only the frontend
- `-a, --all`: Build both backend and frontend (default)
- `-p, --prod`: Build with production profile

#### Example
```bash
jangular build
jangular build --backend --prod
jangular build --frontend
```

## Project Structure

After running `jangular init`, you will have a complete project structure:

```
my-project/
├── backend/                 # Spring Boot application
│   ├── src/main/java/       # Java source code
│   ├── src/main/resources/  # Configuration files
│   │   ├── application.properties          # Base configuration
│   │   ├── application-<db>.properties     # Database-specific config
│   │   └── db/migration/<db>/             # Database migrations
│   ├── pom.xml              # Maven configuration
│   └── Dockerfile           # Container configuration
├── frontend/                # Angular application
│   ├── src/app/             # Angular components, services
│   ├── package.json         # Node.js dependencies
│   ├── angular.json         # Angular CLI configuration
│   ├── Dockerfile           # Container configuration
│   └── src/environments/    # Environment configuration
├── docker-compose.yml       # Docker services configuration
├── package.json             # Root project scripts
└── README.md               # Project documentation
```

## Backend Features

The JAngular backend is a robust Spring Boot application with enterprise-grade features:

### Authentication & Authorization
- **JWT Token Support**: Secure authentication with access and refresh tokens
- **Password Security**: BCrypt hashing with configurable strength
- **Account Lockout**: Automatic account lockout after failed attempts
- **Password History**: Tracks previous passwords to prevent reuse
- **Password Complexity**: Configurable password policy enforcement

### Database Integration
- **Multi-Database Support**: MySQL, PostgreSQL, and MSSQL
- **Flyway Migrations**: Automated schema management
- **Connection Pooling**: Performance-optimized database connections
- **Transaction Management**: Spring transaction support

### Security Features
- **Spring Security**: Comprehensive security framework
- **CSRF Protection**: Cross-site request forgery protection
- **Session Management**: Secure session handling
- **API Rate Limiting**: Configurable request throttling
- **Audit Logging**: Track user login history

### API Endpoints
- **Authentication**: Login, registration, token refresh
- **User Management**: CRUD operations, role assignment
- **Profile Management**: User details and preferences

### Configuration
The backend uses a modular configuration system:

- `application.properties`: Base configuration with JWT and security settings
- `application-<db>.properties`: Database-specific settings based on your selection
- Separate profiles for development, testing, and production

## Frontend Features

The JAngular frontend is built with Angular 17 and includes:

### Authentication Components
- **Login Component**: Secure user login with form validation
- **Registration Component**: User registration with password confirmation
- **Token Interceptor**: Automatic JWT header injection
- **Auth Guard**: Route protection for unauthorized access

### User Management
- **User Dashboard**: User profile and settings
- **User List**: Admin view of all users
- **User Details**: Detailed user information
- **Login History**: Track user login sessions
- **Active Sessions**: Monitor current user sessions

### UI Framework
- **Tailwind CSS**: Modern CSS framework with utility classes
- **Responsive Design**: Mobile-first responsive components
- **Pre-built Components**: Common UI patterns for enterprise applications

### Routing & Navigation
- **Protected Routes**: Auth guard for secured areas
- **Role-based Access**: Admin guard for administrative features
- **Modular Architecture**: Feature modules for organization

### Services
- **Auth Service**: Handle authentication logic
- **User Service**: Manage user data and operations
- **HTTP Interceptors**: Automatic error handling and token management

## Docker Integration

JAngular CLI provides comprehensive Docker integration:

### Containerized Services
- **Backend Service**: Spring Boot application container
- **Frontend Service**: Angular application container
- **Database Services**: MySQL, PostgreSQL, or MSSQL
- **Database GUIs**: phpMyAdmin for MySQL, pgAdmin for PostgreSQL

### Docker Commands

The CLI includes a dedicated Docker management interface:

```bash
jangular docker
```

This interactive menu allows you to:
- Start/stop all services
- Start specific services (databases, backend, frontend)
- View service logs
- Check database health
- Reset volumes (delete all data)
- Deploy in production mode

### Docker Configuration
- **Multi-stage Builds**: Optimized builds with smaller final images
- **Environment Variables**: Secure configuration via environment
- **Volume Mounts**: Persistent data storage
- **Network Configuration**: Internal service communication

### Production Deployment
The CLI generates a production-ready Docker Compose configuration with:
- Reverse proxy configuration
- SSL termination
- Load balancing
- Health checks

## Deployment

### Development Deployment
For development, simply run:

```bash
npm run start:backend
npm run start:frontend
```

### Docker Deployment
For containerized development:

```bash
docker-compose up -d
```

### Production Deployment
For production, use the production Docker configuration:

```bash
docker-compose -f docker-compose.prod.yml up -d
```

## FAQ

### Q: Do I need to install Angular CLI separately?
A: Yes, you need Angular CLI v17 or higher installed globally. Use `npm install -g @angular/cli@^17.0.0`.

### Q: Which databases are supported?
A: JAngular supports MySQL, PostgreSQL, and Microsoft SQL Server. You can select your preferred database during project initialization.

### Q: How do I change the database after project creation?
A: You'll need to regenerate the project with the new database selection. The CLI configures database-specific files during initialization.

### Q: How is authentication handled?
A: The framework uses JWT (JSON Web Tokens) with refresh tokens for secure authentication. Spring Security handles backend protection, while Angular interceptors handle token management on the frontend.

### Q: Can I customize the frontend UI framework?
A: While the default uses Tailwind CSS, you can replace it with other CSS frameworks like Bootstrap or Material Design by modifying the frontend dependencies and configuration.

### Q: How do I add new API endpoints?
A: Create new controllers in the backend and corresponding services/components in the frontend. The project structure is designed to be easily extensible.

### Q: What if I don't want to use Docker?
A: Docker is optional. You can run the backend with Maven and the frontend with Angular CLI directly. Docker is provided as a convenience for containerized development and deployment.