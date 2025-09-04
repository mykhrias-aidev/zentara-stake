const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Building static version for GitHub Pages...');

try {
  // Clean previous build
  if (fs.existsSync('out')) {
    fs.rmSync('out', { recursive: true, force: true });
  }
  
  // Build the project
  console.log('📦 Building Next.js project...');
  execSync('npm run build', { stdio: 'inherit' });
  
  // Export static files
  console.log('📤 Exporting static files...');
  execSync('npx next export', { stdio: 'inherit' });
  
  // Create .nojekyll file for GitHub Pages
  fs.writeFileSync('out/.nojekyll', '');
  
  console.log('✅ Static build completed successfully!');
  console.log('📁 Static files are in the "out" directory');
  console.log('🌐 Push the "out" directory to GitHub Pages');
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
