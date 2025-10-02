'use client'

import { useState, useEffect } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import Calendar from '@/components/schedule/Calendar'
import ExpandableProjectSection from '@/components/schedule/ExpandableProjectSection'
import type { CalendarEvent } from '@/types/schedule'
import type { Project } from '@/types/project'
import {
  getCalendarEvents,
  getRequestedProjects,
  getMyApplications,
  getRecommendedProjects,
  applyToProject,
} from '@/lib/api/schedule'

export default function SchedulePage() {
  const [year, setYear] = useState(new Date().getFullYear())
  const [month, setMonth] = useState(new Date().getMonth() + 1)
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [requestedProjects, setRequestedProjects] = useState<Project[]>([])
  const [myApplications, setMyApplications] = useState<Project[]>([])
  const [recommendedProjects, setRecommendedProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // 데이터 로드
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)
        const [calendarData, requested, applications, recommended] = await Promise.all([
          getCalendarEvents(year, month),
          getRequestedProjects(),
          getMyApplications(),
          getRecommendedProjects(),
        ])

        setEvents(calendarData.events)
        setRequestedProjects(requested)
        setMyApplications(applications)
        setRecommendedProjects(recommended)
      } catch (error) {
        console.error('Failed to load schedule data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [year, month])

  // 월 변경 핸들러
  const handleMonthChange = (newYear: number, newMonth: number) => {
    setYear(newYear)
    setMonth(newMonth)
  }

  // 프로젝트 지원하기
  const handleApply = async (projectId: string) => {
    try {
      await applyToProject(projectId)

      // 추천 프로젝트에서 제거하고 내 신청 프로젝트에 추가
      const appliedProject = recommendedProjects.find((p) => p.id === projectId)
      if (appliedProject) {
        setRecommendedProjects((prev) => prev.filter((p) => p.id !== projectId))
        setMyApplications((prev) => [...prev, { ...appliedProject, isApplied: true }])
      }

      alert('프로젝트 지원이 완료되었습니다.')
    } catch (error) {
      console.error('Failed to apply to project:', error)
      alert('프로젝트 지원에 실패했습니다.')
    }
  }

  return (
    <MainLayout>
      {/* 캘린더 */}
      <Calendar year={year} month={month} events={events} onMonthChange={handleMonthChange} />

      {/* 프로젝트 섹션 */}
      <main className="px-6 py-8">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-gray-300 border-t-dark rounded-full animate-spin"></div>
            <p className="text-sm text-gray-500 mt-4">로딩 중...</p>
          </div>
        ) : (
          <>
            {/* 관리자 요청 프로젝트 */}
            <ExpandableProjectSection title="관리자 요청 프로젝트" projects={requestedProjects} />

            {/* 내가 신청한 프로젝트 */}
            <ExpandableProjectSection title="내가 신청한 프로젝트" projects={myApplications} />

            {/* 추천 프로젝트 */}
            <ExpandableProjectSection
              title="추천 프로젝트"
              projects={recommendedProjects}
              onApply={handleApply}
            />
          </>
        )}
      </main>
    </MainLayout>
  )
}
