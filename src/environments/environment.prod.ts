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

// IMPORTANT: Before deploying to production, replace the placeholder values above
// with your actual EmailJS credentials from https://www.emailjs.com/
