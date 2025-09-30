# TechMeet HR Manager

모바일 중심의 인사 관리 웹 애플리케이션

## 🚀 시작하기

### 환경 설정

1. 환경 변수 파일 설정

```bash
# 개발 환경
cp .env.example .env.local
# .env.local 파일을 수정하여 로컬 개발 환경 설정

# 운영 환경
# .env.production 파일에 운영 환경 변수 설정
```

2. 의존성 설치

```bash
npm install
```

### 개발

```bash
# 개발 서버 실행 (기본 포트 3000)
npm run dev

# 또는 명시적으로 개발 환경으로 실행
npm run dev:local
```

### 빌드

```bash
# 개발 환경 빌드
npm run build:local

# 운영 환경 빌드
npm run build:prod

# 타입 체크
npm run type-check

# 린트 체크
npm run lint
```

## 🔵🟢 Blue-Green 배포

이 프로젝트는 Blue-Green 배포 전략을 사용하여 무중단 배포를 지원합니다.

### 배포 방법

#### 자동 배포 (권장)

```bash
# Blue-Green 자동 배포 스크립트 실행
./scripts/deploy-blue-green.sh

# 또는 현재 환경 지정
CURRENT_ENV=blue ./scripts/deploy-blue-green.sh
```

배포 스크립트는 다음을 자동으로 수행합니다:
1. 비활성 환경(blue 또는 green)으로 새 버전 빌드
2. 헬스 체크 실행
3. 성공 시 트래픽 전환
4. 이전 환경 정리

#### 수동 배포

```bash
# Blue 환경 배포
npm run deploy:blue
PORT=3000 npm run start:prod

# Green 환경 배포
npm run deploy:green
PORT=3001 npm run start:prod
```

### 헬스 체크

```bash
# 기본 포트(3000) 헬스 체크
npm run health-check

# 특정 포트 헬스 체크
PORT=3001 npm run health-check
```

### 배포 환경 구성

- **Blue Environment**: 포트 3000
- **Green Environment**: 포트 3001
- 각 환경은 독립적으로 실행되며, 로드밸런서를 통해 트래픽 전환

### 롤백

문제 발생 시 이전 환경으로 즉시 롤백:

```bash
# 현재 활성 환경을 반대로 설정하여 재배포
CURRENT_ENV=green ./scripts/deploy-blue-green.sh
```

## 📁 프로젝트 구조

```
hr-manager-flutter/
├── src/
│   ├── app/              # Next.js App Router 페이지
│   ├── components/       # 재사용 가능한 컴포넌트
│   ├── lib/             # 유틸리티 및 헬퍼 함수
│   ├── styles/          # 전역 스타일
│   └── types/           # TypeScript 타입 정의
├── public/              # 정적 파일
├── scripts/             # 배포 및 유틸리티 스크립트
├── .env.example         # 환경 변수 템플릿
├── .env.local           # 로컬 개발 환경 변수 (git ignored)
└── .env.production      # 운영 환경 변수 (git tracked)
```

## 🛠 기술 스택

- **Framework**: Next.js 15.5.4 (App Router)
- **UI**: React 19, TailwindCSS
- **Language**: TypeScript 5.7
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **HTTP Client**: Axios

## 📝 환경 변수

### 필수 환경 변수

| 변수명 | 설명 | 예시 |
|--------|------|------|
| `NEXT_PUBLIC_APP_ENV` | 애플리케이션 환경 | development, production |
| `NEXT_PUBLIC_API_BASE_URL` | API 서버 주소 | http://localhost:4000/api |
| `NEXT_PUBLIC_KAKAO_REST_API_KEY` | 카카오 OAuth REST API 키 | - |
| `NEXT_PUBLIC_KAKAO_REDIRECT_URI` | 카카오 OAuth 리다이렉트 URI | - |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | 구글 OAuth 클라이언트 ID | - |
| `NEXT_PUBLIC_APPLE_CLIENT_ID` | 애플 OAuth 클라이언트 ID | - |

### 배포 관련 환경 변수

| 변수명 | 설명 | 예시 |
|--------|------|------|
| `DEPLOYMENT_ENV` | 배포 환경 (Blue-Green) | blue, green |
| `PORT` | 서버 포트 | 3000, 3001 |

## 📱 주요 기능

- ✅ 소셜 로그인 (카카오, 구글, 애플)
- ✅ 직원 관리
- ✅ 근태 관리
- ✅ 프로젝트 관리
- ✅ 일정 관리
- ✅ 무중단 Blue-Green 배포

## 🔒 보안

- 민감한 환경 변수는 `.env.local`에 저장 (git에 커밋되지 않음)
- 운영 환경 변수는 `.env.production`에 저장 (배포 시 필요)
- 모든 환경 변수는 런타임에 검증됨

## 📦 빌드 최적화

- SWC 컴파일러 사용 (기본 활성화)
- 이미지 최적화 (AVIF, WebP)
- 패키지 임포트 최적화 (React Query, Zustand)
- Gzip 압축 활성화

## 🤝 기여

1. 이 저장소를 포크합니다
2. 기능 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋합니다 (`git commit -m 'Add amazing feature'`)
4. 브랜치에 푸시합니다 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성합니다

## 📄 라이선스

Private Project - TechMeet © 2025