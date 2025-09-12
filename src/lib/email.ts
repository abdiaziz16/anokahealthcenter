import * as nodemailer from 'nodemailer';

// Email configuration - only used on server side
const getEmailConfig = () => ({
  smtp: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER!,
      pass: process.env.SMTP_PASSWORD!,
    },
  },
  emails: {
    contact: process.env.CONTACT_FORM_RECIPIENT!,
    careers: process.env.CAREERS_FORM_RECIPIENT!,
    from: process.env.SMTP_USER!,
  },
});

// Create transporter function to avoid loading env vars at module load time
const getTransporter = () => nodemailer.createTransport(getEmailConfig().smtp);

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface JobApplicationData {
  name: string;
  email: string;
  phone: string;
  position: string;
  resume: File;
}

// Send contact form email
export async function sendContactEmail(formData: ContactFormData): Promise<boolean> {
  try {
    const config = getEmailConfig();
    const mailOptions = {
      from: config.emails.from,
      to: config.emails.contact,
      replyTo: formData.email,
      subject: 'New Contact Form Submission - Anoka Health Center',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #00799F;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
          <p><strong>Message:</strong></p>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
            ${formData.message.replace(/\n/g, '<br>')}
          </div>
          <hr style="margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">
            This message was sent from the Anoka Health Center contact form.
          </p>
        </div>
      `,
    };

    await getTransporter().sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending contact email:', error);
    return false;
  }
}

// Send job application email
export async function sendJobApplicationEmail(formData: JobApplicationData, resumeBuffer: Buffer): Promise<boolean> {
  try {
    const config = getEmailConfig();
    const mailOptions = {
      from: config.emails.from,
      to: config.emails.careers,
      replyTo: formData.email,
      subject: `New Job Application - Anoka Health Center - ${formData.position}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #00799F;">New Job Application</h2>
          <p><strong>Position:</strong> ${formData.position}</p>
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Phone:</strong> ${formData.phone}</p>
          <hr style="margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">
            This application was submitted through the Anoka Health Center careers page.
            The resume is attached to this email.
          </p>
        </div>
      `,
      attachments: [
        {
          filename: `resume_${formData.name.replace(/\s+/g, '_')}.pdf`,
          content: resumeBuffer,
        },
      ],
    };

    await getTransporter().sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending job application email:', error);
    return false;
  }
}

// Test email configuration
export async function testEmailConfiguration(): Promise<boolean> {
  try {
    await getTransporter().verify();
    console.log('Email configuration is valid');
    return true;
  } catch (error) {
    console.error('Email configuration error:', error);
    return false;
  }
}
