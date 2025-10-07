#!/usr/bin/env node
import { Command } from 'commander';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';

// Version handlers
import { UpdateNotifier } from './lib/update-notifier.js';

// Command handlers
import { handleInitCommand } from './lib/commands.js';

// Docker commands
import { handleDockerMenu } from './lib/docker_commands.js';

// Constants
import { PROGRAM_VERSION, PROGRAM_DESCRIPTION } from './lib/constants.js';
import { checkRequirements } from './lib/requirements.js';

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Main CLI function
async function initializeCLI() {
  console.log(PROGRAM_DESCRIPTION);
  console.log(`Version: ${PROGRAM_VERSION}`);
  // Set up the CLI program
  const program = new Command('jangular')
    .version(PROGRAM_VERSION)
    .description(PROGRAM_DESCRIPTION);

  // Asynchronous version check - run in background
  const notifier = new UpdateNotifier('jangular-cli', true);
  notifier.checkForUpdate().catch(console.error);

  program.option('--test', 'Run a test check for JAngular CLI');

  // Initialize command
  program
    .command('init <projectName>')
    .description('Initialize a new Java + Angular project')
    .option('-g, --group-id <groupId>', 'Java group ID', 'com.example')
    .option('-a, --artifact-id <artifactId>', 'Java artifact ID', 'backend')
    .action(async (projectName, options) => {
      try {
        checkRequirements();
        await handleInitCommand(projectName, options, __dirname);
    
        // Only check for update AFTER project scaffolding
        const notifier = new UpdateNotifier('jangular-cli', false);
        await notifier.checkForUpdate();
      } catch (error) {
        console.error(chalk.red('Error during project initialization:'), error);
        process.exit(1);
      }
    });

    program
    .command('docker')
    .description('Manage and monitor Docker services')
    .action(async () => {
      try {
        await handleDockerMenu();
      } catch (err) {
        console.error(chalk.red('Docker command failed:'), err);
        process.exit(1);
      }
    });  
    
  program
    .command('test')
    .description('Run tests for the generated project')
    .option('-b, --backend', 'Test only the backend')
    .option('-f, --frontend', 'Test only the frontend')
    .option('-a, --all', 'Test both backend and frontend (default)')
    .action(async (options) => {
      try {
        console.log(chalk.yellow('Running tests...'));
        const backendOpt = options.backend;
        const frontendOpt = options.frontend;
        const allOpt = options.all !== false; // default to true if not explicitly set to false
        
        if (backendOpt || allOpt) {
          console.log(chalk.blue('Testing backend...'));
          if (shell.exec('cd backend && ./mvnw test').code !== 0) {
            console.error(chalk.red('Backend tests failed'));
            process.exit(1);
          } else {
            console.log(chalk.green('✓ Backend tests passed'));
          }
        }
        
        if (frontendOpt || allOpt) {
          console.log(chalk.blue('Testing frontend...'));
          if (shell.exec('cd frontend && npm test -- --watch=false --bail').code !== 0) {
            console.error(chalk.red('Frontend tests failed'));
            process.exit(1);
          } else {
            console.log(chalk.green('✓ Frontend tests passed'));
          }
        }
        
        console.log(chalk.green('✓ All tests completed successfully'));
      } catch (err) {
        console.error(chalk.red('Test command failed:'), err);
        process.exit(1);
      }
    });
    
  program
    .command('build')
    .description('Build the project for production')
    .option('-b, --backend', 'Build only the backend')
    .option('-f, --frontend', 'Build only the frontend')
    .option('-a, --all', 'Build both backend and frontend (default)')
    .option('-p, --prod', 'Build with production profile')
    .action(async (options) => {
      try {
        console.log(chalk.yellow('Building project...'));
        const backendOpt = options.backend;
        const frontendOpt = options.frontend;
        const allOpt = options.all !== false; // default to true if not explicitly set to false
        const prodOpt = options.prod;
        
        if (backendOpt || allOpt) {
          console.log(chalk.blue('Building backend...'));
          let buildCmd = 'cd backend && ./mvnw clean package';
          if (prodOpt) {
            buildCmd += ' -Pprod';
          }
          if (shell.exec(buildCmd).code !== 0) {
            console.error(chalk.red('Backend build failed'));
            process.exit(1);
          } else {
            console.log(chalk.green('✓ Backend built successfully'));
          }
        }
        
        if (frontendOpt || allOpt) {
          console.log(chalk.blue('Building frontend...'));
          let buildCmd = 'cd frontend && npm run build';
          if (prodOpt) {
            buildCmd += ' --prod';
          }
          if (shell.exec(buildCmd).code !== 0) {
            console.error(chalk.red('Frontend build failed'));
            process.exit(1);
          } else {
            console.log(chalk.green('✓ Frontend built successfully'));
          }
        }
        
        console.log(chalk.green('✓ Build completed successfully'));
      } catch (err) {
        console.error(chalk.red('Build command failed:'), err);
        process.exit(1);
      }
    });

  program.parse(process.argv);

  // Handle `--test` option
  const options = program.opts();
  if (options.test) {
    console.log(chalk.green("✅ JAngular CLI test executed successfully!"));
    console.log(chalk.blue("CLI is working as expected."));
    process.exit(0);
  }
}

// Execute CLI
initializeCLI().catch(error => {
  console.error(chalk.red('CLI initialization error:'), error);
  process.exit(1);
});