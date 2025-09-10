// Email Configuration
// Add your email credentials here

export const emailConfig = {
  // SMTP Configuration
  smtp: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com', // Gmail SMTP server
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER || 'your-email@gmail.com', // Your email
      pass: process.env.EMAIL_PASSWORD || 'your-app-password', // Your app password
    },
  },
  
  // Email addresses
  emails: {
    // Main contact email (where contact form submissions go)
    contact: process.env.CONTACT_EMAIL || 'contact@anokahealthcenter.com',
    
    // Careers email (where job applications go)
    careers: process.env.CAREERS_EMAIL || 'careers@anokahealthcenter.com',
    
    // From email (sender address)
    from: process.env.FROM_EMAIL || 'noreply@anokahealthcenter.com',
  },
  
  // Email templates
  templates: {
    contact: {
      subject: 'New Contact Form Submission - Anoka Health Center',
      replyTo: 'contact@anokahealthcenter.com',
    },
    careers: {
      subject: 'New Job Application - Anoka Health Center',
      replyTo: 'careers@anokahealthcenter.com',
    },
  },
};

// Instructions for setup:
/*
1. For Gmail:
   - Enable 2-factor authentication
   - Generate an App Password: https://myaccount.google.com/apppasswords
   - Use the App Password (not your regular password) in EMAIL_PASSWORD

2. For other email providers:
   - Update SMTP_HOST and SMTP_PORT accordingly
   - Use your email provider's SMTP settings

3. Environment Variables (.env.local):
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   CONTACT_EMAIL=contact@anokahealthcenter.com
   CAREERS_EMAIL=careers@anokahealthcenter.com
   FROM_EMAIL=noreply@anokahealthcenter.com
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
*/
