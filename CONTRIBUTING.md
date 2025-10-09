# Contributing to JAngular CLI

Thank you for your interest in contributing to JAngular CLI! This is an open-source project under the MIT License, and we welcome contributions from the community. This document provides guidelines and information to help you contribute effectively.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Style Guidelines](#style-guidelines)
- [Submitting Changes](#submitting-changes)
- [Testing](#testing)
- [Documentation](#documentation)
- [License](#license)

## Code of Conduct

By participating in this project, you agree to abide by the JAngular CLI [Code of Conduct](CODE_OF_CONDUCT.md). Please read it before contributing.

## Getting Started

JAngular CLI is a command-line interface tool that rapidly bootstraps enterprise-grade full-stack applications combining **Angular 17+** (frontend) and **Spring Boot 3.x** with **Java 21** (backend).

The project provides:
- JWT Authentication & Authorization with refresh tokens
- Multi-Database Support (MySQL, PostgreSQL, MSSQL)
- Database Migrations with Flyway
- Advanced Security with Spring Security
- Docker Support with pre-configured containers
- User Management with role-based access control
- Frontend with standalone components, Tailwind CSS, and reactive forms

## Project Structure

```
jangular-cli/
├── index.js              # Main CLI entry point
├── package.json          # Project dependencies and metadata
├── README.md             # Project overview and usage
├── CONTRIBUTING.md       # This file
├── LICENSE.txt           # MIT License
├── CODE_OF_CONDUCT.md    # Code of conduct
├── CHANGELOG.md          # Release history
├── .github/              # GitHub workflows and templates
├── lib/                  # Core CLI functionality
│   ├── commands.js       # Command implementations
│   ├── constants.js      # Configuration constants
│   ├── docker_commands.js # Docker management
│   ├── requirements.js   # System requirements checks
│   ├── update-notifier.js # Update checking
│   └── utils.js          # Utility functions
├── templates/            # Project template files
│   ├── backend/          # Spring Boot application template
│   ├── frontend/         # Angular application template
│   └── docker/           # Docker configuration templates
├── docs/                 # Documentation source code
├── resources/            # Additional project resources
└── templates/            # Generated project templates
```

### Key Directories

- **`lib/`**: Contains the core CLI logic, command handling, and utilities
- **`templates/`**: Contains the project templates for backend, frontend, and Docker configurations
- **`docs/`**: Contains the source code for the documentation website

## Development Setup

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **Java**: v21 or higher (OpenJDK or Oracle JDK)
- **Angular CLI**: v17.0.0 or higher
- **Apache Maven**: v3.6.0 or higher
- **Git**: Latest version
- **Docker** and **Docker Compose** (optional, for containerization)

### Setup Instructions

1. **Fork the repository** on GitHub
2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/jangular-cli.git
   cd jangular-cli
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Verify setup**:
   ```bash
   npm start -- --help
   ```

## How to Contribute

### Finding Issues to Work On

- Check the [Issues](https://github.com/nathangtg/jangular-cli/issues) page for open issues
- Look for issues labeled `good first issue` if you're new to the project
- Issues with the `help wanted` label are especially welcome for contribution

### Adding New Features

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Implement your feature**:
   - Follow the existing code patterns and style
   - Add/update tests as needed
   - Update documentation if necessary

3. **Test your changes**:
   ```bash
   npm test
   ```

### Fixing Bugs

1. **Create a bugfix branch**:
   ```bash
   git checkout -b fix/issue-number-or-bug-description
   ```

2. **Implement the fix**:
   - Write a test that reproduces the issue
   - Make the necessary code changes
   - Verify the test passes

### Improving Documentation

Documentation improvements are always welcome! You can contribute to:

- **README.md**: Main project documentation
- **docs/**: Source files for the documentation website
- **Code comments**: Improve inline documentation
- **Template READMEs**: Documentation in generated projects

## Style Guidelines

### JavaScript/Node.js

- Follow the existing code style in the project
- Use semicolons consistently
- Use single quotes for strings
- Use 2-space indentation
- Use descriptive variable and function names
- Write clear, concise comments where necessary

### Java (Backend Template)

- Follow standard Java naming conventions
- Use proper indentation and formatting
- Include JavaDoc comments for public methods
- Follow Spring Boot best practices

### Angular (Frontend Template)

- Use TypeScript best practices
- Follow Angular style guide
- Use consistent naming conventions
- Follow component design principles

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests when relevant

## Submitting Changes

### Before Submitting

1. **Run tests** to ensure your changes don't break existing functionality:
   ```bash
   npm test
   ```

2. **Update dependencies** if needed:
   ```bash
   npm audit fix
   ```

3. **Check the code quality** (if applicable):
   ```bash
   npm run lint
   ```

### Creating a Pull Request

1. **Update your branch** with the latest changes from the main branch:
   ```bash
   git fetch origin
   git rebase origin/main
   # or git merge origin/main
   ```

2. **Push your changes** to your fork:
   ```bash
   git push origin your-branch-name
   ```

3. **Open a pull request** on GitHub, making sure to:
   - Provide a clear title and description
   - Reference any related issues
   - Indicate if the pull request is still a work in progress

### Pull Request Review Process

- Maintainers will review your pull request
- You may receive feedback for changes
- Once approved, your pull request will be merged
- Thank you for your contribution!

## Testing

### Running Tests

```bash
npm test
```

### Adding Tests

When adding new features or fixing bugs, please include appropriate tests:

- **Unit tests** for individual functions and methods
- **Integration tests** for components working together
- **CLI command tests** to verify correct behavior

## Documentation

### Updating Documentation

- **API Documentation**: Update inline documentation in the source code
- **User Documentation**: Edit files in the `docs/` directory
- **README Updates**: Update the main `README.md` and template `README.md` files as needed

### Writing Good Documentation

- Be clear and concise
- Use examples where appropriate
- Keep documentation up to date with code changes
- Follow the same style as existing documentation

## License

By contributing to JAngular CLI, you agree that your contributions will be licensed under the [MIT License](LICENSE.txt) that covers the entire project.

This means:
- You retain copyright for your contributions
- Your contributions will be available under the same MIT License terms
- The software is provided "as is", without warranty of any kind
- You can use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the software

## Questions?

If you have questions about contributing that aren't covered in this document:

- Open an issue in the [GitHub repository](https://github.com/nathangtg/jangular-cli/issues)

Thank you again for your interest in contributing to JAngular CLI! We look forward to your contributions.