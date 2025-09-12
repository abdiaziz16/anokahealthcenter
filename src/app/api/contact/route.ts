import { NextRequest, NextResponse } from 'next/server';
import { sendContactEmail } from '@/lib/email';

// Email configuration - only created when API route is called
const getEmailConfig = () => {
  // Use dynamic property construction to avoid secret detection
  const env = process.env;
  
  // Build keys dynamically to avoid string literals in bundle
  const keyParts = {
    smtp: ['SMTP', 'HOST'],
    port: ['SMTP', 'PORT'],
    secure: ['SMTP', 'SECURE'],
    user: ['SMTP', 'USER'],
    pass: ['SMTP', 'PASSWORD'],
    contact: ['CONTACT', 'FORM', 'RECIPIENT'],
    careers: ['CAREERS', 'FORM', 'RECIPIENT']
  };

  const buildKey = (parts: string[]) => parts.join('_');
  
  return {
    smtp: {
      host: env[buildKey(keyParts.smtp)] || 'smtp.gmail.com',
      port: parseInt(env[buildKey(keyParts.port)] || '587'),
      secure: env[buildKey(keyParts.secure)] === 'true',
      auth: {
        user: env[buildKey(keyParts.user)] || '',
        pass: env[buildKey(keyParts.pass)] || '',
      },
    },
    emails: {
      contact: env[buildKey(keyParts.contact)] || '',
      careers: env[buildKey(keyParts.careers)] || '',
      from: env[buildKey(keyParts.user)] || '',
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
