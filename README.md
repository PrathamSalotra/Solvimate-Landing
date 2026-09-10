# Solvimate

Solvimate is a Next.js application for translation, transcription, dubbing, certificate verification, careers, and admin content operations.

## Requirements

- Node.js 20.9 or later
- npm 10 or later
- MongoDB database

Optional services are required for specific features:

- Cloudinary for certificate asset uploads
- Resend for admin OTP and email notifications

## Clone And Install

```bash
git clone https://github.com/PrathamSalotra/Solvimate-Landing.git
cd Solvimate-Landing
npm install
```

## Environment Setup

Create a local environment file:

```bash
Copy-Item .env.local.example .env.local
```

On macOS or Linux, use:

```bash
cp .env.local.example .env.local
```

Open `.env.local` and configure the following values:

```env
# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/solvimate

# NextAuth
NEXTAUTH_SECRET=replace-with-a-long-random-secret

# Cloudinary, used for certificate uploads
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret

# Resend, used for admin OTP and email notifications
RESEND_API_KEY=re_your_resend_api_key
RESEND_FROM_EMAIL=Solvimate <operations@solvimate.com>
RESEND_CONTACT_EMAIL=your-inbox@example.com
```

Never commit `.env.local` or expose service-role, database, Cloudinary secret, Resend, or NextAuth credentials in client-side code.

## Run Locally

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Useful routes include:

- `/` - public landing page
- `/careers` - active job and internship openings
- `/verify-certificate` - certificate verification form
- `/admin/login` - admin login
- `/admin/dashboard` - admin dashboard
- `/admin/certificates` - certificate management
- `/admin/cms` - content management
- `/admin/analytics` - certificate analytics
- `/admin/settings` - admin session and access settings

## Available Scripts

```bash
npm run dev          # Start the development server
npm run build        # Create a production build
npm run start        # Start the production server
npm run lint         # Run ESLint
npm run format       # Format the repository with Prettier
npm run format:check # Check formatting without changing files
```

## Production Run

Build and start the application with:

```bash
npm run build
npm run start
```

The production server uses the environment variables from `.env.local` or the hosting provider's environment configuration.

## Project Structure

```text
src/
  app/                 Next.js App Router pages and API routes
  components/          Public page components
  features/            Admin and feature-specific components
  models/              MongoDB/Mongoose models
  services/            Database and business logic services
  context/             Theme, language, and toast providers
  lib/                 Auth, database, storage, and utility helpers
public/                Static assets
```

## Troubleshooting

### MongoDB connection errors

Check that `MONGODB_URI` is set, the MongoDB user has access to the database, and your IP address is allowed by the MongoDB network rules.

### Admin OTP emails are not sent

Check `RESEND_API_KEY` and `RESEND_FROM_EMAIL`. In development, verify that the configured sender is permitted by Resend.

### Certificate uploads fail

Check all three Cloudinary variables and confirm that the Cloudinary account is active.

### Port 3000 is already in use

Run Next.js on another port:

```bash
npm run dev -- -p 3001
```
