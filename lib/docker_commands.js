import inquirer from 'inquirer';
import chalk from 'chalk';
import shell from 'shelljs';

const GREEN = chalk.green;
const YELLOW = chalk.yellow;
const RED = chalk.red;

function checkCommand(cmd) {
  if (!shell.which(cmd)) {
    console.log(RED(`Error: ${cmd} is not installed.`));
    shell.exit(1);
  }
}

function checkDockerStatus() {
  if (shell.exec('docker info', { silent: true }).code !== 0) {
    console.log(RED('Error: Docker daemon is not running.'));
    shell.exit(1);
  }
}

function showAccessInfo() {
  console.log(`\n${GREEN('===== Services Access Information =====')}`);
  console.log(`Backend:       ${YELLOW('http://localhost:8080')}`);
  console.log(`Frontend:      ${YELLOW('http://localhost:4200')}`);
  console.log(`phpMyAdmin:    ${YELLOW('http://localhost:8081')} (MySQL GUI)`);
  console.log(`pgAdmin:       ${YELLOW('http://localhost:8082')} (PostgreSQL GUI)`);

  console.log(`\n${GREEN('===== Database Connection Info =====')}`);
  console.log(`MySQL:         ${YELLOW('localhost:3306')} (root / rootpassword)`);
  console.log(`PostgreSQL:    ${YELLOW('localhost:5432')} (postgres / postgres)`);
  console.log();
}

function startServices(type) {
  switch (type) {
    case 'all':
      console.log(YELLOW('Starting all services...'));
      shell.exec('docker-compose up -d');
      showAccessInfo();
      break;
    case 'db':
      console.log(YELLOW('Starting only databases...'));
      shell.exec('docker-compose up -d mysql postgres phpmyadmin pgadmin');
      showAccessInfo();
      break;
    case 'backend':
      console.log(YELLOW('Starting backend...'));
      shell.exec('docker-compose up -d backend');
      break;
    case 'frontend':
      console.log(YELLOW('Starting frontend...'));
      shell.exec('docker-compose up -d frontend');
      break;
    case 'production':
      console.log(YELLOW('Starting services in production mode...'));
      shell.exec('docker-compose -f docker-compose.prod.yml up -d');
      break;
  }
}

async function showLogs() {
  const services = [
    'All services',
    'Backend',
    'Frontend',
    'MySQL',
    'PostgreSQL',
  ];
  inquirer.prompt([
    {
      type: 'list',
      name: 'service',
      message: 'Choose a service to view logs:',
      choices: services
    }
  ]).then(({ service }) => {
    const cmd = {
      'All services': 'docker-compose logs',
      'Backend': 'docker-compose logs backend',
      'Frontend': 'docker-compose logs frontend',
      'MySQL': 'docker-compose logs mysql',
      'PostgreSQL': 'docker-compose logs postgres',
    }[service];
    shell.exec(cmd);
  });
}

function checkDbHealth() {
  console.log(YELLOW('Checking database health...'));
  const checks = [
    {
      name: 'MySQL',
      cmd: 'docker-compose exec mysql mysqladmin ping -h localhost -u root -prootpassword',
    },
    {
      name: 'PostgreSQL',
      cmd: 'docker-compose exec postgres pg_isready -U postgres',
    }
  ];

  for (const check of checks) {
    const result = shell.exec(check.cmd, { silent: true });
    if (result.code === 0) {
      console.log(GREEN(`${check.name}: Running and healthy`));
    } else {
      console.log(RED(`${check.name}: Not healthy or not running`));
    }
  }
}

function stopAll() {
  console.log(YELLOW('Stopping all services...'));
  shell.exec('docker-compose down');
}

function stopProduction() {
  console.log(YELLOW('Stopping production services...'));
  shell.exec('docker-compose -f docker-compose.prod.yml down');
}

function showContainers() {
  console.log(YELLOW('Running containers:'));
  shell.exec('docker-compose ps');
}

async function resetVolumes() {
  inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: 'This will delete all database data. Are you sure?',
      default: false
    }
  ]).then(({ confirm }) => {
    if (confirm) {
      shell.exec('docker-compose down -v');
      console.log(GREEN('All volumes removed.'));
    }
  });
}

function ensureReady() {
  checkCommand('docker');
  checkCommand('docker-compose');
  checkDockerStatus();
}

export async function handleDockerMenu() {
    ensureReady();
  
    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'Select a Docker action:',
        choices: [
          { name: 'Start all services', value: 'start_all' },
          { name: 'Start only databases', value: 'start_db' },
          { name: 'Start backend only', value: 'start_backend' },
          { name: 'Start frontend only', value: 'start_frontend' },
          { name: 'Start in production mode', value: 'start_prod' },
          { name: 'Stop production services', value: 'stop_prod' },
          { name: 'Show running containers', value: 'ps' },
          { name: 'Show service logs', value: 'logs' },
          { name: 'Check DB health', value: 'check_health' },
          { name: 'Stop all services', value: 'stop' },
          { name: 'Delete volumes (reset DBs)', value: 'reset' },
          { name: 'Exit', value: 'exit' }
        ]
      }
    ]);
  
    switch (action) {
      case 'start_all':
        startServices('all');
        break;
      case 'start_db':
        startServices('db');
        break;
      case 'start_backend':
        startServices('backend');
        break;
      case 'start_frontend':
        startServices('frontend');
        break;
      case 'start_prod':
        startServices('production');
        break;
      case 'stop_prod':
        stopProduction();
        break;
      case 'ps':
        showContainers();
        break;
      case 'logs':
        await showLogs();
        break;
      case 'check_health':
        checkDbHealth();
        break;
      case 'stop':
        stopAll();
        break;
      case 'reset':
        await resetVolumes();
        break;
      case 'exit':
      default:
        console.log(chalk.blue('Exiting Docker menu.'));
        break;
    }
  }  

export {
  ensureReady,
  startServices,
  showLogs,
  checkDbHealth,
  stopAll,
  stopProduction,
  showContainers,
  resetVolumes
};
