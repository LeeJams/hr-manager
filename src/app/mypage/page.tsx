'use client'

import { useRouter } from 'next/navigation'
import BottomNav from '@/components/BottomNav'
import MobileContainer from '@/components/MobileContainer'

export default function MyPage() {
  const router = useRouter()

  const handleLogout = () => {
    // TODO: 로그아웃 로직 구현
    router.push('/login')
  }

  const menuItems = [
    {
      title: '개인정보 수정',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      title: '근태 현황',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: '급여 정보',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: '연차 관리',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: '공지사항',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      )
    },
    {
      title: '설정',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    }
  ]

  return (
    <MobileContainer>
      <div className="min-h-screen bg-light pb-16">
      {/* 헤더 */}
      <header className="bg-dark text-light px-6 py-4">
        <h1 className="text-xl font-bold">마이페이지</h1>
      </header>

      {/* 프로필 섹션 */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-dark rounded-full flex items-center justify-center text-light text-2xl font-bold">
            김
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-dark">김테크</h2>
            <p className="text-sm text-gray-500">개발팀 · 시니어 개발자</p>
            <p className="text-xs text-gray-400 mt-1">tech@techmeet.com</p>
          </div>
        </div>
      </div>

      {/* 근무 정보 요약 */}
      <div className="bg-white p-6 mb-2">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-xs text-gray-500 mb-1">재직일수</p>
            <p className="text-lg font-bold text-dark">365일</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">잔여 연차</p>
            <p className="text-lg font-bold text-dark">12일</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">이번달 근무</p>
            <p className="text-lg font-bold text-dark">20일</p>
          </div>
        </div>
      </div>

      {/* 메뉴 목록 */}
      <main className="bg-white">
        <div className="divide-y divide-gray-100">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="text-dark">{item.icon}</div>
                <span className="text-dark">{item.title}</span>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
        </div>
      </main>

      {/* 로그아웃 버튼 */}
      <div className="p-6">
        <button
          onClick={handleLogout}
          className="w-full py-3 border border-gray-300 rounded-lg text-dark hover:bg-gray-50 transition-colors"
        >
          로그아웃
        </button>
      </div>

      {/* 하단 네비게이션 */}
      <BottomNav />
    </div>
    </MobileContainer>
  )
}