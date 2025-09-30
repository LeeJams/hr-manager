'use client'

import Link from 'next/link'
import BottomNav from '@/components/BottomNav'
import MobileContainer from '@/components/MobileContainer'

export default function DashboardPage() {
  const stats = [
    { name: '전체 직원', value: '156', change: '+4.75%' },
    { name: '금일 출근', value: '142', change: '91%' },
    { name: '진행중인 프로젝트', value: '23', change: '+2' },
    { name: '대기중인 휴가 신청', value: '8', change: '-3' },
  ]

  const recentActivities = [
    { user: '김철수', action: '출근 체크', time: '9:00 AM' },
    { user: '이영희', action: '휴가 신청', time: '8:45 AM' },
    { user: '박민수', action: '프로젝트 업데이트', time: '8:30 AM' },
    { user: '정수진', action: '출근 체크', time: '8:15 AM' },
  ]

  return (
    <MobileContainer>
      <div className="min-h-screen bg-light pb-16">
        {/* 헤더 */}
        <header className="bg-dark text-light px-6 py-4">
          <Link href="/home">
            <h1 className="text-xl font-bold cursor-pointer">TechMeet</h1>
          </Link>
        </header>

        {/* 메인 컨텐츠 */}
        <main className="p-6">
          <div className="mb-6">
            <p className="text-gray-600">Techmeet HR 관리 시스템</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {stats.map((stat) => (
              <div key={stat.name} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <p className="text-xs text-gray-600 mb-2">{stat.name}</p>
                <p className="text-2xl font-bold text-dark">{stat.value}</p>
                <p className={`text-xs mt-2 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-gray-600'}`}>
                  {stat.change}
                </p>
              </div>
            ))}
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-dark">최근 활동</h3>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-medium text-gray-600">
                        {activity.user.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-dark">{activity.user}</p>
                      <p className="text-xs text-gray-600">{activity.action}</p>
                    </div>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-dark">빠른 작업</h3>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-2 gap-3">
                <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-dark transition">
                  <svg className="w-8 h-8 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <p className="text-xs font-medium text-gray-700">직원 추가</p>
                </button>
                <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-dark transition">
                  <svg className="w-8 h-8 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-xs font-medium text-gray-700">출근 체크</p>
                </button>
                <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-dark transition">
                  <svg className="w-8 h-8 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <p className="text-xs font-medium text-gray-700">프로젝트 생성</p>
                </button>
                <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-dark transition">
                  <svg className="w-8 h-8 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-xs font-medium text-gray-700">휴가 승인</p>
                </button>
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