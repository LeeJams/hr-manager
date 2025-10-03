# Next.js 프로젝트 구조 개선 가이드

## 개요

주니어 개발자가 작성한 코드를 리팩토링하여 Next.js의 레이아웃 시스템을 제대로 활용하도록 개선했습니다.

## 문제점

### 기존 구조의 한계

```tsx
// src/app/attendance/page.tsx (개선 전)
import MainLayout from "@/components/layout/MainLayout";

export default function AttendancePage() {
  return (
    <MainLayout>
      {" "}
      {/* 모든 페이지에서 반복 */}
      {/* 페이지 콘텐츠 */}
    </MainLayout>
  );
}
```

**문제점:**

1. **반복적인 코드**: 모든 페이지에서 레이아웃 컴포넌트를 import하고 감싸야 함
2. **일관성 부족**: 개발자가 실수로 레이아웃을 빼먹거나 잘못된 레이아웃을 사용할 수 있음
3. **유지보수 어려움**: 레이아웃 변경 시 모든 페이지를 수정해야 함
4. **Next.js 기능 미활용**: App Router의 핵심 기능인 레이아웃 시스템을 전혀 사용하지 않음

## 해결 방법

### Next.js의 Route Groups와 Layout 활용

Next.js 13+ App Router는 파일 시스템 기반 라우팅에서 레이아웃을 자동으로 적용하는 기능을 제공합니다.

```
src/app/
├── (main)/              # Route Group: 메인 페이지들
│   ├── layout.tsx       # 이 그룹의 공통 레이아웃
│   ├── home/
│   ├── projects/
│   ├── schedule/
│   └── mypage/
│
└── (sub)/               # Route Group: 서브 페이지들
    ├── layout.tsx       # 이 그룹의 공통 레이아웃
    ├── mypage/
    │   ├── career/
    │   ├── profile/
    │   └── settings/
    ├── projects/[id]/
    └── schedule/event/[id]/
```

### Route Groups란?

- `(폴더명)` 형식으로 생성 (괄호 사용)
- URL 경로에 영향을 주지 않음
  - `(main)/home` → `/home`
  - `(sub)/mypage/career` → `/mypage/career`
- 서로 다른 레이아웃을 적용할 수 있는 논리적 그룹

## 개선된 구조

### 1. (main) 그룹 - 메인 네비게이션 페이지

```tsx
// src/app/(main)/layout.tsx
import MobileContainer from "@/components/MobileContainer";
import BottomNav from "@/components/BottomNav";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <MobileContainer>
      <div className="min-h-screen bg-light pb-16">
        <header className="bg-dark text-light px-6 py-4 sticky top-0 z-10">
          <h1 className="text-lg font-semibold">TechMeet</h1>
        </header>
        {children}
        <BottomNav /> {/* 하단 네비게이션 포함 */}
      </div>
    </MobileContainer>
  );
}
```

**특징:**

- 하단 네비게이션(`BottomNav`) 포함
- 단순한 고정 헤더 (TechMeet)
- 홈, 프로젝트 목록, 스케줄, 마이페이지 등에 적용

### 2. (sub) 그룹 - 상세/편집 페이지

```tsx
// src/app/(sub)/layout.tsx
"use client";

import { usePathname } from "next/navigation";
import MobileContainer from "@/components/MobileContainer";
import BackButton from "@/components/layout/BackButton";

const getPageTitle = (pathname: string): string => {
  const normalizedPath = pathname.replace(/\/\d+/g, "/:id");

  const exactMatch: Record<string, string> = {
    "/mypage/career/manage": "이력 관리",
    "/mypage/career/view": "이력 보기",
    "/mypage/profile/edit": "프로필 편집",
    "/projects/:id": "프로젝트 상세",
    // ...
  };

  return exactMatch[normalizedPath] || "TechMeet";
};

export default function MainLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const title = getPageTitle(pathname);

  return (
    <MobileContainer>
      <div className="min-h-screen bg-light pb-16">
        <header className="bg-dark text-light px-6 py-4 sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <BackButton /> {/* 뒤로 가기 버튼 포함 */}
            <h1 className="text-lg font-semibold">{title}</h1>
          </div>
        </header>
        {children}
      </div>
    </MobileContainer>
  );
}
```

**특징:**

- 뒤로 가기 버튼(`BackButton`) 포함
- 경로에 따른 동적 제목 표시
- 하단 네비게이션 없음 (상세 페이지에서 불필요)
- 동적 라우트(`[id]`) 지원

### 3. 개선된 페이지 코드

```tsx
// 이제 페이지는 순수한 콘텐츠만 작성
export default function SomePage() {
  return (
    <main className="p-6">
      {/* 레이아웃 걱정 없이 콘텐츠만 작성 */}
      <h2>페이지 제목</h2>
      <p>콘텐츠</p>
    </main>
  );
}
```

## 장점

### 1. 코드 간결성

- 각 페이지에서 레이아웃 import 및 래핑 불필요
- 페이지는 순수한 콘텐츠에만 집중

### 2. 유지보수성

- 레이아웃 변경 시 `layout.tsx` 파일 하나만 수정
- 모든 하위 페이지에 자동 적용

### 3. 일관성

- 같은 그룹의 모든 페이지가 동일한 레이아웃 사용 보장
- 실수로 레이아웃을 빼먹거나 잘못 사용할 가능성 제거

### 4. 성능 최적화

- Next.js가 레이아웃을 자동으로 캐싱
- 페이지 전환 시 레이아웃은 리렌더링되지 않음
- 부드러운 페이지 전환 경험

### 5. 타입 안전성

```tsx
// layout.tsx의 children은 자동으로 타입 추론
export default function Layout({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}
```

## Before & After 비교

### Before (기존 방식)

```tsx
// 모든 페이지에서 반복
import MainLayout from "@/components/layout/MainLayout";

export default function Page1() {
  return (
    <MainLayout
      showHeader={true}
      showBackButton={false}
      headerTitle="페이지 1"
      showBottomNav={true}
    >
      <div>콘텐츠</div>
    </MainLayout>
  );
}

export default function Page2() {
  return (
    <MainLayout
      showHeader={true}
      showBackButton={true}
      headerTitle="페이지 2"
      showBottomNav={false}
    >
      <div>콘텐츠</div>
    </MainLayout>
  );
}
```

**문제:**

- 반복적인 props 전달
- 레이아웃 로직이 페이지에 분산
- 실수하기 쉬움

### After (개선된 방식)

```tsx
// (main) 그룹의 페이지
export default function Page1() {
  return <div>콘텐츠</div>; // 자동으로 BottomNav 포함
}

// (sub) 그룹의 페이지
export default function Page2() {
  return <div>콘텐츠</div>; // 자동으로 BackButton 포함
}
```

**장점:**

- 깨끗하고 간결한 코드
- 레이아웃 로직이 한 곳에 집중
- 실수할 여지 없음

## 추가 개선 가능 사항

### 1. Nested Layouts

더 세밀한 레이아웃 제어가 필요하다면:

```
(sub)/
├── layout.tsx           # 공통 레이아웃
└── mypage/
    ├── layout.tsx       # mypage 전용 추가 레이아웃
    └── career/
        └── page.tsx
```

### 2. Loading & Error States

```tsx
// (main)/loading.tsx
export default function Loading() {
  return <div>로딩 중...</div>;
}

// (main)/error.tsx
export default function Error({ error, reset }) {
  return <div>에러 발생: {error.message}</div>;
}
```

### 3. Metadata

```tsx
// (main)/layout.tsx
export const metadata = {
  title: "TechMeet - 메인",
  description: "HR 관리 시스템",
};
```

## 결론

Next.js의 레이아웃 시스템을 활용하면:

- ✅ 코드 중복 제거
- ✅ 유지보수 편의성 향상
- ✅ 실수 방지
- ✅ 성능 최적화
- ✅ 더 나은 개발자 경험

컴포넌트로 레이아웃을 만들어 각 페이지에서 import하는 것보다, **파일 시스템 기반의 레이아웃 시스템**을 사용하는 것이 Next.js의 철학에 부합하며 더 효율적입니다.
