'use client'

import BottomNav from '@/components/BottomNav'
import MobileContainer from '@/components/MobileContainer'

export default function HomePage() {
  return (
    <MobileContainer>
      <div className="min-h-screen bg-light pb-16">
      {/* 헤더 */}
      <header className="bg-dark text-light px-6 py-4">
        <h1 className="text-xl font-bold">TechMeet</h1>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-dark mb-2">안녕하세요!</h2>
          <p className="text-gray-600">오늘도 좋은 하루 되세요</p>
        </div>

        {/* 빠른 액션 카드 */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-dark rounded-full flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-medium text-dark mb-1">출근하기</h3>
            <p className="text-xs text-gray-500">근태 기록</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="font-medium text-dark mb-1">휴가 신청</h3>
            <p className="text-xs text-gray-500">연차 관리</p>
          </div>
        </div>

        {/* 최근 공지사항 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h3 className="font-semibold text-dark mb-4">공지사항</h3>
          <div className="space-y-3">
            <div className="pb-3 border-b border-gray-100">
              <p className="text-sm text-dark mb-1">2025년 상반기 워크샵 안내</p>
              <p className="text-xs text-gray-500">2025.01.15</p>
            </div>
            <div className="pb-3 border-b border-gray-100">
              <p className="text-sm text-dark mb-1">신규 복지 제도 시행 안내</p>
              <p className="text-xs text-gray-500">2025.01.10</p>
            </div>
            <div>
              <p className="text-sm text-dark mb-1">보안 정책 업데이트</p>
              <p className="text-xs text-gray-500">2025.01.05</p>
            </div>
          </div>
        </div>

        {/* 이번 주 일정 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-dark mb-4">이번 주 일정</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-dark rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm text-dark mb-1">프로젝트 킥오프 미팅</p>
                <p className="text-xs text-gray-500">2025.01.20 14:00</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-gray-400 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm text-dark mb-1">주간 회의</p>
                <p className="text-xs text-gray-500">2025.01.22 10:00</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 하단 네비게이션 */}
      <BottomNav />
    </div>
    </MobileContainer>
  )
}