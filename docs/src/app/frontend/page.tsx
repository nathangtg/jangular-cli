import Sidebar from '@/app/components/sidebar';
import Header from '@/app/components/header';

export default function FrontendPage() {
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
                <h1 className="text-4xl font-bold text-foreground mb-4">Frontend Features</h1>
                <p className="text-xl text-foreground-muted leading-relaxed">
                  Comprehensive overview of the JAngular Angular 17+ frontend architecture, components, and modern development features.
                </p>
              </div>

              {/* Content */}
              <div className="prose prose-gray dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-foreground/90 prose-strong:text-foreground prose-code:text-foreground prose-code:bg-card/50 prose-pre:bg-gray-900 prose-pre:text-gray-100">
                
                <p>The JAngular frontend is built with <strong>Angular 17+</strong> using the latest features including standalone components, signal-based state management, and modern development tools. It provides a complete enterprise-ready frontend with authentication, user management, and responsive design.</p>

                <h2 id="angular-features">Modern Angular Features</h2>
                <p>Built with the latest Angular capabilities for optimal performance and developer experience:</p>

                <h3>Angular 17+ Features</h3>
                <ul>
                  <li><strong>Standalone Components</strong> - Simplified component architecture without NgModules</li>
                  <li><strong>Control Flow Syntax</strong> - Modern @if, @for, @switch directives</li>
                  <li><strong>Signals</strong> - Reactive state management with built-in change detection</li>
                  <li><strong>Server-Side Rendering (SSR)</strong> - Improved performance and SEO capabilities</li>
                  <li><strong>Hydration Support</strong> - Seamless transition from server to client rendering</li>
                </ul>

                <h3>Development Experience</h3>
                <ul>
                  <li><strong>TypeScript 5.0+</strong> - Latest TypeScript features with strict type checking</li>
                  <li><strong>Angular CLI</strong> - Integrated development tools and build optimization</li>
                  <li><strong>Hot Module Replacement</strong> - Fast development with instant updates</li>
                  <li><strong>Tree Shaking</strong> - Optimized bundle sizes with unused code elimination</li>
                </ul>

                <hr />

                <h2 id="authentication-system">Authentication System</h2>
                <p>Complete authentication implementation with enterprise security features:</p>

                <h3>Authentication Components</h3>
                <ul>
                  <li><strong>Login Component</strong> - Secure user authentication with form validation and error handling</li>
                  <li><strong>Registration Component</strong> - User registration with password confirmation and complexity validation</li>
                  <li><strong>Password Reset</strong> - Secure password reset workflow with email verification</li>
                  <li><strong>Email Verification</strong> - Account activation through email confirmation</li>
                </ul>

                <h3>Security Implementation</h3>
                <ul>
                  <li><strong>JWT Token Management</strong> - Automatic token storage, refresh, and cleanup</li>
                  <li><strong>HTTP Interceptors</strong> - Automatic token injection and error handling</li>
                  <li><strong>Route Guards</strong> - Authentication and authorization protection</li>
                  <li><strong>Session Management</strong> - Automatic logout on token expiration</li>
                </ul>

                <h3>Authentication Flow</h3>
                <ol>
                  <li>User authenticates through login component with form validation</li>
                  <li>JWT access and refresh tokens received from backend API</li>
                  <li>Tokens stored securely in browser storage with automatic cleanup</li>
                  <li>HTTP interceptor adds authorization headers to all API requests</li>
                  <li>Route guards protect authenticated routes from unauthorized access</li>
                  <li>Automatic token refresh maintains session without user interruption</li>
                  <li>Graceful logout with token cleanup on expiration or user action</li>
                </ol>

                <hr />

                <h2 id="user-management">User Management System</h2>
                <p>Complete user management interface with role-based access control:</p>

                <h3>User Interface Components</h3>
                <ul>
                  <li><strong>User Dashboard</strong> - Personalized user profile and activity overview</li>
                  <li><strong>User List Component</strong> - Administrative interface for managing all users</li>
                  <li><strong>User Details Component</strong> - Comprehensive user information and edit capabilities</li>
                  <li><strong>Login History Component</strong> - Detailed view of user authentication history</li>
                  <li><strong>Active Sessions Component</strong> - Real-time monitoring of user sessions</li>
                </ul>

                <h3>Administrative Features</h3>
                <ul>
                  <li><strong>User Creation</strong> - Admin interface for creating new user accounts</li>
                  <li><strong>Role Assignment</strong> - Dynamic role management with permission controls</li>
                  <li><strong>Account Status Management</strong> - Enable, disable, or lock user accounts</li>
                  <li><strong>Bulk Operations</strong> - Efficient management of multiple users</li>
                </ul>

                <h3>Profile Management</h3>
                <ul>
                  <li><strong>Profile Editing</strong> - User-controlled profile information updates</li>
                  <li><strong>Password Management</strong> - Secure password change with validation</li>
                  <li><strong>Preference Settings</strong> - Customizable user interface preferences</li>
                  <li><strong>Activity Monitoring</strong> - Personal login history and session tracking</li>
                </ul>

                <hr />

                <h2 id="ui-framework">UI Framework & Design System</h2>
                <p>Modern responsive design built with Tailwind CSS and custom component library:</p>

                <h3>Styling Framework</h3>
                <ul>
                  <li><strong>Tailwind CSS 3.x</strong> - Utility-first CSS framework with JIT compilation</li>
                  <li><strong>Custom Design System</strong> - Consistent color palette and typography</li>
                  <li><strong>Component Library</strong> - Reusable UI components for rapid development</li>
                  <li><strong>Dark Mode Support</strong> - System-aware theme switching</li>
                </ul>

                <h3>Responsive Design</h3>
                <ul>
                  <li><strong>Mobile-First Approach</strong> - Optimized for mobile devices and progressive enhancement</li>
                  <li><strong>Breakpoint System</strong> - Consistent responsive behavior across screen sizes</li>
                  <li><strong>Touch-Friendly Interface</strong> - Optimized touch targets and gestures</li>
                  <li><strong>Accessibility Features</strong> - WCAG 2.1 compliance with proper ARIA labels</li>
                </ul>

                <h3>Custom Components</h3>
                <ul>
                  <li><strong>Form Components</strong> - Validated input fields, selects, and form layouts</li>
                  <li><strong>Data Tables</strong> - Sortable, filterable tables with pagination</li>
                  <li><strong>Navigation Components</strong> - Responsive navigation with breadcrumbs</li>
                  <li><strong>Notification System</strong> - Toast notifications and alert messages</li>
                </ul>

                <hr />

                <h2 id="routing-navigation">Routing & Navigation</h2>
                <p>Advanced routing system with security and performance optimizations:</p>

                <h3>Route Protection</h3>
                <ul>
                  <li><strong>Authentication Guard</strong> - Prevents access to protected routes for unauthenticated users</li>
                  <li><strong>Authorization Guard</strong> - Role-based access control for administrative features</li>
                  <li><strong>Admin Guard</strong> - Specific protection for administrative routes and components</li>
                  <li><strong>Route Preloading</strong> - Strategic preloading of modules for improved performance</li>
                </ul>

                <h3>Module Architecture</h3>
                <ul>
                  <li><strong>Feature Modules</strong> - Organized code structure with lazy-loaded modules</li>
                  <li><strong>Shared Modules</strong> - Common components and services across features</li>
                  <li><strong>Core Module</strong> - Singleton services and app-wide configuration</li>
                  <li><strong>Lazy Loading</strong> - On-demand module loading for optimized initial bundle size</li>
                </ul>

                <h3>Navigation Features</h3>
                <ul>
                  <li><strong>Breadcrumb Navigation</strong> - Clear navigation hierarchy and current location</li>
                  <li><strong>Route Guards</strong> - Automatic redirection based on authentication status</li>
                  <li><strong>Deep Linking</strong> - Bookmarkable URLs with proper state restoration</li>
                  <li><strong>Navigation Events</strong> - Loading states and error handling during navigation</li>
                </ul>

                <hr />

                <h2 id="services-architecture">Services & Architecture</h2>
                <p>Well-structured service layer following Angular best practices:</p>

                <h3>Core Services</h3>
                <ul>
                  <li><strong>AuthService</strong> - Centralized authentication state management and API communication</li>
                  <li><strong>UserService</strong> - User data operations, profile management, and user list handling</li>
                  <li><strong>NotificationService</strong> - Application-wide notification and alert management</li>
                  <li><strong>LoadingService</strong> - Global loading state management for API operations</li>
                </ul>

                <h3>HTTP Communication</h3>
                <ul>
                  <li><strong>HTTP Interceptors</strong> - Automatic token injection, error handling, and loading states</li>
                  <li><strong>API Service Layer</strong> - Centralized API communication with typed responses</li>
                  <li><strong>Error Handling</strong> - Global error handling with user-friendly messages</li>
                  <li><strong>Request Caching</strong> - Strategic caching for improved performance</li>
                </ul>

                <h3>State Management</h3>
                <ul>
                  <li><strong>Angular Signals</strong> - Reactive state management for component communication</li>
                  <li><strong>RxJS Observables</strong> - Asynchronous data streams and event handling</li>
                  <li><strong>Local Storage Management</strong> - Secure token storage with automatic cleanup</li>
                  <li><strong>Session Storage</strong> - Temporary data persistence across page refreshes</li>
                </ul>

                <hr />

                <h2 id="development-tools">Development Tools & Configuration</h2>
                <p>Modern development setup with comprehensive tooling:</p>

                <h3>Build Configuration</h3>
                <ul>
                  <li><strong>Angular CLI</strong> - Project scaffolding, building, and testing tools</li>
                  <li><strong>Webpack Configuration</strong> - Optimized bundling with code splitting</li>
                  <li><strong>Environment Management</strong> - Separate configurations for development, staging, and production</li>
                  <li><strong>Build Optimization</strong> - Tree shaking, minification, and compression</li>
                </ul>

                <h3>Code Quality</h3>
                <ul>
                  <li><strong>ESLint Configuration</strong> - Code linting with Angular-specific rules</li>
                  <li><strong>Prettier Integration</strong> - Automatic code formatting on save</li>
                  <li><strong>TypeScript Strict Mode</strong> - Enhanced type safety and error detection</li>
                  <li><strong>Unit Testing Setup</strong> - Jasmine and Karma configuration for component testing</li>
                </ul>

                <h3>Development Server</h3>
                <ul>
                  <li><strong>Hot Reload</strong> - Instant updates during development</li>
                  <li><strong>Proxy Configuration</strong> - Backend API integration during development</li>
                  <li><strong>Source Maps</strong> - Debugging support with original TypeScript sources</li>
                  <li><strong>Performance Monitoring</strong> - Bundle analysis and performance metrics</li>
                </ul>

                <hr />

                <h2 id="project-structure">Frontend Project Structure</h2>
                <p>Well-organized project structure following Angular best practices:</p>

                <pre><code>frontend/
├── src/
│   ├── app/
│   │   ├── app.component.ts            # Root application component
│   │   ├── app.component.html          # Main application template
│   │   ├── app.component.css           # Global application styles
│   │   ├── app.config.ts              # Application configuration and providers
│   │   ├── app.routes.ts              # Main routing configuration
│   │   │
│   │   ├── core/                      # Core module (singleton services)
│   │   │   ├── guards/
│   │   │   │   ├── auth.guard.ts      # Authentication route guard
│   │   │   │   └── admin.guard.ts     # Administrative access guard
│   │   │   ├── interceptors/
│   │   │   │   ├── auth.interceptor.ts    # JWT token interceptor
│   │   │   │   ├── error.interceptor.ts   # Global error handling
│   │   │   │   └── loading.interceptor.ts # Loading state management
│   │   │   └── services/
│   │   │       ├── auth.service.ts    # Authentication service
│   │   │       ├── notification.service.ts # Toast notifications
│   │   │       └── loading.service.ts # Loading state service
│   │   │
│   │   ├── shared/                    # Shared module (common components)
│   │   │   ├── components/
│   │   │   │   ├── loading-spinner/   # Reusable loading component
│   │   │   │   ├── notification/      # Toast notification component
│   │   │   │   └── confirm-dialog/    # Confirmation dialog component
│   │   │   ├── directives/            # Custom directives
│   │   │   └── pipes/                 # Custom pipes
│   │   │
│   │   ├── features/                  # Feature modules
│   │   │   ├── auth/
│   │   │   │   ├── components/
│   │   │   │   │   ├── login/
│   │   │   │   │   │   ├── login.component.ts
│   │   │   │   │   │   ├── login.component.html
│   │   │   │   │   │   └── login.component.css
│   │   │   │   │   ├── register/
│   │   │   │   │   │   ├── register.component.ts
│   │   │   │   │   │   ├── register.component.html
│   │   │   │   │   │   └── register.component.css
│   │   │   │   │   └── password-reset/
│   │   │   │   │       ├── password-reset.component.ts
│   │   │   │   │       ├── password-reset.component.html
│   │   │   │   │       └── password-reset.component.css
│   │   │   │   ├── auth.routes.ts     # Auth feature routing
│   │   │   │   └── auth.module.ts     # Auth feature module
│   │   │   │
│   │   │   ├── dashboard/
│   │   │   │   ├── components/
│   │   │   │   │   └── dashboard/
│   │   │   │   │       ├── dashboard.component.ts
│   │   │   │   │       ├── dashboard.component.html
│   │   │   │   │       └── dashboard.component.css
│   │   │   │   └── dashboard.routes.ts
│   │   │   │
│   │   │   └── user-management/
│   │   │       ├── components/
│   │   │       │   ├── user-list/
│   │   │       │   │   ├── user-list.component.ts
│   │   │       │   │   ├── user-list.component.html
│   │   │       │   │   └── user-list.component.css
│   │   │       │   ├── user-detail/
│   │   │       │   │   ├── user-detail.component.ts
│   │   │       │   │   ├── user-detail.component.html
│   │   │       │   │   └── user-detail.component.css
│   │   │       │   ├── user-sessions/
│   │   │       │   └── user-login-history/
│   │   │       ├── services/
│   │   │       │   └── user.service.ts    # User management service
│   │   │       ├── user-management.routes.ts
│   │   │       └── user-management.module.ts
│   │   │
│   │   ├── models/                    # TypeScript interfaces and types
│   │   │   ├── user.model.ts          # User interface definition
│   │   │   ├── role.model.ts          # Role interface definition
│   │   │   ├── auth.model.ts          # Authentication types
│   │   │   └── api.model.ts           # API response types
│   │   │
│   │   └── utils/                     # Utility functions and helpers
│   │       ├── validators.ts          # Custom form validators
│   │       ├── constants.ts           # Application constants
│   │       └── helpers.ts             # Common helper functions
│   │
│   ├── environments/                  # Environment configurations
│   │   ├── environment.ts             # Development environment
│   │   ├── environment.staging.ts     # Staging environment
│   │   └── environment.prod.ts        # Production environment
│   │
│   ├── assets/                        # Static assets
│   │   ├── images/                    # Application images
│   │   ├── icons/                     # SVG icons and favicons
│   │   └── i18n/                      # Internationalization files
│   │
│   ├── styles/                        # Global styles
│   │   ├── styles.css                 # Global CSS imports
│   │   ├── tailwind.css              # Tailwind CSS configuration
│   │   └── variables.css             # CSS custom properties
│   │
│   ├── index.html                     # Main HTML file
│   └── main.ts                        # Application bootstrap
│
├── angular.json                       # Angular CLI configuration
├── package.json                       # Dependencies and scripts
├── tsconfig.json                      # TypeScript base configuration
├── tsconfig.app.json                  # App-specific TypeScript config
├── tsconfig.spec.json                 # Test-specific TypeScript config
├── tailwind.config.js                 # Tailwind CSS configuration
├── karma.conf.js                      # Test runner configuration
└── README.md                          # Frontend documentation</code></pre>

                <hr />

                <h2 id="environment-configuration">Environment Configuration</h2>
                <p>Flexible environment management for different deployment scenarios:</p>

                <h3>Environment Files</h3>
                <pre><code># environment.ts (Development)
export const environment = &#123;
  production: false,
  apiUrl: &apos;http://localhost:8080/api&apos;,
  authUrl: &apos;http://localhost:8080/auth&apos;,
  tokenKey: &apos;jangular_token&apos;,
  refreshTokenKey: &apos;jangular_refresh_token&apos;
&#125;;

# environment.prod.ts (Production)
export const environment = &#123;
  production: true,
  apiUrl: &apos;https://api.yourdomain.com/api&apos;,
  authUrl: &apos;https://api.yourdomain.com/auth&apos;,
  tokenKey: &apos;jangular_token&apos;,
  refreshTokenKey: &apos;jangular_refresh_token&apos;
&#125;;</code></pre>

                <blockquote>
                  <p><strong>Development Note:</strong> The frontend includes comprehensive unit tests, end-to-end testing setup, internationalization support, and progressive web app capabilities for enhanced user experience.</p>
                </blockquote>

              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}