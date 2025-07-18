# Security Guidelines for EmailJS Configuration

## Overview
This project uses EmailJS for contact form functionality. The configuration has been set up to use environment variables for security.

## Development Setup

### Local Development
Your development credentials are stored in `src/environments/environment.ts`. For local development, these values are included in the repository.

### Production Deployment
Production credentials should be stored in `src/environments/environment.prod.ts` and should **NOT** be committed to Git.

## Setting Up EmailJS Credentials

### 1. Development Environment
The development environment file (`src/environments/environment.ts`) contains your EmailJS credentials for local testing.

### 2. Production Environment
For production deployment:

1. Use the template file `src/environments/environment.prod.template.ts` as a reference
2. Update `src/environments/environment.prod.ts` with your actual production credentials
3. **Do not commit the production environment file with real credentials**

### 3. EmailJS Configuration
Your EmailJS credentials are located in:
- Service ID: Your EmailJS service identifier
- Template ID: Your EmailJS email template identifier  
- Public Key: Your EmailJS public key

## Security Best Practices

### What's Safe to Commit
- Template files with placeholder values
- Development environment files (if using non-production credentials)
- Configuration files that reference environment variables

### What Should NOT be Committed
- Production environment files with real credentials
- Any files containing actual EmailJS keys, IDs, or secrets
- Database connection strings
- API keys or tokens

### For Production Deployment
When deploying to production platforms (Netlify, Vercel, etc.):

1. Set environment variables in your hosting platform's dashboard
2. Use build-time environment variable substitution if available
3. Consider using CI/CD pipelines to inject credentials during deployment

## Environment Variables Structure

```typescript
emailjs: {
  serviceId: 'your_service_id',
  templateId: 'your_template_id', 
  publicKey: 'your_public_key'
}
```

## Testing Your Setup

1. Verify your EmailJS credentials in the EmailJS dashboard
2. Test the contact form in development mode
3. Ensure the template includes the required variables:
   - `{{from_name}}`
   - `{{from_email}}`
   - `{{subject}}`
   - `{{message}}`
   - `{{to_email}}`

## Troubleshooting

### Common Issues
- "Template ID not found" - Verify the template ID and ensure it's published
- "Service ID not found" - Check your service ID in the EmailJS dashboard
- "Invalid public key" - Confirm your public key is correct and active

### Debug Steps
1. Log into your EmailJS dashboard
2. Verify all IDs match your environment configuration
3. Test sending an email directly from the EmailJS dashboard
4. Check the browser console for detailed error messages
