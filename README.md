# Anoka Health Center Website

A modern, responsive website for Anoka Health Center, LLC, providing Adult Rehabilitative Mental Health Services (ARMHS).

## Features

- Responsive design that works on all devices
- Modern UI with smooth animations
- Contact form with email functionality
- Job application form with resume upload
- Detailed service information
- About page with company information
- Mobile-friendly navigation
- Email notifications for form submissions

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Nodemailer (Email functionality)

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up email configuration:
   ```bash
   cp .env.template .env.local
   # Edit .env.local with your email credentials
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Email Setup

For email functionality to work, you need to configure your email settings:

1. Copy `.env.template` to `.env.local`
2. Add your email credentials (see `EMAIL_SETUP.md` for detailed instructions)
3. For Gmail: Enable 2-factor authentication and generate an App Password
4. Test the contact form and careers application form

See `EMAIL_SETUP.md` for complete setup instructions.

## Project Structure

- `/src/app` - Next.js app router pages
- `/src/components` - Reusable React components
- `/public` - Static assets

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

The website can be deployed to any platform that supports Next.js applications, such as Vercel, Netlify, or AWS.

## Contact

For any questions or concerns, please contact:
- Phone: (612) 259-7803
- Address: 2021 E Hennepin Ave, Ste 475, Minneapolis, MN, 55413
