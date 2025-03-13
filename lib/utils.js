import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import crypto from 'crypto';

/**
 * Sets up the project structure
 * @param {string} projectName - Name of the project
 * @param {Object} options - Command options
 * @param {Object} answers - User configuration answers
 * @param {string} rootDir - Root directory of the CLI
 */
export async function setupProject(projectName, options, answers, rootDir) {
  // Create project directory structure
  const projectDir = path.resolve(projectName);
  const backendDir = path.join(projectDir, 'backend');
  const frontendDir = path.join(projectDir, 'frontend');
  
  // Create project directories
  fs.mkdirSync(projectDir, { recursive: true });
  
  // Copy backend template
  console.log(chalk.yellow('Setting up Java backend...'));
  await copyBackendTemplate(backendDir, {
    projectName,
    groupId: options.groupId,
    artifactId: options.artifactId,
    packageName: answers.packageName,
    databaseType: answers.databaseType,
    dbName: answers.dbName,
    dbUsername: answers.dbUsername,
    dbPassword: answers.dbPassword
  }, rootDir);
  
  // Create Angular frontend
  console.log(chalk.yellow('Setting up Angular frontend...'));
  await copyFrontendTemplate(frontendDir, rootDir);
  
  // Create root package.json with scripts
  createRootPackageJson(projectDir, projectName);
}

/**
 * Copies and customizes the backend template
 * @param {string} targetDir - Target directory for backend files
 * @param {Object} config - Configuration options
 * @param {string} rootDir - Root directory of the CLI
 */
export async function copyBackendTemplate(targetDir, config, rootDir) {
  // Path to backend template
  const templateDir = path.join(rootDir, 'templates', 'backend');
  
  try {
    // Check if template directory exists
    if (!fs.existsSync(templateDir)) {
      handleMissingTemplate(templateDir, targetDir);
      return;
    }
    
    // Copy template to target directory
    await fs.copy(templateDir, targetDir);
    
    // Update pom.xml with proper values
    await updatePomXml(targetDir, config);
    
    // Create database directories and migration placeholders
    await createDatabaseDirectories(targetDir, config);
    
    // Remove migration directories for unused database types
    await removeUnusedMigrationDirectories(targetDir, config.databaseType);
    
    // Update main application class
    await updateMainApplication(templateDir, targetDir, config);
    
    // Generate JWT secret if not provided
    if (!config.jwtSecret) {
      config.jwtSecret = generateRandomJwtSecret();
    }
    
    // Update application properties files
    await updateApplicationProperties(targetDir, config);
    
  } catch (error) {
    console.error(chalk.red('Error setting up backend:'), error);
    throw error;
  }
}

/**
 * Removes migration directories for unused database types
 * @param {string} targetDir - Target directory
 * @param {string} selectedDbType - Selected database type
 */
async function removeUnusedMigrationDirectories(targetDir, selectedDbType) {
  const databaseTypes = ['mysql', 'postgresql', 'mssql'];
  
  // Filter out the selected database type
  const unusedDbTypes = databaseTypes.filter(dbType => dbType !== selectedDbType);
  
  for (const dbType of unusedDbTypes) {
    const migrationDir = path.join(
      targetDir, 
      'src', 
      'main', 
      'resources', 
      'db',
      'migration',
      dbType
    );
    
    try {
      await fs.remove(migrationDir);
      console.log(chalk.yellow(`Removed unused migration directory for ${dbType}`));
    } catch (error) {
      console.warn(chalk.yellow(`Could not remove ${dbType} migration directory: ${error.message}`));
    }
  }
}

/**
 * Creates database-specific migration directories
 * @param {string} targetDir - Target directory
 * @param {Object} config - Configuration options
 */
async function createDatabaseDirectories(targetDir, config) {
  // Create migration directories for each database type
  const databaseTypes = ['mysql', 'postgresql', 'mssql'];
  
  for (const dbType of databaseTypes) {
    const migrationDir = path.join(
      targetDir, 
      'src', 
      'main', 
      'resources', 
      'db',
      'migration',
      dbType
    );
    
    fs.mkdirSync(migrationDir, { recursive: true });
  }
}

/**
 * Creates basic directory structure when template is missing
 * @param {string} templateDir - Template directory path
 * @param {string} targetDir - Target directory path
 */
function handleMissingTemplate(templateDir, targetDir) {
  console.error(chalk.red(`Backend template directory not found at: ${templateDir}`));
  console.log(chalk.yellow(`Creating a basic directory structure instead.`));
  
  // Create basic structure if template doesn't exist
  fs.mkdirSync(targetDir, { recursive: true });
  fs.mkdirSync(path.join(targetDir, 'src', 'main', 'java'), { recursive: true });
  fs.mkdirSync(path.join(targetDir, 'src', 'main', 'resources'), { recursive: true });
}

/**
 * Updates pom.xml with project details
 * @param {string} targetDir - Target directory
 * @param {Object} config - Configuration options
 */
async function updatePomXml(targetDir, config) {
  const pomPath = path.join(targetDir, 'pom.xml');
  if (await fs.pathExists(pomPath)) {
    let pomContent = await fs.readFile(pomPath, 'utf8');
    
    pomContent = pomContent
      .replace(/{{groupId}}/g, config.groupId)
      .replace(/{{artifactId}}/g, config.artifactId)
      .replace(/{{projectName}}/g, config.projectName);
    
    await fs.writeFile(pomPath, pomContent);
  }
}

/**
 * Updates main application class
 * @param {string} templateDir - Template directory
 * @param {string} targetDir - Target directory
 * @param {Object} config - Configuration options
 */
async function updateMainApplication(templateDir, targetDir, config) {
  // Create package directories
  const packageDir = path.join(
    targetDir, 
    'src', 
    'main', 
    'java', 
    ...config.packageName.split('.')
  );
  
  fs.mkdirSync(packageDir, { recursive: true });
  
  // Update main application class
  const mainAppTemplate = path.join(templateDir, 'src', 'main', 'java', 'MainApplication.java.template');
  if (await fs.pathExists(mainAppTemplate)) {
    const mainAppContent = await fs.readFile(mainAppTemplate, 'utf8');
    
    const updatedMainApp = mainAppContent
      .replace(/{{packageName}}/g, config.packageName)
      .replace(/{{projectNameCamelCase}}/g, toCamelCase(config.projectName) + 'Application');
    
    await fs.writeFile(
      path.join(packageDir, `${toCamelCase(config.projectName)}Application.java`),
      updatedMainApp
    );
  }
}

/**
 * Updates application properties files
 * @param {string} targetDir - Target directory
 * @param {Object} config - Configuration options
 */
async function updateApplicationProperties(targetDir, config) {
  const resourcesDir = path.join(targetDir, 'src', 'main', 'resources');
  
  // Ensure the resources directory exists
  await fs.mkdir(resourcesDir, { recursive: true });

  // Base application properties (NO database config inside)
  const basePropsPath = path.join(resourcesDir, 'application.properties');
  const baseContent = `
spring.application.name=${config.projectName}

# Shared Hibernate Properties
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# Flyway Configuration
spring.flyway.baseline-on-migrate=true
spring.flyway.enabled=true

# JWT Configuration
app.jwt.secret=${config.jwtSecret}
app.jwt.expiration=3600000
app.jwt.refreshExpiration=86400000

# Auth Configuration
auth.failed-attempts-cache=failed-attempts
auth.max-failed-attempts=5
auth.lock-time-duration=30

# Database Profile Activation
spring.profiles.active=${config.databaseType}
  `;

  await fs.writeFile(basePropsPath, baseContent.trim(), 'utf-8');
  console.log(chalk.green('✔ application.properties generated successfully.'));

  // Define database-specific properties
  const dbConfigs = {
    mysql: `
# MySQL Database Connection
spring.datasource.url=jdbc:mysql://localhost:3306/${config.dbName}?allowPublicKeyRetrieval=true&useSSL=false
spring.datasource.username=${config.dbUsername}
spring.datasource.password=${config.dbPassword}
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# MySQL-specific Hibernate properties
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect

# MySQL-specific Flyway configuration
spring.flyway.locations=classpath:db/migration/mysql`,
    postgresql: `
# PostgreSQL Database Connection
spring.datasource.url=jdbc:postgresql://localhost:5432/${config.dbName}
spring.datasource.username=${config.dbUsername}
spring.datasource.password=${config.dbPassword}
spring.datasource.driver-class-name=org.postgresql.Driver

# PostgreSQL-specific Hibernate properties
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect

# PostgreSQL-specific Flyway configuration
spring.flyway.locations=classpath:db/migration/postgresql`,
    mssql: `
# SQL Server Database Connection
spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=${config.dbName};encrypt=true;trustServerCertificate=true;
spring.datasource.username=${config.dbUsername}
spring.datasource.password=${config.dbPassword}
spring.datasource.driver-class-name=com.microsoft.sqlserver.jdbc.SQLServerDriver

# SQL Server-specific Hibernate properties
spring.jpa.database-platform=org.hibernate.dialect.SQLServerDialect

# SQL Server-specific Flyway configuration
spring.flyway.locations=classpath:db/migration/mssql`
  };

  // Validate the database type
  if (!dbConfigs[config.databaseType]) {
    console.error(chalk.red(`❌ Unsupported database type: ${config.databaseType}`));
    return;
  }

  // Generate only ONE database-specific file
  const dbPropsPath = path.join(resourcesDir, `application-${config.databaseType}.properties`);
  await fs.writeFile(dbPropsPath, dbConfigs[config.databaseType].trim(), 'utf-8');
  console.log(chalk.green(`✔ application-${config.databaseType}.properties generated successfully.`));

  // Remove other unnecessary database property files
  const otherDatabases = ['mysql', 'postgresql', 'mssql'].filter(db => db !== config.databaseType);
  for (const db of otherDatabases) {
    const filePath = path.join(resourcesDir, `application-${db}.properties`);
    try {
      await fs.unlink(filePath);
      console.log(chalk.yellow(`🗑 Removed unnecessary file: application-${db}.properties`));
    } catch (err) {
      if (err.code !== 'ENOENT') console.error(chalk.red(`❌ Error deleting ${filePath}: ${err.message}`));
    }
  }
}



/**
 * Copies frontend template to target directory
 * @param {string} frontendDir - Target frontend directory
 * @param {string} rootDir - Root directory of the CLI
 */
export async function copyFrontendTemplate(frontendDir, rootDir) {
  const templateFrontendDir = path.join(rootDir, 'templates', 'frontend');
  
  try {
    if (!fs.existsSync(templateFrontendDir)) {
      console.error(chalk.red('Frontend template not found!'));
      console.log(chalk.yellow('Skipping frontend setup. You may create it manually.'));
    } else {
      await fs.copy(templateFrontendDir, frontendDir);
      console.log(chalk.green('Frontend template copied successfully!'));
    }
  } catch (error) {
    console.error(chalk.red('Error copying frontend template:'), error);
  }
}

/**
 * Creates root package.json with convenience scripts
 * @param {string} projectDir - Project directory
 * @param {string} projectName - Project name
 */
export function createRootPackageJson(projectDir, projectName) {
  const packageJson = {
    name: projectName,
    version: "0.1.0",
    private: true,
    scripts: {
      "start:backend": "cd backend && ./mvnw spring-boot:run",
      "start:frontend": "cd frontend && npm start",
      "build": "cd backend && ./mvnw clean package && cd ../frontend && npm run build",
      "install:all": "cd backend && ./mvnw clean install && cd ../frontend && npm install"
    }
  };
  
  fs.writeFileSync(
    path.join(projectDir, 'package.json'),
    JSON.stringify(packageJson, null, 2)
  );
}

/**
 * Converts kebab-case to CamelCase
 * @param {string} str - String to convert
 * @returns {string} CamelCase string
 */
export function toCamelCase(str) {
  return str.split('-').map((part, index) => {
    return part.charAt(0).toUpperCase() + part.slice(1);
  }).join('');
}

/**
 * Generates a random JWT secret key
 * @returns {string} A Base64 encoded random string
 */
function generateRandomJwtSecret() {
  return crypto.randomBytes(64).toString('base64');
}