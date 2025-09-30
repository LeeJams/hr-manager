# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TechMeet HR Manager - Mobile-first HR management web application built with Next.js 15 (App Router), React 19, TypeScript, and TailwindCSS. Supports Blue-Green deployment strategy for zero-downtime deployments.

## Key Commands

### Development
```bash
npm run dev              # Start dev server (port 3000)
npm run dev:local        # Explicit development environment
```

### Build & Production
```bash
npm run build:local      # Build for development
npm run build:prod       # Build for production
npm run start:prod       # Start production server
npm run type-check       # TypeScript type checking
npm run lint             # ESLint code linting
```

### **⚠️ REQUIRED: Pre-Commit Checklist**
**ALWAYS run these 3 commands after making code changes:**
```bash
npm run type-check       # 1. Type checking
npm run lint             # 2. Linting (if configured)
npm run build            # 3. Production build test
```
If any of these fail, fix the errors before committing.

### Blue-Green Deployment
```bash
npm run deploy:blue      # Build for blue environment (port 3000)
npm run deploy:green     # Build for green environment (port 3001)
npm run health-check     # Health check default port
PORT=3001 npm run health-check  # Health check specific port
./scripts/deploy-blue-green.sh  # Automated blue-green deployment
```

## Architecture

### Environment Configuration
- **Singleton EnvironmentValidator** (`src/lib/env.ts`): Validates all required environment variables at runtime
- Server-side throws errors to prevent builds with missing vars
- Client-side logs warnings for missing vars
- All environment variables must be prefixed with `NEXT_PUBLIC_` to be accessible client-side

### Authentication & Social Login
- OAuth providers: Kakao, Google, Apple
- CI-based user verification flow:
  1. Check if user exists by CI (`/auth/check-ci`)
  2. Check email/phone availability (`/auth/check-email`, `/auth/check-phone`)
  3. Register new user (`/auth/signup`)
- API calls defined in `src/lib/api/auth.ts`
- Type definitions in `src/types/auth.ts`

### Mobile-First UI Architecture
- **MobileContainer**: Responsive wrapper component (max-width 480px mobile, 768px tablet)
- **BottomNav**: Fixed bottom navigation with 4 main sections (Home, Projects, Schedule, MyPage)
- App uses Next.js App Router for page structure
- TailwindCSS for styling with mobile breakpoints

### API Integration
- Axios for HTTP client
- API base URL: `process.env.NEXT_PUBLIC_API_BASE_URL` or `/api` fallback
- Note: `src/lib/api/auth.ts:13` uses `NEXT_PUBLIC_API_URL` (inconsistent with env.ts which uses `NEXT_PUBLIC_API_BASE_URL`)

### State Management
- **Zustand**: Global state management (no store files exist yet in codebase)
- **TanStack Query (React Query)**: Server state and data fetching (no query files exist yet)

### Pages Structure
- `/` - Landing/root page
- `/login` - Login page (modified, check git status)
- `/signup/terms` - Terms agreement page
- `/signup/register` - Registration form
- `/home` - Main home dashboard
- `/dashboard` - Admin dashboard
- `/employees` - Employee management
- `/attendance` - Attendance tracking
- `/projects` - Project management
- `/schedule` - Schedule management
- `/mypage` - User profile/settings

## Deployment Strategy

**Blue-Green Deployment**:
- Blue environment: Port 3000
- Green environment: Port 3001
- Automated script: `scripts/deploy-blue-green.sh`
- Health check script: `scripts/health-check.js`
- Set `DEPLOYMENT_ENV=blue` or `DEPLOYMENT_ENV=green` during build

## Required Environment Variables

All variables must be set or the app will fail to build:
- `NEXT_PUBLIC_APP_ENV` - development | production
- `NEXT_PUBLIC_API_BASE_URL` - API server URL
- `NEXT_PUBLIC_KAKAO_REST_API_KEY` - Kakao OAuth key
- `NEXT_PUBLIC_KAKAO_REDIRECT_URI` - Kakao redirect URL
- `NEXT_PUBLIC_GOOGLE_CLIENT_ID` - Google OAuth client ID
- `NEXT_PUBLIC_APPLE_CLIENT_ID` - Apple OAuth client ID

Optional deployment variables:
- `DEPLOYMENT_ENV` - blue | green
- `PORT` - Server port (default 3000)

## Important Implementation Notes

1. **Environment Variable Inconsistency**: The auth API client uses `NEXT_PUBLIC_API_URL` but the environment validator expects `NEXT_PUBLIC_API_BASE_URL`. When working with API integration, ensure consistency.

2. **Mobile-First Design**: All components should respect max-width constraints (480px mobile, 768px tablet). Use the `MobileContainer` wrapper for consistent layout.

3. **OAuth Flow**: The signup flow requires CI value from social login provider before registration. Always validate user existence before allowing signup.

4. **Type Safety**: All API requests/responses are strongly typed in `src/types/`. Always import and use these types.

5. **Image Optimization**: Next.js config enables AVIF and WebP formats. Use Next.js `<Image>` component for all images.

6. **Package Optimization**: `@tanstack/react-query` and `zustand` are configured for optimized imports in `next.config.ts`.

7. **Enum Imports**: When using TypeScript enums as values (not just types), import them without `import type`. Use `import { EnumName }` instead of `import type { EnumName }` to avoid "cannot be used as a value" errors.

8. **Freelancer Project Management**: This system is for freelancer project management. DO NOT implement attendance tracking features (clock-in/clock-out, vacation requests) as they are not needed for freelancers.