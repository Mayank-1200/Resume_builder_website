# Authentication Setup Guide

This project uses a hybrid authentication system with both NextAuth.js (for Google OAuth) and custom JWT authentication (for email/password).

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

\`\`\`bash
# Database
DATABASE_URL="postgresql://username:password@host:port/database"

# NextAuth Configuration
NEXTAUTH_SECRET="your-nextauth-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# JWT Secret (for custom JWT authentication)
JWT_SECRET="your-jwt-secret-key-here"
\`\`\`

## Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to Credentials → Create Credentials → OAuth 2.0 Client IDs
5. Set the application type to "Web application"
6. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (for development)
   - `https://yourdomain.com/api/auth/callback/google` (for production)
7. Copy the Client ID and Client Secret to your `.env.local` file

## Database Setup

1. Make sure your Neon database is running and accessible
2. Run the Prisma migration:
   \`\`\`bash
   npx prisma migrate dev
   \`\`\`
3. Generate the Prisma client:
   \`\`\`bash
   npx prisma generate
   \`\`\`

## Features

### Email/Password Authentication
- Users can sign up with first name, last name, email, and password
- Passwords are hashed using bcrypt
- JWT tokens are generated for session management

### Google OAuth
- Users can sign in/sign up using their Google account
- Automatically creates user accounts in the database
- Integrates with NextAuth.js for secure OAuth flow

### Session Management
- Hybrid approach supporting both JWT and NextAuth sessions
- Automatic session detection and management
- Secure logout functionality

## API Endpoints

- `POST /api/signup` - User registration
- `POST /api/login` - User authentication
- `GET/POST /api/auth/[...nextauth]` - NextAuth.js endpoints

## Security Features

- Password hashing with bcrypt
- JWT token expiration (7 days)
- Input validation and sanitization
- Error handling without exposing sensitive information
- CSRF protection through NextAuth.js
