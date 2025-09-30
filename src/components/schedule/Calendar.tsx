'use client'

import { useState } from 'react'
import type { CalendarEvent } from '@/types/schedule'
import { ScheduleEventType } from '@/types/schedule'

interface CalendarProps {
  year: number
  month: number
  events: CalendarEvent[]
  onMonthChange: (year: number, month: number) => void
}

export default function Calendar({ year, month, events, onMonthChange }: CalendarProps) {
  const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']

  // 해당 월의 첫 날과 마지막 날 계산
  const firstDay = new Date(year, month - 1, 1)
  const lastDay = new Date(year, month, 0)
  const daysInMonth = lastDay.getDate()
  const startDayOfWeek = firstDay.getDay() // 0 (일요일) ~ 6 (토요일)

  // 이전/다음 달로 이동
  const handlePrevMonth = () => {
    if (month === 1) {
      onMonthChange(year - 1, 12)
    } else {
      onMonthChange(year, month - 1)
    }
  }

  const handleNextMonth = () => {
    if (month === 12) {
      onMonthChange(year + 1, 1)
    } else {
      onMonthChange(year, month + 1)
    }
  }

  // 날짜별 이벤트 그룹화
  const getEventsForDate = (day: number) => {
    const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return events.filter((event) => event.date === dateStr)
  }

  // 이벤트 타입별 색상
  const getEventColor = (type: ScheduleEventType) => {
    switch (type) {
      case ScheduleEventType.APPLICATION_START:
        return 'bg-blue-500'
      case ScheduleEventType.APPLICATION_END:
        return 'bg-orange-500'
      case ScheduleEventType.DEPLOYMENT:
        return 'bg-green-500'
      default:
        return 'bg-gray-500'
    }
  }

  // 캘린더 날짜 배열 생성 (앞쪽 빈 칸 포함)
  const calendarDays = []
  for (let i = 0; i < startDayOfWeek; i++) {
    calendarDays.push(null)
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day)
  }

  return (
    <div className="bg-white border-b border-gray-200 p-6">
      {/* 월 헤더 */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={handlePrevMonth} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <svg className="w-5 h-5 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="text-lg font-semibold text-dark">
          {year}년 {monthNames[month - 1]}
        </h2>
        <button onClick={handleNextMonth} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <svg className="w-5 h-5 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
          <div
            key={day}
            className={`text-center text-xs font-medium py-2 ${
              index === 0 ? 'text-red-500' : index === 6 ? 'text-blue-500' : 'text-gray-600'
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, index) => {
          if (day === null) {
            return <div key={`empty-${index}`} className="aspect-square" />
          }

          const dayEvents = getEventsForDate(day)
          const isToday =
            day === new Date().getDate() &&
            month === new Date().getMonth() + 1 &&
            year === new Date().getFullYear()

          return (
            <button
              key={day}
              className={`aspect-square rounded-lg text-sm flex flex-col items-center justify-center relative ${
                isToday ? 'bg-dark text-light font-bold' : 'text-dark hover:bg-gray-100'
              }`}
            >
              <span>{day}</span>
              {/* 이벤트 마커 */}
              {dayEvents.length > 0 && (
                <div className="flex gap-1 mt-1">
                  {dayEvents.slice(0, 3).map((event) => (
                    <div
                      key={event.id}
                      className={`w-1 h-1 rounded-full ${getEventColor(event.type)}`}
                      title={event.projectName}
                    />
                  ))}
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* 범례 */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex flex-wrap gap-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-gray-600">지원 시작</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-orange-500" />
            <span className="text-gray-600">지원 마감</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-gray-600">투입일</span>
          </div>
        </div>
      </div>
    </div>
  )
}