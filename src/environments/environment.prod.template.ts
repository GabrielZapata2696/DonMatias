export const environment = {
  production: true,
  imageBaseUrl: 'https://donmatias-external-images.netlify.app',
  
  // EmailJS Configuration - REPLACE WITH YOUR ACTUAL PRODUCTION VALUES
  // Get these from your EmailJS dashboard at https://www.emailjs.com/
  emailjs: {
    serviceId: 'YOUR_PRODUCTION_SERVICE_ID',
    templateId: 'YOUR_PRODUCTION_TEMPLATE_ID',
    publicKey: 'YOUR_PRODUCTION_PUBLIC_KEY'
  }
};

// Instructions for production deployment:
// 1. Copy this file to environment.prod.ts
// 2. Replace the placeholder values with your actual EmailJS credentials
// 3. Deploy to your hosting platform
// 4. The original environment.prod.ts file with real credentials should not be committed to Git
