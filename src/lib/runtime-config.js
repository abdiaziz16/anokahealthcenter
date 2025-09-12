// Runtime configuration - not bundled, loaded at runtime
module.exports = {
  getEmailConfig: () => {
    const env = process.env;
    
    // No fallback values to avoid bundling
    return {
      smtp: {
        host: env.SMTP_HOST || '',
        port: parseInt(env.SMTP_PORT || '0'),
        secure: env.SMTP_SECURE === 'true',
        auth: {
          user: env.SMTP_USER || '',
          pass: env.SMTP_PASSWORD || '',
        },
      },
      emails: {
        contact: env.CONTACT_FORM_RECIPIENT || '',
        careers: env.CAREERS_FORM_RECIPIENT || '',
        from: env.SMTP_USER || '',
      },
    };
  }
};
