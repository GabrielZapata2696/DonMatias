const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Deployment script for uploading images to Netlify
 * This script helps automate the process of deploying images to a separate Netlify site
 */

const config = {
  // Your Netlify site ID for the images site (replace with your actual site ID)
  netlifyImagesSiteId: 'your-netlify-images-site-id',
  
  // Local path to external images
  localImagesPath: './external-images',
  
  // Netlify CLI command template
  netlifyDeployCommand: 'npx netlify deploy --dir=external-images --prod --site=',
  
  // Environment file to update
  prodEnvironmentFile: './src/environments/environment.prod.ts'
};

async function deployImages() {
  try {
    console.log('🚀 Starting image deployment process...');
    
    // Check if external-images directory exists
    if (!fs.existsSync(config.localImagesPath)) {
      throw new Error(`External images directory not found: ${config.localImagesPath}`);
    }
    
    // Deploy to Netlify
    console.log('📤 Deploying images to Netlify...');
    const deployCommand = config.netlifyDeployCommand + config.netlifyImagesSiteId;
    
    console.log(`Running: ${deployCommand}`);
    execSync(deployCommand, { stdio: 'inherit' });
    
    console.log('✅ Images deployed successfully!');
    console.log('🔗 Your images are now available at your Netlify images site');
    
    // Remind user to update environment
    console.log('\n📝 Next steps:');
    console.log('1. Update your Netlify images site URL in environment.prod.ts');
    console.log('2. Test the production build to ensure all images load correctly');
    console.log('3. Deploy your main Angular app');
    
  } catch (error) {
    console.error('❌ Deployment failed:', error.message);
    process.exit(1);
  }
}

// Helper function to update environment file
function updateEnvironmentFile(newImageBaseUrl) {
  const envFile = config.prodEnvironmentFile;
  
  if (!fs.existsSync(envFile)) {
    console.warn(`Environment file not found: ${envFile}`);
    return;
  }
  
  let content = fs.readFileSync(envFile, 'utf8');
  
  // Replace the imageBaseUrl
  content = content.replace(
    /imageBaseUrl:\s*['"][^'"]*['"]/,
    `imageBaseUrl: '${newImageBaseUrl}'`
  );
  
  fs.writeFileSync(envFile, content);
  console.log(`✅ Updated ${envFile} with new image base URL`);
}

// Run deployment if script is executed directly
if (require.main === module) {
  deployImages();
}

module.exports = { deployImages, updateEnvironmentFile };
