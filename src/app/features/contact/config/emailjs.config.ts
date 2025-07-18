import { environment } from '../../../../environments/environment';

// EmailJS Configuration
// This configuration now uses environment variables for security
// The actual credentials are stored in environment files

export const EMAILJS_CONFIG = {
  SERVICE_ID: environment.emailjs.serviceId,
  TEMPLATE_ID: environment.emailjs.templateId,
  PUBLIC_KEY: environment.emailjs.publicKey
};

// Environment files location:
// - Development: src/environments/environment.ts
// - Production: src/environments/environment.prod.ts

// Sample email template parameters for reference:
// {{from_name}} - Sender's name
// {{from_email}} - Sender's email
// {{subject}} - Email subject
// {{message}} - Email message
// {{to_email}} - Recipient email
