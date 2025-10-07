// lib/commands.js
import path from 'path';
import chalk from 'chalk';
import inquirer from 'inquirer';
import fs from 'fs-extra';
import { 
  setupProject, 
  copyBackendTemplate, 
  copyFrontendTemplate,
  createRootPackageJson 
} from './utils.js';

/**
 * Handles the 'init' command to create a new JAngular project
 * @param {string} projectName - Name of the project to create
 * @param {Object} options - Command options
 * @param {string} rootDir - Root directory of the CLI
 */
export async function handleInitCommand(projectName, options, rootDir) {
  console.log(chalk.blue(`Creating new JAngular project: ${projectName}`));
  
  // Get additional configuration
  const answers = await getProjectConfiguration(projectName, options);
  
  // Define directory paths
  const projectDir = path.resolve(projectName);
  const backendDir = path.join(projectDir, 'backend');
  const frontendDir = path.join(projectDir, 'frontend');
  
  try {
    // Create project structure
    await setupProject(projectName, options, answers, rootDir);
    
    // Print success message and instructions
    printSuccessMessage(projectName);
  } catch (error) {
    console.error(chalk.red('Error creating project:'), error);
    process.exit(1);
  }
}

/**
 * Prompts the user for additional project configuration
 * @param {string} projectName - Name of the project
 * @param {Object} options - Command options
 * @returns {Promise<Object>} User answers
 */
async function getProjectConfiguration(projectName, options) {
  return await inquirer.prompt([
    {
      type: 'input',
      name: 'groupId',
      message: 'Enter Java group ID:',
      default: options.groupId || 'com.example'
    },
    {
      type: 'input',
      name: 'artifactId',
      message: 'Enter Java artifact ID:',
      default: options.artifactId || 'backend'
    },
    {
      type: 'input',
      name: 'packageName',
      message: 'Enter base package name:',
      default: (answers) => `${answers.groupId || options.groupId || 'com.example'}.${projectName.toLowerCase().replace(/-/g, '')}`
    },
    {
      type: 'list',
      name: 'databaseType',
      message: 'Select database type:',
      choices: [
        { name: 'MySQL', value: 'mysql' },
        { name: 'PostgreSQL', value: 'postgresql' },
        { name: 'Microsoft SQL Server', value: 'mssql' }
      ],
      default: 'mysql'
    },
    {
      type: 'input',
      name: 'dbName',
      message: 'Enter database name:',
      default: projectName.toLowerCase().replace(/-/g, '_')
    },
    {
      type: 'input',
      name: 'dbUsername',
      message: 'Enter database username:',
      default: 'devuser'
    },
    {
      type: 'input',
      name: 'dbPassword',
      message: 'Enter database password:',
      default: 'devpassword'
    }
  ]);
}

/**
 * Prints success message and getting started instructions
 * @param {string} projectName - Name of the created project
 */
function printSuccessMessage(projectName) {
  console.log(chalk.green('\n✅ JAngular project created successfully!'));
  console.log(`\nTo get started:\n`);
  console.log(`  cd ${projectName}`);
  console.log(`  npm run start:backend   # Start Java backend`);
  console.log(`  npm run start:frontend  # In another terminal, start Angular frontend\n`);
}