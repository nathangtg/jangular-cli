# Jangular

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
  <!-- Background shield -->
  <path d="M200 20 L320 60 L320 180 C320 220 280 260 200 280 C120 260 80 220 80 180 L80 60 Z" fill="#f5f5f5" stroke="#e0e0e0" stroke-width="2"/>
  
  <!-- Angular-inspired "A" -->
  <path d="M200 40 L260 160 L240 160 L230 130 L170 130 L160 160 L140 160 Z M200 70 L180 110 L220 110 Z" fill="#DD0031"/>
  
  <!-- Java cup -->
  <path d="M165 170 C145 160 145 140 165 130 L155 130 C135 140 135 160 155 170 Z" fill="#5382A1"/>
  <path d="M235 170 C255 160 255 140 235 130 L245 130 C265 140 265 160 245 170 Z" fill="#5382A1"/>
  <path d="M165 170 C180 180 220 180 235 170 L235 130 C220 140 180 140 165 130 Z" fill="#5382A1"/>
  <path d="M200 120 C185 120 170 125 165 130 C180 140 220 140 235 130 C230 125 215 120 200 120 Z" fill="#E76F00"/>
  
  <!-- Database cylinders -->
  <ellipse cx="200" cy="185" rx="40" ry="10" fill="#4479A1" stroke="#2F6491" stroke-width="1.5"/>
  <path d="M160 185 L160 205 C160 210.5 178 216 200 216 C222 216 240 210.5 240 205 L240 185" fill="#4479A1" stroke="#2F6491" stroke-width="1.5"/>
  <ellipse cx="200" cy="205" rx="40" ry="10" fill="#4479A1" stroke="#2F6491" stroke-width="1.5" opacity="0.8"/>
  
  <!-- "J" letter -->
  <path d="M200 210 L200 235 C200 245 190 250 180 250 C170 250 160 245 160 235 L170 235 C170 240 175 242 180 242 C185 242 190 240 190 235 L190 210 Z" fill="#2F4858" stroke="#2F4858" stroke-width="1"/>
  
  <!-- Text -->
  <text x="200" y="275" font-family="Arial, sans-serif" font-size="24" font-weight="bold" text-anchor="middle" fill="#2F4858">JANGULAR</text>
</svg>

## Enterprise-Grade Java API & Angular Starter Kit

Jangular is a comprehensive starter kit that combines the power of Spring Boot for backend development and Angular for frontend, with built-in authentication and authorization systems. This project aims to accelerate enterprise-level development by providing a robust foundation for creating secure, scalable applications.

## Features

- **Full-Stack Solution**: Seamlessly integrates Spring Boot backend with Angular frontend
- **Authentication & Authorization**: Pre-configured security using Spring Security and JWT tokens
- **Database Integration**: MySQL database support with JPA/Hibernate
- **Database Migration**: Automated database schema management with Flyway
- **CLI Tool**: Simple command-line interface for project initialization
- **Ready-to-Use Components**: Login, registration, and dashboard components
- **Route Protection**: Built-in authentication guards for securing routes
- **Token Management**: HTTP interceptors for automatic token handling
- **Service Architecture**: Well-structured service layer for API communication

## Technologies

### Backend
- Java 21
- Spring Boot 3.4.3
- Spring Security
- Spring Data JPA
- JWT Authentication
- Flyway Migration
- MySQL
- Lombok
- Maven

### Frontend
- Angular (latest version)
- TypeScript
- Angular Material
- RxJS
- Lazy-loaded modules
- Route Guards
- HTTP Interceptors
- Reactive Forms

### CLI Tool
- Node.js
- Commander.js
- Inquirer.js
- Chalk
- fs-extra

## Getting Started

### Prerequisites
- Java 21 or higher
- Node.js 16 or higher
- npm or yarn
- MySQL 8.0 or higher
- Maven 3.6 or higher

### Installation

#### Using the Jangular CLI (Recommended)

```bash
# Install the Jangular CLI
npm install jangular-cli

# Create a new Jangular project
npx jangular-cli init my-project

# Navigate to your project
cd my-project

# Start the backend
npm run start:backend

# In another terminal, start the frontend
npm run start:frontend
```

#### CLI Command Reference

```bash
# View help information
npx jangular-cli --help

# Initialize a new project
npx jangular-cli init <projectName>

# Display version
npx jangular-cli --version
```

#### Manual Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/jangular.git
   cd jangular
   ```

2. Configure your database settings in `application.properties` or `application.yml`.

3. Build and run the backend:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

4. In a separate terminal, navigate to the frontend directory and run:
   ```bash
   cd frontend
   npm install
   ng serve
   ```

## Project Structure

```
jangular-project/
├── backend/                 # Spring Boot application
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/       # Java source files
│   │   │   ├── resources/  # Backend resources
│   │   │   │   ├── db/migration/  # Flyway migration scripts
│   │   └── test/           # Test files
│   └── pom.xml             # Maven configuration
├── frontend/               # Angular application
│   ├── src/
│   │   ├── app/
│   │   │   ├── auth/       # Authentication module
│   │   │   ├── components/ # UI components
│   │   │   ├── services/   # API services
│   │   │   ├── guards/     # Route guards
│   │   │   └── interceptors/ # HTTP interceptors
│   │   ├── assets/         # Static assets
│   │   └── environments/   # Environment configurations
│   ├── package.json        # NPM dependencies
│   └── angular.json        # Angular CLI configuration
├── package.json            # Root package.json with scripts
└── README.md               # Project documentation
```

## Contributing to Templates

Jangular uses Git submodules for the frontend and backend templates:
- Backend template: `github/nathangtg/jangular-backend`
- Frontend template: `github/nathangtg/frontend`

### How to Contribute

1. **Clone the repository with submodules**:
   ```bash
   git clone --recurse-submodules https://github.com/yourusername/jangular-cli.git
   cd jangular-cli
   ```

2. **Update submodules** (if you didn't clone with `--recurse-submodules`):
   ```bash
   git submodule update --init --recursive
   ```

3. **Making changes to templates**:

   For backend template:
   ```bash
   # Navigate to backend template
   cd templates/backend
   
   # Make your changes
   
   # Commit and push changes
   git add .
   git commit -m "Description of your changes"
   git push origin master
   ```

   For frontend template:
   ```bash
   # Navigate to frontend template
   cd templates/frontend
   
   # Make your changes
   
   # Commit and push changes
   git add .
   git commit -m "Description of your changes"
   git push origin master
   ```

4. **Update the main repository to reference the new template version**:
   ```bash
   # Return to the main project directory
   cd ..
   
   # Update the submodule reference
   git add templates/backend  # or templates/frontend
   git commit -m "Update template reference"
   git push
   ```

## API Endpoints

### Authentication Controller (`/api/auth`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/login` | User login | Public |
| POST | `/api/auth/register` | User registration | Public |
| POST | `/api/auth/refresh` | Refresh access token | Public |
| POST | `/api/auth/logout` | User logout | Authenticated |

### User Controller (`/api/users`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/users/me` | Get current user info | Authenticated |
| GET | `/api/users/{id}` | Get user by ID | Admin |
| GET | `/api/users` | Get all users | Admin |
| PUT | `/api/users/{id}` | Update user information | User or Admin |
| POST | `/api/users/{id}/change-password` | Change user password | User or Admin |
| DELETE | `/api/users/{id}` | Soft delete a user | Admin |
| POST | `/api/users/{id}/roles` | Add role to user | Admin |
| DELETE | `/api/users/{id}/roles/{roleName}` | Remove role from user | Admin |
| GET | `/api/users/{id}/login-history` | Get user login history | User or Admin |
| GET | `/api/users/{id}/login-history/range` | Get login history for date range | User or Admin |
| GET | `/api/users/{id}/active-sessions` | Get active sessions | User or Admin |

## Authentication System

### Authentication Flow

1. User registers/logs in through the Angular frontend
2. Backend validates credentials and issues JWT tokens (access and refresh)
3. Tokens are stored securely in the browser's local storage
4. Token interceptor attaches the access token to all subsequent API requests
5. Protected routes check token validity using the auth guard
6. Refresh token functionality automatically renews expired tokens

### Angular Routes Configuration

```typescript
export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]  // Protected route
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  }
];
```

## Key Services

### Auth Service

```typescript
// Key methods provided by AuthService
login(username: string, password: string): Observable<AuthResponse>
register(user: RegisterRequest): Observable<UserDTO>
refreshToken(refreshToken: string): Observable<AuthResponse>
logout(): void
isAuthenticated(): boolean
getAccessToken(): string
```

### User Service

```typescript
// Key methods provided by UserService
getCurrentUser(): Observable<UserDTO>
getUserById(id: number): Observable<UserDTO>
updateUser(id: number, user: UserDTO): Observable<UserDTO>
changePassword(id: number, oldPassword: string, newPassword: string): Observable<void>
```

## Customization

- Modify authentication providers in Spring Security configuration
- Add custom user roles and permissions
- Extend the database schema for additional user properties
- Customize UI components to match your brand identity
- Add additional Angular modules and components
- Extend authentication with social login providers

## Development Workflow

### Backend Development

1. Define entity models in Java classes
2. Create repositories for database operations
3. Implement service layer for business logic
4. Expose REST endpoints through controllers
5. Configure security settings for endpoints

### Frontend Development

1. Create new components using Angular CLI
2. Define services for API communication
3. Set up routes in the appropriate module
4. Implement components with reactive forms
5. Style components according to your design system

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the LICENSE file for details.

---

**Jangular** - Accelerating Enterprise Application Development