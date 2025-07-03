// Netlify deployment script
const exec = require('child_process').execSync;

// Build the project
exec('npm run build', { stdio: 'inherit' });

// Deploy to Netlify (ensure Netlify CLI is installed)
// Replace 'your-site-id' with your actual Netlify site ID
// Note: Use 'dist/brochure/browser' as the publish directory for Angular 17+
exec('npx netlify deploy --prod --dir=dist/brochure/browser --message "Deploy after image optimization"', { stdio: 'inherit' });

console.log('Deployment complete!');
