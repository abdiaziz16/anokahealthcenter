import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function GET() {
  try {
    console.log('Testing email configuration with detailed output...');
    
    // Check environment variables
    const smtpConfig = {
      host: process.env.SMTP_HOST || 'NOT SET',
      port: parseInt(process.env.SMTP_PORT || '0'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER || 'NOT SET',
        pass: process.env.SMTP_PASSWORD || 'NOT SET',
      },
    };

    console.log('SMTP Config:', {
      host: smtpConfig.host,
      port: smtpConfig.port,
      secure: smtpConfig.secure,
      auth: {
        user: smtpConfig.auth.user,
        pass: smtpConfig.auth.pass ? '***HIDDEN***' : 'NOT SET'
      }
    });

    // Check if we have placeholder values
    const hasPlaceholders = 
      smtpConfig.auth.user === 'your-email@gmail.com' ||
      smtpConfig.auth.pass === 'your-app-password' ||
      smtpConfig.auth.user === 'NOT SET' ||
      smtpConfig.auth.pass === 'NOT SET';

    if (hasPlaceholders) {
      return NextResponse.json({
        success: false,
        message: 'Email configuration has placeholder values. Please update your .env.local file with real credentials.',
        details: {
          smtpConfig: {
            host: smtpConfig.host,
            port: smtpConfig.port,
            secure: smtpConfig.secure,
            auth: {
              user: smtpConfig.auth.user,
              pass: smtpConfig.auth.pass ? '***HIDDEN***' : 'NOT SET'
            }
          },
          instructions: [
            '1. Update SMTP_USER with your actual email address',
            '2. Update SMTP_PASSWORD with your actual password or app password',
            '3. Update CONTACT_FORM_RECIPIENT and CAREERS_FORM_RECIPIENT with real email addresses',
            '4. For Gmail: Enable 2FA and use an App Password'
          ]
        },
        timestamp: new Date().toISOString()
      });
    }

    // Try to create transporter
    const transporter = nodemailer.createTransport(smtpConfig);

    // Test connection
    await transporter.verify();
    
    return NextResponse.json({
      success: true,
      message: 'Email configuration is working properly!',
      details: {
        smtpConfig: {
          host: smtpConfig.host,
          port: smtpConfig.port,
          secure: smtpConfig.secure,
          auth: {
            user: smtpConfig.auth.user,
            pass: '***HIDDEN***'
          }
        }
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Email test error:', error);
    return NextResponse.json({
      success: false,
      message: 'Email configuration test failed: ' + (error as Error).message,
      details: {
        error: (error as Error).message,
        stack: (error as Error).stack
      },
      timestamp: new Date().toISOString()
    });
  }
}
