import { execSync } from "child_process";
import chalk from "chalk";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const { engines } = require("../package.json");

// Required versions
const REQUIRED_NODE_VERSION = engines.node.replace(">=", "").trim(); // Allow Node.js version 16>= required
const REQUIRED_JAVA_MAJOR_VERSION = "21"; // Allow any Java 21.x.x
const REQUIRED_ANGULAR_CLI_VERSION = "17.0.0"; // Minimum Angular CLI version

function checkNodeVersion() {
  const installedNodeVersion = process.version.replace("v", "");

  if (parseFloat(installedNodeVersion) < parseFloat(REQUIRED_NODE_VERSION)) {
    console.error(
      chalk.red(`❌ Node.js ${REQUIRED_NODE_VERSION} or higher is required. Installed: ${installedNodeVersion}`)
    );
    process.exit(1);
  }

  console.log(chalk.green(`✅ Node.js ${installedNodeVersion} detected.`));
}

function checkJavaVersion() {
  try {
    const javaVersionOutput = execSync("java -version 2>&1", { encoding: "utf-8" });

    // Match Java version in various formats (Oracle JDK, OpenJDK, etc.)
    // This regex captures the major.minor.patch parts
    const versionMatch = javaVersionOutput.match(/(?:version|openjdk)\s*["']?(\d+)(?:\.(\d+))?(?:\.(\d+))?/i);
    
    if (!versionMatch) {
      console.error(chalk.red("❌ Could not determine Java version."));
      console.error(chalk.yellow("Output from java -version:"));
      console.error(javaVersionOutput);
      process.exit(1);
    }

    const majorVersion = versionMatch[1];
    
    if (parseInt(majorVersion) < parseInt(REQUIRED_JAVA_MAJOR_VERSION)) {
      console.error(
        chalk.red(`❌ Java ${REQUIRED_JAVA_MAJOR_VERSION} or higher is required. Installed: Java ${majorVersion}`)
      );
      process.exit(1);
    }

    // Get the full version string for display
    let fullVersion = majorVersion;
    if (versionMatch[2]) fullVersion += `.${versionMatch[2]}`;
    if (versionMatch[3]) fullVersion += `.${versionMatch[3]}`;
    
    // Get vendor information if available
    const vendorMatch = javaVersionOutput.match(/(?:vendor|runtime):\s*([^,\n]+)/i) || 
                       javaVersionOutput.match(/([A-Za-z]+(?:\([TM]+\))?\s+SE)/i);
    const vendor = vendorMatch ? vendorMatch[1].trim() : "";
    
    const vendorInfo = vendor ? ` (${vendor})` : "";
    console.log(chalk.green(`✅ Java ${fullVersion}${vendorInfo} detected.`));
  } catch (error) {
    console.error(chalk.red("❌ Java is not installed or not in PATH."));
    console.error(chalk.yellow("Error details:"), error.message);
    console.error(chalk.yellow("Please install Java 21 or higher and make sure it's in your PATH."));
    process.exit(1);
  }
}

function checkAngularCLI() {
    try {
      console.log(chalk.blue("Checking Angular CLI installation..."));
      
      // Use a simpler command without the problematic flag
      // Add a higher timeout for WSL environments
      const ngVersionOutput = execSync("ng version", { 
        encoding: "utf-8",
        timeout: 30000 // 30 seconds timeout for WSL
      });
      
      // Extract Angular CLI version
      const versionMatch = ngVersionOutput.match(/Angular CLI:\s*(\d+\.\d+\.\d+)/i);
      
      if (!versionMatch) {
        console.error(chalk.red("❌ Could not determine Angular CLI version."));
        console.error(chalk.yellow("Output from ng version:"));
        console.error(ngVersionOutput);
        process.exit(1);
      }
      
      const installedVersion = versionMatch[1];
      const [major, minor] = installedVersion.split('.').map(Number);
      const [reqMajor, reqMinor] = REQUIRED_ANGULAR_CLI_VERSION.split('.').map(Number);
      
      if (major < reqMajor || (major === reqMajor && minor < reqMinor)) {
        console.error(
          chalk.red(`❌ Angular CLI ${REQUIRED_ANGULAR_CLI_VERSION} or higher is required. Installed: ${installedVersion}`)
        );
        console.error(chalk.yellow("Please update Angular CLI with: npm install -g @angular/cli"));
        process.exit(1);
      }
      
      console.log(chalk.green(`✅ Angular CLI ${installedVersion} detected.`));
    } catch (error) {
      // Check if the error is a timeout
      if (error.code === 'ETIMEDOUT') {
        console.error(chalk.red("❌ Angular CLI check timed out."));
        console.error(chalk.yellow("This might be due to slow WSL performance."));
        console.error(chalk.yellow("Try running 'ng version' manually to verify Angular CLI is installed."));
        
        // Ask user if they want to continue anyway
        const rl = require('readline').createInterface({
          input: process.stdin,
          output: process.stdout
        });
        
        rl.question(chalk.blue('Do you want to continue anyway? (y/n): '), (answer) => {
          rl.close();
          if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
            console.log(chalk.yellow("⚠️  Continuing without Angular CLI verification."));
            return; // Continue with the process
          } else {
            process.exit(1);
          }
        });
      } else {
        // Try a different approach - check if ng is in PATH
        try {
          execSync("which ng || where ng", { encoding: "utf-8" });
          console.log(chalk.yellow("⚠️  Angular CLI appears to be installed but version check failed."));
          console.log(chalk.yellow("Continuing with the process, but you may encounter issues if Angular CLI version is incompatible."));
        } catch (pathError) {
          console.error(chalk.red("❌ Angular CLI is not installed or not in PATH."));
          console.error(chalk.yellow("Please install Angular CLI with: npm install -g @angular/cli"));
          process.exit(1);
        }
      }
    }
  }

function checkMaven() {
  try {
    // Check if Maven is installed
    const mvnVersionOutput = execSync("mvn --version", { encoding: "utf-8" });
    
    // Extract Maven version
    const versionMatch = mvnVersionOutput.match(/Apache Maven\s+(\d+\.\d+\.\d+)/i);
    
    if (!versionMatch) {
      console.error(chalk.red("❌ Could not determine Maven version."));
      console.error(chalk.yellow("Output from mvn --version:"));
      console.error(mvnVersionOutput);
      process.exit(1);
    }
    
    const installedVersion = versionMatch[1];
    console.log(chalk.green(`✅ Apache Maven ${installedVersion} detected.`));
    
    // Verify Maven is using the correct Java version
    const javaMatch = mvnVersionOutput.match(/Java version:\s*(\d+\.\d+\.\d+)/i);
    if (javaMatch) {
      const mavenJavaVersion = javaMatch[1];
      const mavenJavaMajor = mavenJavaVersion.split('.')[0];
      
      if (parseInt(mavenJavaMajor) < parseInt(REQUIRED_JAVA_MAJOR_VERSION)) {
        console.warn(
          chalk.yellow(`⚠️  Warning: Maven is using Java ${mavenJavaVersion}, but Java ${REQUIRED_JAVA_MAJOR_VERSION} is recommended.`)
        );
        console.warn(
          chalk.yellow("Maven might be using a different Java installation than your system default.")
        );
      }
    }
  } catch (error) {
    console.error(chalk.red("❌ Maven is not installed or not in PATH."));
    console.error(chalk.yellow("Please install Maven and make sure it's in your PATH."));
    console.error(chalk.yellow("Installation guide: https://maven.apache.org/install.html"));
    process.exit(1);
  }
}

export function checkRequirements() {
  console.log(chalk.blue("🔍 Checking system requirements..."));
  checkNodeVersion();
  checkJavaVersion();
  checkAngularCLI();
  checkMaven();
  console.log(chalk.green("✅ All requirements met!"));
}