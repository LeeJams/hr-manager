# Techmeet HR Manager

인력관리를 위한 크로스플랫폼 하이브리드 앱입니다. Flutter로 개발된 네이티브 셸과 Next.js로 구현된 웹 애플리케이션을 결합한 구조입니다.

## 🚀 주요 기능

- **소셜 로그인**: 카카오톡, Apple 로그인 지원
- **인력 관리**: 직원 정보 등록 및 관리
- **업무 관리**: 업무 배정 및 진행상황 추적
- **통계 분석**: 인력 현황 및 성과 분석
- **크로스플랫폼**: Android, iOS 모두 지원

## 🏗 프로젝트 구조

```
techmeet/
├── lib/                    # Flutter 소스코드
│   ├── main.dart          # 앱 진입점
│   ├── auth/              # 인증 로직
│   │   ├── auth_provider.dart
│   │   └── login_screen.dart
│   └── webview/           # 웹뷰 관리
│       ├── webview_screen.dart
│       └── webview_config.dart
├── android/               # Android 네이티브 코드
├── ios/                   # iOS 네이티브 코드
├── web/                   # Next.js 웹 애플리케이션
│   ├── pages/             # 페이지 컴포넌트
│   │   ├── auth/          # 인증 페이지
│   │   └── dashboard.tsx  # 대시보드
│   ├── components/        # 재사용 컴포넌트
│   ├── contexts/          # React 컨텍스트
│   └── utils/             # 유틸리티 함수
└── backup_android/        # 기존 Android 프로젝트 백업
```

## 🛠 기술 스택

### Frontend
- **Flutter**: 모바일 네이티브 셸
- **Next.js**: 웹 애플리케이션 프레임워크
- **React**: UI 라이브러리
- **Material-UI**: UI 컴포넌트 라이브러리
- **TypeScript**: 타입 안전성

### Backend
- **NextAuth.js**: 인증 시스템
- **Prisma**: 데이터베이스 ORM
- **PostgreSQL**: 데이터베이스 (권장)

### Social Login
- **Kakao SDK**: 카카오톡 로그인
- **Apple Sign-In**: Apple 로그인

## 📋 사전 요구사항

- Flutter SDK (최신 버전)
- Node.js 18+
- Android Studio (Android 개발용)
- Xcode (iOS 개발용)
- PostgreSQL (또는 다른 데이터베이스)

## 🚀 설치 및 실행

### 1. 저장소 클론
```bash
git clone <repository-url>
cd techmeet
```

### 2. Flutter 의존성 설치
```bash
flutter pub get
```

### 3. Next.js 의존성 설치
```bash
cd web
npm install
```

### 4. 환경 변수 설정
```bash
cp web/.env.local.example web/.env.local
# 환경 변수 값들을 실제 값으로 수정
```

### 5. 소셜 로그인 설정

#### 카카오 로그인
1. [Kakao Developers](https://developers.kakao.com)에서 앱 등록
2. 다음 파일들에서 `YOUR_KAKAO_NATIVE_APP_KEY`를 실제 키로 교체:
   - `lib/main.dart`
   - `android/app/src/main/AndroidManifest.xml`
   - `ios/Runner/Info.plist`
   - `android/app/src/main/kotlin/com/techmeet/hr_manager/MainActivity.kt`
   - `ios/Runner/AppDelegate.swift`

#### Apple 로그인
1. Apple Developer 계정에서 Sign in with Apple 설정
2. `web/.env.local`에 Apple 클라이언트 정보 추가

### 6. 개발 서버 실행

#### Next.js 웹 서버 시작
```bash
cd web
npm run dev
```

#### Flutter 앱 실행
```bash
flutter run
```

## 🔧 설정 가이드

### 데이터베이스 설정
1. PostgreSQL 설치 및 데이터베이스 생성
2. `web/.env.local`에 DATABASE_URL 설정
3. Prisma 마이그레이션 실행:
```bash
cd web
npx prisma migrate dev
```

### 카카오 로그인 설정
1. 카카오 개발자 콘솔에서 플랫폼 추가:
   - Android: 패키지명 `com.techmeet.hr_manager`
   - iOS: 번들 ID `com.techmeet.hr_manager`
   - Web: 도메인 등록

### Apple 로그인 설정 (iOS만 해당)
1. Apple Developer 계정 필요
2. App ID에 Sign in with Apple 기능 활성화
3. Service ID 생성 및 설정

## 🏃‍♂️ 빌드 및 배포

### Android 빌드
```bash
flutter build apk --release
```

### iOS 빌드
```bash
flutter build ios --release
```

### 웹 빌드
```bash
cd web
npm run build
```

## 🔍 주요 파일 설명

- `lib/main.dart`: Flutter 앱의 진입점
- `lib/auth/auth_provider.dart`: 인증 상태 관리
- `lib/webview/webview_screen.dart`: 메인 웹뷰 화면
- `web/pages/auth/[...nextauth].ts`: NextAuth.js 설정
- `web/pages/auth/login.tsx`: 로그인 페이지
- `web/pages/dashboard.tsx`: 메인 대시보드

## 🤝 개발 워크플로우

1. Next.js 개발 서버 시작: `cd web && npm run dev`
2. Flutter 앱 실행: `flutter run`
3. 브라우저에서 웹 앱 테스트: `http://localhost:3000`
4. 모바일에서 앱 테스트: 에뮬레이터 또는 실제 기기

## 📱 테스트

### Flutter 테스트
```bash
flutter test
```

### Next.js 테스트
```bash
cd web
npm test
```

## 🐛 문제 해결

### 일반적인 문제들

1. **Flutter 의존성 오류**
   ```bash
   flutter clean
   flutter pub get
   ```

2. **iOS 빌드 오류**
   ```bash
   cd ios
   pod install
   ```

3. **Next.js 빌드 오류**
   ```bash
   cd web
   rm -rf node_modules package-lock.json
   npm install
   ```

### 로그 확인
- Flutter: `flutter logs`
- Next.js: 브라우저 개발자 도구 콘솔
- Android: Android Studio Logcat
- iOS: Xcode Console

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다.

## 🤝 기여하기

1. Fork 프로젝트
2. 기능 브랜치 생성 (`git checkout -b feature/AmazingFeature`)
3. 변경 사항 커밋 (`git commit -m 'Add some AmazingFeature'`)
4. 브랜치에 Push (`git push origin feature/AmazingFeature`)
5. Pull Request 생성

## 📞 지원

문제가 있거나 도움이 필요한 경우:
- Issues 탭에서 새 이슈 생성
- 문서를 참조하여 문제 해결 시도
- 개발팀에 연락

---

**Techmeet HR Manager** - 효율적인 인력관리의 시작