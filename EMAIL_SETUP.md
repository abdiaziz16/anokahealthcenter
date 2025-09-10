# Email Setup Instructions

This guide will help you configure email functionality for your Anoka Health Center website.

## 📧 Email Configuration

### 1. Install Dependencies

First, install the required email dependencies:

```bash
npm install
```

### 2. Create Environment File

Create a `.env.local` file in your project root with the following content:

```env
# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
CONTACT_EMAIL=contact@anokahealthcenter.com
CAREERS_EMAIL=careers@anokahealthcenter.com
FROM_EMAIL=noreply@anokahealthcenter.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
```

### 3. Gmail Setup (Recommended)

#### Step 1: Enable 2-Factor Authentication
1. Go to your [Google Account settings](https://myaccount.google.com/)
2. Navigate to "Security"
3. Enable "2-Step Verification"

#### Step 2: Generate App Password
1. Go to [App Passwords](https://myaccount.google.com/apppasswords)
2. Select "Mail" as the app
3. Generate a 16-character password
4. Copy this password and use it as `EMAIL_PASSWORD` in your `.env.local`

#### Step 3: Update Configuration
Replace the following in your `.env.local`:
- `your-email@gmail.com` → Your actual Gmail address
- `your-app-password` → The 16-character app password from step 2
- Update the contact emails to your preferred addresses

### 4. Alternative Email Providers

If you prefer to use a different email provider, update the SMTP settings:

#### Outlook/Hotmail
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
```

#### Yahoo
```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
```

#### Custom SMTP
```env
SMTP_HOST=your-smtp-server.com
SMTP_PORT=587
```

### 5. Test Email Configuration

You can test your email setup by:

1. Starting your development server: `npm run dev`
2. Going to your contact form
3. Submitting a test message
4. Checking if you receive the email

## 🔧 Configuration Files

### Email Config (`config/email.config.ts`)
This file contains all email settings and templates. You can customize:
- Email templates
- SMTP settings
- Email addresses

### API Routes
- `/api/contact` - Handles contact form submissions
- `/api/careers` - Handles job application submissions

## 📝 Email Templates

The system sends formatted HTML emails with:
- **Contact Form**: Name, email, phone, and message
- **Job Applications**: Position, applicant details, and attached resume

## 🚨 Security Notes

1. **Never commit `.env.local`** to version control
2. **Use App Passwords** instead of your regular email password
3. **Keep your credentials secure**
4. **Test in development** before deploying to production

## 🐛 Troubleshooting

### Common Issues:

1. **"Invalid login" error**
   - Make sure you're using an App Password, not your regular password
   - Verify 2-factor authentication is enabled

2. **"Connection timeout" error**
   - Check your internet connection
   - Verify SMTP host and port settings

3. **"Authentication failed" error**
   - Double-check your email and password
   - Ensure the email account exists and is active

4. **Emails not received**
   - Check spam/junk folders
   - Verify the recipient email addresses are correct

### Testing Commands:

```bash
# Test email configuration
npm run dev
# Then visit: http://localhost:3000 and test the contact form
```

## 📞 Support

If you encounter issues:
1. Check the browser console for errors
2. Check the server logs in your terminal
3. Verify your `.env.local` file is correctly formatted
4. Test with a simple email first

## 🎯 Next Steps

Once email is working:
1. Test both contact and careers forms
2. Customize email templates if needed
3. Set up email monitoring/alerts
4. Consider adding email confirmation to users
