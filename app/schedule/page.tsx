'use client'

import { useState } from 'react'
import BottomNav from '@/components/BottomNav'
import MobileContainer from '@/components/MobileContainer'

export default function SchedulePage() {
  const [selectedDate, setSelectedDate] = useState(new Date())

  const schedules = [
    { id: 1, title: '프로젝트 킥오프 미팅', time: '14:00', date: '2025-01-20', type: 'meeting' },
    { id: 2, title: '주간 회의', time: '10:00', date: '2025-01-22', type: 'meeting' },
    { id: 3, title: '디자인 리뷰', time: '15:00', date: '2025-01-23', type: 'review' },
    { id: 4, title: '1:1 미팅', time: '16:00', date: '2025-01-24', type: 'meeting' },
  ]

  return (
    <MobileContainer>
      <div className="min-h-screen bg-light pb-16">
      {/* 헤더 */}
      <header className="bg-dark text-light px-6 py-4">
        <h1 className="text-xl font-bold">일정관리</h1>
      </header>

      {/* 캘린더 */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <button className="p-2">
            <svg className="w-5 h-5 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-lg font-semibold text-dark">2025년 1월</h2>
          <button className="p-2">
            <svg className="w-5 h-5 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* 간단한 주간 캘린더 */}
        <div className="grid grid-cols-7 gap-2 text-center">
          {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
            <div key={day} className="text-xs text-gray-500 font-medium py-2">
              {day}
            </div>
          ))}
          {[...Array(7)].map((_, i) => {
            const day = 19 + i
            return (
              <button
                key={i}
                className={`py-2 rounded-lg text-sm ${
                  day === 20
                    ? 'bg-dark text-light font-bold'
                    : 'text-dark hover:bg-gray-100'
                }`}
              >
                {day}
              </button>
            )
          })}
        </div>
      </div>

      {/* 일정 목록 */}
      <main className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-dark">이번 주 일정</h3>
          <button className="text-sm text-dark hover:opacity-70">+ 일정 추가</button>
        </div>

        <div className="space-y-3">
          {schedules.map((schedule) => (
            <div
              key={schedule.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-2 h-2 rounded-full ${
                      schedule.type === 'meeting' ? 'bg-dark' : 'bg-gray-400'
                    }`}></div>
                    <h4 className="font-medium text-dark">{schedule.title}</h4>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {schedule.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {schedule.time}
                    </span>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-dark">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 빈 상태 메시지 (일정이 없을 때) */}
        {schedules.length === 0 && (
          <div className="text-center py-12">
            <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-gray-500">예정된 일정이 없습니다</p>
          </div>
        )}
      </main>

      {/* 하단 네비게이션 */}
      <BottomNav />
    </div>
    </MobileContainer>
  )
}