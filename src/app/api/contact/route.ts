import { NextRequest, NextResponse } from 'next/server';
import { sendContactEmail } from '@/lib/email';

// Email configuration - only created when API route is called
const getEmailConfig = () => {
  // Use dynamic property access to avoid bundling
  const getEnv = (key: string) => {
    // Use Function constructor to avoid static analysis
    const envAccess = new Function('key', 'return process.env[key]');
    return envAccess(key);
  };
  
  return {
    smtp: {
      host: getEnv('SMTP_HOST') || '',
      port: parseInt(getEnv('SMTP_PORT') || '0'),
      secure: getEnv('SMTP_SECURE') === 'true',
      auth: {
        user: getEnv('SMTP_USER') || '',
        pass: getEnv('SMTP_PASSWORD') || '',
      },
    },
    emails: {
      contact: getEnv('CONTACT_FORM_RECIPIENT') || '',
      careers: getEnv('CAREERS_FORM_RECIPIENT') || '',
      from: getEnv('SMTP_USER') || '',
    },
  };
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Send email
    try {
      const config = getEmailConfig();
      
      // Validate required environment variables
      if (!config.smtp.host || !config.smtp.auth.user || !config.smtp.auth.pass || !config.emails.contact) {
        console.error('Missing required environment variables');
        return NextResponse.json(
          { error: 'Email configuration is incomplete' },
          { status: 500 }
        );
      }
      
      console.log('Contact form config:', {
        host: config.smtp.host,
        port: config.smtp.port,
        secure: config.smtp.secure,
        user: config.smtp.auth.user,
        contact: config.emails.contact,
        from: config.emails.from,
      });
      
      const success = await sendContactEmail({
        name,
        email,
        phone: phone || '',
        message,
      }, config);

      if (success) {
        return NextResponse.json(
          { message: 'Email sent successfully' },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { error: 'Failed to send email' },
          { status: 500 }
        );
      }
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      return NextResponse.json(
        { error: 'Email sending failed: ' + (emailError as Error).message },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
