// Email Configuration
// All email settings are loaded from environment variables
// No hardcoded values - all must be set in Netlify Dashboard or .env.local

export const emailConfig = {
  // SMTP Configuration
  smtp: {
    host: process.env.SMTP_HOST!,
    port: parseInt(process.env.SMTP_PORT!),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER!,
      pass: process.env.EMAIL_PASSWORD!,
    },
  },
  
  // Email addresses
  emails: {
    // Main contact email (where contact form submissions go)
    contact: process.env.CONTACT_EMAIL!,
    
    // Careers email (where job applications go)
    careers: process.env.CAREERS_EMAIL!,
    
    // From email (sender address)
    from: process.env.FROM_EMAIL!,
  },
  
  // Email templates
  templates: {
    contact: {
      subject: 'New Contact Form Submission - Anoka Health Center',
      replyTo: process.env.CONTACT_EMAIL!,
    },
    careers: {
      subject: 'New Job Application - Anoka Health Center',
      replyTo: process.env.CAREERS_EMAIL!,
    },
  },
};

// Instructions for setup:
/*
REQUIRED Environment Variables (set in Netlify Dashboard or .env.local):

1. For Gmail:
   - Enable 2-factor authentication
   - Generate an App Password: https://myaccount.google.com/apppasswords
   - Use the App Password (not your regular password) in EMAIL_PASSWORD

2. For other email providers:
   - Update SMTP_HOST and SMTP_PORT accordingly
   - Use your email provider's SMTP settings


Note: All environment variables are required. No fallback values are provided.
*/
