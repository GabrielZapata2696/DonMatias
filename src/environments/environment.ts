export const environment = {
  production: false,
  // Using Netlify images URL for both development and production
  // This ensures images work consistently across environments
  imageBaseUrl: 'https://donmatias-external-images.netlify.app',
  
  // EmailJS Configuration
  emailjs: {
    
        serviceId: 'YOUR_PRODUCTION_SERVICE_ID',
    templateId: 'YOUR_PRODUCTION_TEMPLATE_ID',
    publicKey: 'YOUR_PRODUCTION_PUBLIC_KEY'
  }
};
// serviceId: 'service_edt_donmatias',
    // templateId: 'template_5peobdh',
    // publicKey: 'Boa9tpr1hUd5XVK1G'
