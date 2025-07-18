export const environment = {
  production: false,
  // Using Netlify images URL for both development and production
  // This ensures images work consistently across environments
  imageBaseUrl: 'https://donmatias-external-images.netlify.app',
  
  // EmailJS Configuration
  emailjs: {
    serviceId: 'service_edt_donmatias',
    templateId: 'template_5peobdh',
    publicKey: 'Boa9tpr1hUd5XVK1G'
  }
};
