# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Flutter-based cross-platform application called "techmeet" for HR management. The project consists of:

- **Flutter App**: Mobile wrapper with native social login
- **Next.js Web App**: Main application interface
- **Package**: `com.techmeet.hr_manager`
- **Target**: Android & iOS
- **Min SDK**: 24 (Android 7.0+) / iOS 12.0+

## Architecture

### Hybrid Architecture
- **Flutter Shell**: Handles native functionality (social login, webview)
- **Next.js Web App**: Core business logic and UI
- **Communication**: JavaScript bridge between Flutter and web

### Social Login
- **Kakao Login**: Flutter SDK → NextAuth.js
- **Apple Login**: Flutter SDK → NextAuth.js
- **Token Management**: Secure storage with auto-refresh

## Build Commands

### Flutter Commands
```bash
# Get dependencies
flutter pub get

# Run on device
flutter run

# Build APK
flutter build apk

# Build iOS
flutter build ios
```

### Web Commands (in /web directory)
```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
techmeet/
├── lib/                    # Flutter source code
│   ├── main.dart          # App entry point
│   ├── auth/              # Authentication logic
│   └── webview/           # WebView management
├── android/               # Android native code
├── ios/                   # iOS native code
├── web/                   # Next.js web application
│   ├── pages/             # Next.js pages
│   ├── components/        # React components
│   ├── contexts/          # React contexts
│   └── utils/             # Utility functions
├── assets/                # Flutter assets
└── pubspec.yaml          # Flutter dependencies
```

## Environment Setup

### Required Environment Variables (web/.env.local)
```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
KAKAO_CLIENT_ID=your-kakao-id
KAKAO_CLIENT_SECRET=your-kakao-secret
APPLE_CLIENT_ID=your-apple-id
APPLE_CLIENT_SECRET=your-apple-secret
DATABASE_URL=postgresql://...
```

### Replace Placeholder Values
1. **Kakao App Keys**: Replace `YOUR_KAKAO_NATIVE_APP_KEY` in:
   - `lib/main.dart`
   - `android/app/src/main/AndroidManifest.xml`
   - `ios/Runner/Info.plist`
   - `android/app/src/main/kotlin/.../MainActivity.kt`
   - `ios/Runner/AppDelegate.swift`

2. **Apple Configuration**: Set up Apple Developer account and configure Sign in with Apple

## Development Workflow

1. **Start Next.js dev server**: `cd web && npm run dev`
2. **Run Flutter app**: `flutter run`
3. **Test social login**: Use actual devices/emulators
4. **Debug WebView**: Use browser dev tools

## Dependencies

### Flutter (pubspec.yaml)
- flutter_inappwebview: WebView management
- kakao_flutter_sdk: Kakao social login
- sign_in_with_apple: Apple social login
- provider: State management
- shared_preferences: Local storage

### Next.js (web/package.json)
- next-auth: Authentication
- @mui/material: UI components
- react-hook-form: Form handling
- prisma: Database ORM