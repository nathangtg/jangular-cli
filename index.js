#!/usr/bin/env node
import { Command } from 'commander';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';

// Version handlers
import { UpdateNotifier } from './lib/update-notifier.js';

// Command handlers
import { handleInitCommand } from './lib/commands.js';

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
        // Move requirements check to be more selective
        checkRequirements();
        await handleInitCommand(projectName, options, __dirname);
      } catch (error) {
        console.error(chalk.red('Error during project initialization:'), error);
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