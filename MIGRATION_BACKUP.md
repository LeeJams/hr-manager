# Flutter to Expo React Native Migration Backup

## 원본 프로젝트 정보
- **앱 이름**: techmeet
- **패키지명**: com.techmeet.hr_manager
- **버전**: 1.0.0+1
- **설명**: techmeet 인력관리 애플리케이션

## 주요 기능 정보
### 소셜 로그인
- **카카오 로그인**: kakao_flutter_sdk ^1.9.1
- **애플 로그인**: sign_in_with_apple ^6.1.0

### 핵심 의존성
- flutter_inappwebview: ^6.0.0 (WebView)
- provider: ^6.1.1 (상태관리)
- shared_preferences: ^2.2.2 (로컬 저장소)
- flutter_secure_storage: ^9.0.0 (보안 저장소)
- http: ^1.1.0, dio: ^5.3.4 (네트워킹)

### 웹 앱 의존성 (Next.js)
- next-auth: ^4.24.0 (인증)
- @mui/material: ^5.15.0 (UI)
- prisma: ^5.7.0 (데이터베이스 ORM)
- react-hook-form: ^7.48.0 (폼 관리)

## 환경 변수 (web/.env.local)
```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
KAKAO_CLIENT_ID=your-kakao-id
KAKAO_CLIENT_SECRET=your-kakao-secret
APPLE_CLIENT_ID=your-apple-id
APPLE_CLIENT_SECRET=your-apple-secret
DATABASE_URL="file:./prisma/dev.db"
JWT_SECRET=your-jwt-secret-key-here
```

## 마이그레이션 매핑
### Flutter → React Native
- flutter_inappwebview → React Navigation
- provider → Zustand 또는 React Context
- shared_preferences → @react-native-async-storage/async-storage
- flutter_secure_storage → expo-secure-store
- kakao_flutter_sdk → @react-native-seoul/kakao-login
- sign_in_with_apple → expo-apple-authentication

### Next.js → React Native
- next-auth → expo-auth-session + 자체 JWT 관리
- @mui/material → react-native-elements 또는 NativeBase
- react-hook-form → react-hook-form (동일)
- prisma → 별도 백엔드 서버 또는 Supabase

## 백업 완료 날짜
2025-09-29