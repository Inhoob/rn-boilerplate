#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const TEMPLATE_DIR = path.join(__dirname, '..', 'template');
const CURRENT_DIR = process.cwd();

function validateAppName(name) {
  if (!name || name.length === 0) {
    throw new Error('App name is required');
  }
  
  if (!/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(name)) {
    throw new Error('App name must start with a letter and contain only letters, numbers, hyphens, and underscores');
  }
  
  return true;
}

function createDirectoryIfNotExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function replaceTemplateVariables(content, appName, filePath) {
  // Generate package identifier
  const packageId = `com.anonymous.${appName}`;
  
  // Basic replacements
  content = content.replace(/boilerplate/g, appName);
  content = content.replace(/com\.anonymous\.boilerplate/g, packageId);
  
  // File-specific replacements
  const ext = path.extname(filePath);
  const basename = path.basename(filePath);
  
  if (basename === 'package.json') {
    // For package.json, also update the name field specifically
    try {
      const json = JSON.parse(content);
      json.name = appName;
      delete json.bin; // Remove bin field from generated project
      content = JSON.stringify(json, null, 2);
    } catch (e) {
      // If parsing fails, fall back to string replacement
      content = content.replace(/"name":\s*"[^"]*"/, `"name": "${appName}"`);
    }
  }
  
  if (basename === 'app.json') {
    // For app.json, update expo configuration
    try {
      const json = JSON.parse(content);
      if (json.expo) {
        json.expo.name = appName;
        json.expo.slug = appName;
        if (json.expo.ios && json.expo.ios.bundleIdentifier) {
          json.expo.ios.bundleIdentifier = packageId;
        }
        if (json.expo.android && json.expo.android.package) {
          json.expo.android.package = packageId;
        }
      }
      content = JSON.stringify(json, null, 2);
    } catch (e) {
      // If parsing fails, fall back to string replacement
    }
  }
  
  return content;
}

function copyDirectory(src, dest, appName, excludePatterns = []) {
  const stats = fs.statSync(src);
  
  if (stats.isDirectory()) {
    // Skip git and node_modules directories
    const basename = path.basename(src);
    if (basename === '.git' || basename === 'node_modules' || basename === '.expo') {
      return;
    }
    
    // Skip if matches exclude patterns
    if (excludePatterns.some(pattern => src.includes(pattern))) {
      return;
    }
    
    // Handle directory renaming
    let actualDest = dest;
    if (basename === 'boilerplate') {
      if (src.includes('/ios/') || src.includes('/android/')) {
        actualDest = path.join(path.dirname(dest), appName);
      }
    } else if (basename.includes('boilerplate')) {
      // Handle xcodeproj, xcworkspace, etc.
      const newBasename = basename.replace(/boilerplate/g, appName);
      actualDest = path.join(path.dirname(dest), newBasename);
    }
    
    createDirectoryIfNotExists(actualDest);
    
    const items = fs.readdirSync(src);
    items.forEach(item => {
      const srcPath = path.join(src, item);
      const destPath = path.join(actualDest, item);
      copyDirectory(srcPath, destPath, appName, excludePatterns);
    });
  } else {
    // Skip binary files and specific file types
    const ext = path.extname(src);
    const basename = path.basename(src);
    
    if (['.png', '.jpg', '.jpeg', '.gif', '.ico', '.keystore', '.jar', '.so', '.a'].includes(ext)) {
      // Copy binary files without modification
      fs.copyFileSync(src, dest);
    } else {
      // Copy and replace template variables in text files
      let content = fs.readFileSync(src, 'utf8');
      content = replaceTemplateVariables(content, appName, src);
      
      // Handle file renaming (e.g., boilerplate.xcodeproj -> appName.xcodeproj)
      let actualDest = dest;
      if (basename.includes('boilerplate')) {
        const newBasename = basename.replace(/boilerplate/g, appName);
        actualDest = path.join(path.dirname(dest), newBasename);
      }
      
      fs.writeFileSync(actualDest, content);
    }
  }
}


function initializeGitRepo(projectDir) {
  try {
    execSync('git init', { cwd: projectDir, stdio: 'inherit' });
    console.log('Git repository initialized');
  } catch (error) {
    console.warn('Failed to initialize git repository:', error.message);
  }
}

function createProject(appName) {
  validateAppName(appName);
  
  const projectDir = path.join(CURRENT_DIR, appName);
  
  if (fs.existsSync(projectDir)) {
    throw new Error(`Directory ${appName} already exists`);
  }
  
  console.log(`Creating React Native project: ${appName}`);
  
  // Copy template files
  const excludePatterns = [
    '.git',
    'node_modules',
    '.expo',
    'ios/build',
    'android/build',
    'ios/Pods',
    'bin',
    '.yarn/cache',
    '.yarn/install-state.gz',
    '.pnp.*'
  ];
  
  copyDirectory(TEMPLATE_DIR, projectDir, appName, excludePatterns);
  
  // Initialize git repository
  initializeGitRepo(projectDir);
  
  console.log(`\nSuccess! Created ${appName} at ${projectDir}`);
  console.log('\nNext steps:');
  console.log(`  cd ${appName}`);
  console.log('  npm install');
  console.log('  npm run ios     # to run on iOS');
  console.log('  npm run android # to run on Android');
}

function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('Usage: npx inhoob-rn-boilerplate new <app-name>');
    process.exit(1);
  }
  
  const command = args[0];
  const appName = args[1];
  
  if (command === 'new') {
    if (!appName) {
      console.error('App name is required');
      console.log('Usage: npx inhoob-rn-boilerplate new <app-name>');
      process.exit(1);
    }
    
    try {
      createProject(appName);
    } catch (error) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  } else {
    console.log('Unknown command:', command);
    console.log('Usage: npx inhoob-rn-boilerplate new <app-name>');
    process.exit(1);
  }
}

main();