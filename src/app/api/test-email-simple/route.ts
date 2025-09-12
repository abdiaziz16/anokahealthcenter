import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function GET() {
  try {
    console.log('Testing email configuration...');
    
    const config = {
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER!,
        pass: process.env.SMTP_PASSWORD!,
      },
    };

    console.log('SMTP Config:', {
      host: config.host,
      port: config.port,
      secure: config.secure,
      user: config.auth.user,
      pass: config.auth.pass ? '***HIDDEN***' : 'NOT SET'
    });

    // Test connection
    const transporter = nodemailer.createTransport(config);
    await transporter.verify();
    
    console.log('✅ Email configuration is valid!');
    
    return NextResponse.json({
      success: true,
      message: 'Email configuration is working!',
      config: {
        host: config.host,
        port: config.port,
        secure: config.secure,
        user: config.auth.user
      }
    });
  } catch (error) {
    console.error('❌ Email test failed:', error);
    return NextResponse.json({
      success: false,
      message: 'Email test failed: ' + (error as Error).message,
      error: (error as Error).message
    });
  }
}
