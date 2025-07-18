// Test EmailJS Configuration for Debugging
// Use this to test your EmailJS setup step by step

export const EMAILJS_TEST_CONFIG = {
  // Step 1: Test with these placeholder values first
  SERVICE_ID: 'YOUR_SERVICE_ID', // Replace with actual service ID
  TEMPLATE_ID: 'YOUR_TEMPLATE_ID', // Replace with actual template ID
  PUBLIC_KEY: 'YOUR_PUBLIC_KEY' // Replace with actual public key
};

// Steps to debug:
// 1. Log into https://www.emailjs.com/
// 2. Go to Email Services and copy your Service ID
// 3. Go to Email Templates and copy your Template ID
// 4. Go to Integration and copy your Public Key
// 5. Make sure your template is PUBLISHED (not in draft mode)

// Common template variables that should be in your EmailJS template:
// {{from_name}} - The sender's name
// {{from_email}} - The sender's email
// {{subject}} - The email subject
// {{message}} - The email message content
// {{to_email}} - The recipient email (usually your business email)

// Template example for EmailJS:
/*
Subject: New Contact Form Submission - {{subject}}

From: {{from_name}} <{{from_email}}>
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from your website contact form.
*/
