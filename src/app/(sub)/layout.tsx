"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import MobileContainer from "@/components/MobileContainer";
import BackButton from "@/components/layout/BackButton";

// 경로별 헤더명 매핑
const getPageTitle = (pathname: string): string => {
  // 숫자 ID를 :id로 치환
  const normalizedPath = pathname.replace(/\/\d+/g, "/:id");

  // 정확한 매칭 (동적 라우트 포함)
  const exactMatch: Record<string, string> = {
    "/mypage/career/manage": "이력 관리",
    "/mypage/career/view": "이력 보기",
    "/mypage/career": "이력",
    "/mypage/profile/edit": "프로필 편집",
    "/mypage/settings": "설정",
    "/mypage/career/manage/certificate/add": "자격증 추가",
    "/mypage/career/manage/certificate/edit/:id": "자격증 수정",
    "/mypage/career/manage/company/add": "이력 추가",
    "/mypage/career/manage/company/edit/:id": "이력 수정",
    "/mypage/career/manage/education/add": "학력 추가",
    "/mypage/career/manage/education/edit/:id": "학력 수정",
    "/mypage/career/manage/project/add": "프로젝트 추가",
    "/mypage/career/manage/project/edit/:id": "프로젝트 수정",
    "/projects/:id": "프로젝트 상세",
    "/schedule/event/:id": "일정 상세",
  };

  // 기본값
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
            <BackButton />
            <h1 className="text-lg font-semibold">{title}</h1>
          </div>
        </header>
        {children}
      </div>
    </MobileContainer>
  );
}
