'use client'

import { useState } from 'react'
import Link from 'next/link'
import BottomNav from '@/components/BottomNav'
import MobileContainer from '@/components/MobileContainer'

export default function AttendancePage() {
  const [selectedDate, setSelectedDate] = useState('2025-09-30')

  const attendanceRecords = [
    { id: 1, name: '김철수', checkIn: '09:00', checkOut: '18:30', status: '정상', workHours: '9.5h', department: '개발팀' },
    { id: 2, name: '이영희', checkIn: '08:45', checkOut: '18:00', status: '정상', workHours: '9.25h', department: '기획팀' },
    { id: 3, name: '박민수', checkIn: '09:15', checkOut: '18:45', status: '지각', workHours: '9.5h', department: '개발팀' },
    { id: 4, name: '정수진', checkIn: '09:00', checkOut: '-', status: '근무중', workHours: '-', department: '디자인팀' },
    { id: 5, name: '최지훈', checkIn: '-', checkOut: '-', status: '휴가', workHours: '-', department: '인사팀' },
  ]

  const stats = [
    { label: '출근', value: '142', color: 'green' },
    { label: '지각', value: '3', color: 'yellow' },
    { label: '결근', value: '2', color: 'red' },
    { label: '휴가', value: '9', color: 'blue' },
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

        {/* 날짜 선택 */}
        <div className="p-6 bg-white border-b border-gray-200">
          <div className="flex gap-2">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark text-dark"
            />
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">
              오늘
            </button>
          </div>
          <button className="mt-3 w-full py-2 bg-dark text-light rounded-lg font-medium hover:bg-opacity-90 transition-opacity">
            + 출근 체크
          </button>
        </div>

        {/* Stats Cards */}
        <div className="p-6 bg-white border-b border-gray-200">
          <div className="grid grid-cols-4 gap-3">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className={`w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center ${
                  stat.color === 'green' ? 'bg-green-100' :
                  stat.color === 'yellow' ? 'bg-yellow-100' :
                  stat.color === 'red' ? 'bg-red-100' :
                  'bg-blue-100'
                }`}>
                  <span className={`text-lg font-bold ${
                    stat.color === 'green' ? 'text-green-600' :
                    stat.color === 'yellow' ? 'text-yellow-600' :
                    stat.color === 'red' ? 'text-red-600' :
                    'text-blue-600'
                  }`}>{stat.value}</span>
                </div>
                <p className="text-xs text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 근태 기록 목록 */}
        <main className="p-6">
          <div className="space-y-4">
            {attendanceRecords.map((record) => (
              <div key={record.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-medium text-gray-600">
                        {record.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-dark">{record.name}</h3>
                      <p className="text-xs text-gray-600">{record.department}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    record.status === '정상' ? 'bg-green-100 text-green-800' :
                    record.status === '지각' ? 'bg-yellow-100 text-yellow-800' :
                    record.status === '근무중' ? 'bg-blue-100 text-blue-800' :
                    record.status === '휴가' ? 'bg-purple-100 text-purple-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {record.status}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <p className="text-xs text-gray-500">출근</p>
                    <p className="font-medium text-dark">{record.checkIn}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">퇴근</p>
                    <p className="font-medium text-dark">{record.checkOut}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">근무시간</p>
                    <p className="font-medium text-dark">{record.workHours}</p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <button className="w-full py-2 text-sm text-dark hover:bg-gray-50 rounded-lg transition-colors">
                    상세보기
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