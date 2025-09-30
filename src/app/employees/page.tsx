'use client'

import { useState } from 'react'
import Link from 'next/link'
import BottomNav from '@/components/BottomNav'
import MobileContainer from '@/components/MobileContainer'

export default function EmployeesPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const employees = [
    { id: 1, name: '김철수', position: '시니어 개발자', department: '개발팀', email: 'kim@techmeet.com', status: '재직중' },
    { id: 2, name: '이영희', position: '프로덕트 매니저', department: '기획팀', email: 'lee@techmeet.com', status: '재직중' },
    { id: 3, name: '박민수', position: '주니어 개발자', department: '개발팀', email: 'park@techmeet.com', status: '재직중' },
    { id: 4, name: '정수진', position: '디자이너', department: '디자인팀', email: 'jung@techmeet.com', status: '재직중' },
    { id: 5, name: '최지훈', position: 'HR 매니저', department: '인사팀', email: 'choi@techmeet.com', status: '재직중' },
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

        {/* 검색 */}
        <div className="p-6 bg-white border-b border-gray-200">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark text-dark"
              placeholder="이름, 이메일, 부서로 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="mt-3 w-full py-2 bg-dark text-light rounded-lg font-medium hover:bg-opacity-90 transition-opacity">
            + 직원 추가
          </button>
        </div>

        {/* 직원 목록 */}
        <main className="p-6">
          <div className="space-y-4">
            {employees.map((employee) => (
              <div key={employee.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-lg font-medium text-gray-600">
                        {employee.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-dark">{employee.name}</h3>
                      <p className="text-sm text-gray-600">{employee.position}</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                    {employee.status}
                  </span>
                </div>
                <div className="space-y-1 text-sm text-gray-600 mb-3">
                  <p>부서: {employee.department}</p>
                  <p>이메일: {employee.email}</p>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    상세보기
                  </button>
                  <button className="flex-1 py-2 text-sm border border-dark bg-dark text-light rounded-lg hover:bg-opacity-90 transition-opacity">
                    수정
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* 하단 네비게이션 */}
        <BottomNav />
      </div>
    </MobileContainer>
  )
}