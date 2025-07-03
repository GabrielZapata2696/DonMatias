// Netlify deployment script
const exec = require('child_process').execSync;

// Build the project
exec('npm run build', { stdio: 'inherit' });

// Deploy to Netlify (ensure Netlify CLI is installed)
// Replace 'your-site-id' with your actual Netlify site ID
exec('npx netlify deploy --prod --dir=dist/brochure --message "Deploy after image optimization"', { stdio: 'inherit' });

console.log('Deployment complete!');
