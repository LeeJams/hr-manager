# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Expo React Native application called "Techmeet HR Manager" for comprehensive HR management. The project features:

- **Expo React Native App**: Cross-platform mobile application
- **Package**: `com.techmeet.hr_manager` (Android) / `com.techmeet.hr-manager` (iOS)
- **Target**: Android & iOS
- **Min SDK**: Android 6.0+ / iOS 12.0+
- **Framework**: Expo SDK 54

## Architecture

### Native React Native Architecture
- **React Native**: Core application logic and UI
- **Expo SDK**: Native functionality and services
- **TypeScript**: Type-safe development
- **Social Login**: Direct integration with platform SDKs

### Authentication
- **Kakao Login**: @react-native-seoul/kakao-login
- **Apple Login**: expo-apple-authentication
- **Email Login**: Custom implementation with JWT
- **Token Management**: expo-secure-store with auto-refresh

## Build Commands

### Development Commands
```bash
# Install dependencies
npm install

# Start development server
npx expo start

# Run on Android
npx expo run:android

# Run on iOS
npx expo run:ios

# Run on web
npx expo start --web

# Clear cache
npx expo start --clear

# Type checking
npx tsc --noEmit

# Lint code
npx eslint src/
```

### Build Commands
```bash
# Install EAS CLI
npm install -g @expo/eas-cli

# Build for development
eas build --platform all --profile development

# Build for production
eas build --platform all --profile production

# Submit to app stores
eas submit --platform all
```

## Project Structure

```
techmeet/
├── src/                    # Source code
│   ├── components/         # Reusable components
│   ├── screens/           # Screen components
│   ├── navigation/        # Navigation configuration
│   ├── contexts/          # React contexts
│   ├── services/          # API and authentication services
│   ├── utils/             # Utility functions
│   ├── types/             # TypeScript type definitions
│   └── constants/         # App constants
├── assets/                # Static assets
├── flutter_backup/        # Backup of original Flutter code
├── web/                   # Original Next.js web app (for reference)
├── app.json              # Expo configuration
├── package.json          # Dependencies
├── tsconfig.json         # TypeScript configuration
└── MIGRATION_BACKUP.md   # Migration reference
```

## Environment Setup

### Required Configuration
Update the following values in your codebase:

1. **Kakao App Key**: Replace `YOUR_KAKAO_NATIVE_APP_KEY` in:
   - `src/constants/index.ts`

2. **Google Client ID**: Replace `YOUR_GOOGLE_CLIENT_ID` in:
   - `src/services/authService.ts`

3. **API Base URL**: Update the development server URL in:
   - `src/services/api.ts`

### Environment Variables
Create environment configuration for different stages:
```bash
# Development
API_BASE_URL=http://localhost:3000/api

# Production
API_BASE_URL=https://your-api-domain.com/api
```

## Development Workflow

1. **Start Expo dev server**: `npx expo start`
2. **Use Expo Go app** or simulators for testing
3. **Test social login**: Use actual devices for best results
4. **API Integration**: Set up backend API server separately
5. **Debug**: Use React Native Debugger or Expo dev tools

## Database & Backend

The app expects a REST API backend with the following endpoints:
- `POST /auth/login` - Email/password login
- `POST /auth/social` - Social login
- `POST /auth/refresh` - Token refresh
- `GET /employees` - Get employees list
- `GET /attendance` - Get attendance records
- `GET /leaves` - Get leave requests

Consider using:
- **Supabase**: Full backend-as-a-service
- **Firebase**: Google's mobile platform
- **Custom Node.js/Express**: With Prisma ORM
- **NestJS**: Enterprise Node.js framework

## Dependencies

### Core Dependencies
- **@react-navigation/native**: Navigation framework
- **expo-auth-session**: OAuth authentication
- **expo-apple-authentication**: Apple Sign In
- **@react-native-seoul/kakao-login**: Kakao Login
- **expo-secure-store**: Secure storage
- **axios**: HTTP client
- **zustand**: State management (alternative to Redux)

### UI Dependencies
- **react-native-elements**: UI component library
- **react-hook-form**: Form management
- **react-native-vector-icons**: Icon library

### Development Dependencies
- **TypeScript**: Type safety
- **ESLint**: Code linting
- **Prettier**: Code formatting

## Migration Notes

This project was migrated from Flutter + Next.js hybrid to Expo React Native:
- Original Flutter code backed up in `flutter_backup/`
- Next.js web app preserved in `web/` for reference
- Migration details in `MIGRATION_BACKUP.md`

## Deployment

### EAS Build & Submit
1. Configure `eas.json` for build profiles
2. Set up Apple Developer and Google Play accounts
3. Configure app signing certificates
4. Build and submit using EAS CLI

### Over-the-Air Updates
- Use `expo-updates` for instant app updates
- Configure update channels for staging/production
- Publish updates with `eas update`