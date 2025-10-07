# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] 

### 🎉 Major Release

JAngular CLI v2.0.0 represents a significant milestone with major improvements to documentation, user experience, and feature completeness.

### ✨ Added

#### Documentation
- **Modern Documentation Site** - Brand new documentation website built with Next.js 15.5.4
- **Professional UI Design** - Clean, modern interface with Java Orange and Angular Red theme
- **Responsive Layout** - Mobile-first design that works seamlessly across all devices
- **Interactive Navigation** - Sidebar navigation with SVG icons for easy access to all sections
- **Comprehensive Guides** - Detailed guides for getting started, CLI commands, backend, frontend, Docker, and deployment
- **FAQ Section** - Answers to common questions and troubleshooting tips

#### CLI Features
- **Interactive Docker Management** - New `jangular docker` command for managing Docker services
- **System Requirements Check** - `jangular --test` command to verify all dependencies
- **Enhanced Progress Indicators** - Real-time feedback with Ora spinners during project generation
- **Better Error Messages** - Clear, actionable error messages with recovery suggestions
- **Input Validation** - Comprehensive validation for all user inputs during project initialization

#### Backend Features
- **Advanced Security Features**
  - Account lockout after failed login attempts
  - Password history tracking to prevent reuse
  - Enhanced password policies
  - CSRF protection
- **User Management Enhancements**
  - Active session tracking and management
  - Comprehensive login history with IP address and device tracking
  - User search and filtering capabilities
  - Bulk operations support
- **API Improvements**
  - Enhanced error responses with detailed messages
  - Improved validation for DTOs
  - Better exception handling with global error handler
  - Health check endpoints for monitoring

#### Frontend Features
- **Standalone Components** - Migrated to modern Angular standalone architecture
- **Enhanced UI Components**
  - User management dashboard with data tables
  - Active sessions viewer
  - Login history viewer
  - Improved authentication forms with better validation feedback
- **Responsive Design** - Mobile-optimized components with Tailwind CSS
- **Better State Management** - Improved service architecture for state handling
- **Enhanced Guards** - More robust authentication and authorization guards

### 🔄 Changed

- **Package Metadata** - Updated package.json with comprehensive metadata for NPM publishing
- **Documentation Structure** - Reorganized documentation for better discoverability
- **Error Handling** - Improved error handling throughout the CLI
- **Template Structure** - Enhanced project templates with better organization
- **Dependencies** - Updated all dependencies to latest stable versions
  - Next.js 15.5.4
  - React 19.1.0
  - TailwindCSS v4
  - Spring Boot 3.4.3
  - Angular 17+

### 🐛 Fixed

- **Hydration Errors** - Resolved Next.js SSR hydration mismatches in sidebar component
- **Code Block Display** - Fixed project structure displays showing as single horizontal lines
- **Overflow Issues** - Fixed horizontal scrolling issues in documentation pages
- **CSS Specificity** - Resolved Tailwind prose style conflicts with high-specificity rules
- **Mobile Menu** - Fixed mobile navigation menu behavior
- **Token Refresh** - Improved JWT token refresh mechanism

### 🎨 Improved

- **Code Quality** - Enhanced code organization and maintainability
- **Performance** - Optimized project generation speed
- **User Experience** - Simplified workflows and reduced friction
- **Accessibility** - Improved keyboard navigation and screen reader support
- **Visual Design** - Removed emojis for a more professional appearance
- **Typography** - Better font choices and spacing throughout documentation

### 📚 Documentation

- **README.md** - Complete rewrite with professional formatting, badges, and comprehensive sections
- **Installation Guide** - Step-by-step instructions with verification steps
- **CLI Reference** - Detailed documentation for all commands with examples
- **API Documentation** - Complete API endpoint reference with request/response examples
- **Docker Guide** - Comprehensive Docker deployment guide with best practices
- **Contributing Guide** - Clear contribution guidelines

### 🔐 Security

- **Enhanced Authentication** - Improved JWT token handling and validation
- **Password Policies** - Stronger password requirements and history tracking
- **Account Lockout** - Protection against brute force attacks
- **Session Security** - Better session management and tracking
- **CSRF Protection** - Enhanced cross-site request forgery protection

### 🚀 Performance

- **Faster Generation** - Optimized template copying and processing
- **Reduced Bundle Size** - Minified assets and code splitting in Angular
- **Lazy Loading** - Improved lazy loading strategy for Angular modules
- **Database Queries** - Optimized JPA queries and indexing

### 🛠️ Development

- **Better Tooling** - Enhanced development scripts and workflows
- **Testing** - Improved test coverage (target: 80%+)
- **Linting** - Updated ESLint configuration with stricter rules
- **Build Process** - Optimized build and deployment pipeline

### 📦 Package

- **NPM Publishing** - Prepared package for public NPM registry
- **Files Array** - Specified files to include in the package
- **Publish Config** - Added publish configuration for public access
- **Engines** - Specified Node.js and npm version requirements
- **Keywords** - Expanded keywords for better discoverability

## [1.3.0] 

### Added
- Initial CLI tool for project generation
- Spring Boot backend template with JWT authentication
- Angular frontend template with authentication module
- Docker Compose configuration
- Database support for MySQL, PostgreSQL, and MSSQL
- Flyway migrations for database schema management
- User CRUD operations
- Role-based access control

### Changed
- Updated Spring Boot to version 3.3.5
- Updated to Java 21
- Improved project templates

## [1.2.0] 

### Added
- Docker support with multi-container setup
- Environment-specific configurations
- Health check endpoints

### Fixed
- Database connection issues
- Token refresh bugs

## [1.1.0]

### Added
- PostgreSQL and MSSQL support
- Flyway database migrations
- Enhanced error handling

## [1.0.0]

### Added
- Initial release of JAngular CLI
- Basic project generation
- Spring Boot backend
- Angular frontend
- MySQL database support
- JWT authentication

---

## Migration Guides

### Migrating from 1.x to 2.0.0

1. **Update Package**: 
   ```bash
   npm uninstall -g jangular-cli
   npm install -g jangular-cli@2.0.0
   ```

2. **New Projects**: 
   - Simply use `jangular init` as before
   - New interactive prompts and validation

3. **Existing Projects**:
   - Review the new documentation structure at [jangular.dev](https://jangular.dev)
   - Update dependencies in your generated projects
   - Consider adopting standalone components in Angular

4. **New Commands**:
   - Use `jangular docker` for Docker management
   - Use `jangular --test` to verify system requirements

---

## Support

For questions, bug reports, or feature requests, please:
- Visit our [documentation](https://jangular.dev)
- Open an issue on [GitHub](https://github.com/nathangtg/jangular-cli/issues)
- Join our [community discussions](https://github.com/nathangtg/jangular-cli/discussions)

---

**JAngular CLI** - Built with ❤️ by developers, for developers
