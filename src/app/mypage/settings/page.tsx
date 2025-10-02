'use client'

import { useState } from 'react'
import Link from 'next/link'
import MainLayout from '@/components/layout/MainLayout'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    notifications: true,
    emailNotifications: false,
    darkMode: false,
  })

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  return (
    <MainLayout showBackButton backHref="/mypage" headerTitle="설정">
      <main className="p-6 space-y-6">
          {/* 알림 설정 */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-5 border-b border-gray-100">
              <h2 className="text-base font-semibold text-dark">알림 설정</h2>
            </div>
            <div className="divide-y divide-gray-100">
              <div className="flex items-center justify-between p-5">
                <div>
                  <h3 className="text-sm font-medium text-dark mb-1">푸시 알림</h3>
                  <p className="text-xs text-gray-500">앱 알림을 받습니다</p>
                </div>
                <button
                  onClick={() => handleToggle('notifications')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.notifications ? 'bg-dark' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.notifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between p-5">
                <div>
                  <h3 className="text-sm font-medium text-dark mb-1">이메일 알림</h3>
                  <p className="text-xs text-gray-500">이메일로 알림을 받습니다</p>
                </div>
                <button
                  onClick={() => handleToggle('emailNotifications')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.emailNotifications ? 'bg-dark' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </section>

          {/* 화면 설정 */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-5 border-b border-gray-100">
              <h2 className="text-base font-semibold text-dark">화면 설정</h2>
            </div>
            <div className="divide-y divide-gray-100">
              <div className="flex items-center justify-between p-5">
                <div>
                  <h3 className="text-sm font-medium text-dark mb-1">다크 모드</h3>
                  <p className="text-xs text-gray-500">어두운 테마를 사용합니다</p>
                </div>
                <button
                  onClick={() => handleToggle('darkMode')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.darkMode ? 'bg-dark' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.darkMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </section>

          {/* 정보 */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-5 border-b border-gray-100">
              <h2 className="text-base font-semibold text-dark">정보</h2>
            </div>
            <div className="divide-y divide-gray-100">
              <Link href="#" className="flex items-center justify-between p-5 hover:bg-gray-50">
                <span className="text-sm text-dark">개인정보 처리방침</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link href="#" className="flex items-center justify-between p-5 hover:bg-gray-50">
                <span className="text-sm text-dark">서비스 이용약관</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link href="#" className="flex items-center justify-between p-5 hover:bg-gray-50">
                <span className="text-sm text-dark">오픈소스 라이선스</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </section>

          {/* 앱 정보 */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-5 border-b border-gray-100">
              <h2 className="text-base font-semibold text-dark">앱 정보</h2>
            </div>
            <div className="p-5">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-gray-600">버전</span>
                <span className="text-sm font-medium text-dark">1.0.0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">최신 버전</span>
                <span className="text-xs text-green-600 font-medium">최신 버전 사용 중</span>
              </div>
            </div>
          </section>

          {/* 계정 */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-5 border-b border-gray-100">
              <h2 className="text-base font-semibold text-dark">계정</h2>
            </div>
            <div className="divide-y divide-gray-100">
              <button className="w-full flex items-center justify-between p-5 hover:bg-gray-50 text-left">
                <span className="text-sm text-dark">비밀번호 변경</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <button className="w-full flex items-center justify-between p-5 hover:bg-gray-50 text-left">
                <span className="text-sm text-red-600">회원 탈퇴</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </section>
      </main>
    </MainLayout>
  )
}