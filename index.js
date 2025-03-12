#!/usr/bin/env node

import { Command } from 'commander';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';
import { execSync } from 'child_process';
import inquirer from 'inquirer';

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up the CLI program
const program = new Command('jangular')
  .version('0.1.0')
  .description('A CLI tool for generating Java + Angular projects');

program
  .command('init <projectName>')
  .description('Initialize a new Java + Angular project')
  .option('-g, --group-id <groupId>', 'Java group ID', 'com.example')
  .option('-a, --artifact-id <artifactId>', 'Java artifact ID', 'backend')
  .action(async (projectName, options) => {
    console.log(chalk.blue(`Creating new JAngular project: ${projectName}`));
    
    // Get additional configuration if needed
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'packageName',
        message: 'Enter base package name:',
        default: `${options.groupId}.${projectName.toLowerCase().replace(/-/g, '')}`
      }
    ]);
    
    // Create project directory structure
    const projectDir = path.resolve(projectName);
    const backendDir = path.join(projectDir, 'backend');
    const frontendDir = path.join(projectDir, 'frontend');
    
    try {
      // Create project directories
      fs.mkdirSync(projectDir, { recursive: true });
      
      // Copy backend template
      console.log(chalk.yellow('Setting up Java backend...'));
      await copyBackendTemplate(backendDir, {
        projectName,
        groupId: options.groupId,
        artifactId: options.artifactId,
        packageName: answers.packageName
      });
      
      // Create Angular frontend
      console.log(chalk.yellow('Setting up Angular frontend...'));
      const templateFrontendDir = path.join(__dirname, 'templates', 'frontend');
      
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
      
      // Create root package.json with scripts
      createRootPackageJson(projectDir, projectName);
      
      console.log(chalk.green('\n✅ JAngular project created successfully!'));
      console.log(`\nTo get started:\n`);
      console.log(`  cd ${projectName}`);
      console.log(`  npm run start:backend   # Start Java backend`);
      console.log(`  npm run start:frontend  # In another terminal, start Angular frontend\n`);
      
    } catch (error) {
      console.error(chalk.red('Error creating project:'), error);
      process.exit(1);
    }
  });

// Function to copy and customize backend template
async function copyBackendTemplate(targetDir, config) {
  // Path to backend template
  const templateDir = path.join(__dirname, 'templates', 'backend');
  
  try {
    // Check if template directory exists
    if (!fs.existsSync(templateDir)) {
      console.error(chalk.red(`Backend template directory not found at: ${templateDir}`));
      console.log(chalk.yellow(`Creating a basic directory structure instead.`));
      
      // Create basic structure if template doesn't exist
      fs.mkdirSync(targetDir, { recursive: true });
      fs.mkdirSync(path.join(targetDir, 'src', 'main', 'java'), { recursive: true });
      fs.mkdirSync(path.join(targetDir, 'src', 'main', 'resources'), { recursive: true });
      return;
    }
    
    // Copy template to target directory
    await fs.copy(templateDir, targetDir);
    
    // Update pom.xml with project details
    const pomPath = path.join(targetDir, 'pom.xml');
    if (await fs.pathExists(pomPath)) {
      let pomContent = await fs.readFile(pomPath, 'utf8');
      
      pomContent = pomContent
        .replace(/{{groupId}}/g, config.groupId)
        .replace(/{{artifactId}}/g, config.artifactId)
        .replace(/{{projectName}}/g, config.projectName);
      
      await fs.writeFile(pomPath, pomContent);
    }
    
    // Update package structure
    const packageDir = path.join(
      targetDir, 
      'src', 
      'main', 
      'java', 
      ...config.packageName.split('.')
    );
    
    // Create package directories
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
    
    // Update application.properties
    const appPropsPath = path.join(targetDir, 'src', 'main', 'resources', 'application.properties');
    if (await fs.pathExists(appPropsPath)) {
      let appProps = await fs.readFile(appPropsPath, 'utf8');
      
      appProps = appProps
        .replace(/{{projectName}}/g, config.projectName);
      
      await fs.writeFile(appPropsPath, appProps);
    }
  } catch (error) {
    console.error(chalk.red('Error setting up backend:'), error);
    throw error;
  }
}

// Create root package.json with convenient scripts
function createRootPackageJson(projectDir, projectName) {
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

// Helper: Convert kebab-case to CamelCase
function toCamelCase(str) {
  return str.split('-').map((part, index) => {
    return part.charAt(0).toUpperCase() + part.slice(1);
  }).join('');
}

program.parse(process.argv);