#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Building English version...');

// Temporarily modify package.json
const packageJsonPath = path.join(__dirname, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const originalMain = packageJson.main;

// Change main to English version
packageJson.main = 'app/main-en.js';
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

try {
    // Run electron-packager
    execSync('electron-packager . dev-log-creator-en --platform=win32 --arch=x64 --out=build/ --overwrite', {
        stdio: 'inherit'
    });
    console.log('✅ English version built successfully!');
} catch (error) {
    console.error('❌ Build failed:', error.message);
} finally {
    // Restore original package.json
    packageJson.main = originalMain;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log('📝 Package.json restored');
}
