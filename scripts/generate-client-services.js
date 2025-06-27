
/**
 * Client Services Generator
 *
 * This script automatically generates TypeScript client services for both
 * admin and user APIs by:
 * 1. Downloading OpenAPI specs from running server
 * 2. Generating TypeScript clients using OpenAPI Generator
 *
 * Works on both macOS and Windows
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const https = require('https');
const http = require('http');

// Configuration
const CONFIG = {
  serverUrl: 'http://localhost:8080',
  outputDir: 'client-services',
  adminSpecUrl: '/api/admin-docs-json',
  userSpecUrl: '/api/user-docs-json',
  generatorVersion: '@openapitools/openapi-generator-cli',
};

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function downloadJson(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https:') ? https : http;

    client
      .get(url, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          try {
            const json = JSON.parse(data);
            resolve(json);
          } catch (error) {
            reject(new Error(`Failed to parse JSON: ${error.message}`));
          }
        });
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}

function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    log(`📁 Created directory: ${dirPath}`, colors.green);
  }
}

function writeJsonFile(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  log(`💾 Saved: ${filePath}`, colors.green);
}

function executeCommand(command, cwd = process.cwd()) {
  log(`🔧 Executing: ${command}`, colors.cyan);
  try {
    execSync(command, {
      cwd,
      stdio: 'inherit',
      env: {
        ...process.env,
        PATH:
          process.platform === 'darwin'
            ? `/opt/homebrew/opt/openjdk@17/bin:${process.env.PATH}`
            : process.env.PATH,
      },
    });
  } catch (error) {
    log(`❌ Command failed: ${command}`, colors.red);
    throw error;
  }
}

function generateClientCode(specFile, outputDir, clientName) {
  const command =
    `npx ${CONFIG.generatorVersion} generate ` +
    `-i ${specFile} ` +
    `-g typescript-axios ` +
    `-o ${outputDir} ` +
    `--additional-properties=withSeparateModelsAndApi=true,modelPackage=models,apiPackage=api,npmName=${clientName},npmVersion=1.0.0 ` +
    `--skip-validate-spec`;

  executeCommand(command);
}

async function main() {
  try {
    log('🚀 Starting Client Services Generation...', colors.bright);

    // Clean and create output directory
    if (fs.existsSync(CONFIG.outputDir)) {
      fs.rmSync(CONFIG.outputDir, { recursive: true, force: true });
      log(`🗑️  Cleaned existing directory: ${CONFIG.outputDir}`, colors.yellow);
    }
    ensureDirectoryExists(CONFIG.outputDir);

    // Create subdirectories
    const adminDir = path.join(CONFIG.outputDir, 'admin');
    const userDir = path.join(CONFIG.outputDir, 'user');
    ensureDirectoryExists(adminDir);
    ensureDirectoryExists(userDir);

    // Download OpenAPI specs
    log('📥 Downloading OpenAPI specifications...', colors.blue);

    const adminSpecUrl = `${CONFIG.serverUrl}${CONFIG.adminSpecUrl}`;
    const userSpecUrl = `${CONFIG.serverUrl}${CONFIG.userSpecUrl}`;

    log(`📡 Fetching admin spec from: ${adminSpecUrl}`, colors.cyan);
    const adminSpec = await downloadJson(adminSpecUrl);
    const adminSpecFile = path.join(adminDir, 'admin-spec.json');
    writeJsonFile(adminSpecFile, adminSpec);

    log(`📡 Fetching user spec from: ${userSpecUrl}`, colors.cyan);
    const userSpec = await downloadJson(userSpecUrl);
    const userSpecFile = path.join(userDir, 'user-spec.json');
    writeJsonFile(userSpecFile, userSpec);

    // Generate TypeScript clients
    log('⚙️  Generating TypeScript clients...', colors.blue);

    log('🔨 Generating Admin client...', colors.magenta);
    generateClientCode(adminSpecFile, adminDir, 'orion-chamber-admin-client');

    log('🔨 Generating User client...', colors.magenta);
    generateClientCode(userSpecFile, userDir, 'orion-chamber-user-client');

    // Clean up spec files
    fs.unlinkSync(adminSpecFile);
    fs.unlinkSync(userSpecFile);
    log('🧹 Cleaned up temporary spec files', colors.yellow);

    log('✅ Client services generated successfully!', colors.green);
    log('', colors.reset);
    log('📁 Generated structure:', colors.bright);
    log(`   ${CONFIG.outputDir}/`, colors.cyan);
    log(`   ├── admin/          # Admin API client`, colors.cyan);
    log(`   │   ├── api/         # API classes`, colors.cyan);
    log(`   │   └── models/      # Type definitions`, colors.cyan);
    log(`   └── user/           # User API client`, colors.cyan);
    log(`       ├── api/         # API classes`, colors.cyan);
    log(`       └── models/      # Type definitions`, colors.cyan);
    log('', colors.reset);
    log('🎉 Ready to use! Import the APIs you need:', colors.green);
    log(
      `   import { AuthApi, UsersApi } from './client-services/user';`,
      colors.cyan,
    );
    log(`   import { AdminApi } from './client-services/admin';`, colors.cyan);
  } catch (error) {
    log(`❌ Error: ${error.message}`, colors.red);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
}