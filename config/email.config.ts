// Email Configuration
// All email settings are loaded from environment variables
// No hardcoded values - all must be set in Netlify Dashboard or .env.local

export const emailConfig = {
  // SMTP Configuration
  smtp: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER!,
      pass: process.env.SMTP_PASSWORD!,
    },
  },
  
  // Email addresses
  emails: {
    // Main contact email (where contact form submissions go)
    contact: process.env.CONTACT_FORM_RECIPIENT!,
    
    // Careers email (where job applications go)
    careers: process.env.CAREERS_FORM_RECIPIENT!,
    
    // From email (sender address)
    from: process.env.SMTP_USER!,
  },
  
  // Email templates
  templates: {
    contact: {
      subject: 'New Contact Form Submission - Anoka Health Center',
      replyTo: process.env.CONTACT_FORM_RECIPIENT!,
    },
    careers: {
      subject: 'New Job Application - Anoka Health Center',
      replyTo: process.env.CAREERS_FORM_RECIPIENT!,
    },
  },
};

// Instructions for setup:
/*
REQUIRED Environment Variables (set in Netlify Dashboard or .env.local):

1. SMTP Configuration:
   - SMTP_HOST (e.g., smtp.gmail.com)
   - SMTP_PORT (e.g., 587)
   - SMTP_SECURE (true for 465, false for other ports)
   - SMTP_USER (your email address)
   - SMTP_PASSWORD (your email password or app password)

2. Email Recipients:
   - CONTACT_FORM_RECIPIENT (where contact form submissions go)
   - CAREERS_FORM_RECIPIENT (where job applications go)

3. For Gmail:
   - Enable 2-factor authentication
   - Generate an App Password: https://myaccount.google.com/apppasswords
   - Use the App Password (not your regular password) in SMTP_PASSWORD

4. For other email providers:
   - Update SMTP_HOST and SMTP_PORT accordingly
   - Use your email provider's SMTP settings

Note: All environment variables are required for production. Default values are provided for development.
*/
