'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import BottomNav from '@/components/BottomNav'
import MobileContainer from '@/components/MobileContainer'
import UserStatusCard from '@/components/home/UserStatusCard'
import ProjectSection from '@/components/home/ProjectSection'
import NoticeSection from '@/components/home/NoticeSection'
import { UserStatus } from '@/types/user'
import type { Project } from '@/types/project'
import type { Notice } from '@/types/notice'

export default function HomePage() {
  // TODO: API 연동 후 실제 데이터로 교체
  const [userName, setUserName] = useState('테크밋')
  const [userStatus] = useState(UserStatus.DEPLOYED)
  const [career] = useState({
    years: 3,
    months: 6,
    startDate: '2021-06-01',
  })

  // Mock 프로젝트 데이터 (최대 3개)
  const [projects, setProjects] = useState<Project[]>([])

  // Mock 공지사항 데이터
  const [notices, setNotices] = useState<Notice[]>([])

  // TODO: 실제 API 호출로 교체
  useEffect(() => {
    // Mock 데이터 설정
    const mockProjects: Project[] = [
      {
        id: '1',
        name: 'HR 관리 시스템 개선',
        description: '차세대 HR 관리 시스템 개발 프로젝트',
        status: 'IN_PROGRESS' as any,
        progress: 65,
        startDate: '2025-01-01',
        endDate: '2025-06-30',
        team: [
          { id: '1', name: '김철수', role: '개발자' },
          { id: '2', name: '박민수', role: '디자이너' },
          { id: '3', name: '정수진', role: 'PM' },
        ],
        createdAt: '2025-01-01',
        updatedAt: '2025-01-15',
      },
      {
        id: '2',
        name: '모바일 앱 개발',
        description: 'iOS/Android 모바일 애플리케이션 개발',
        status: 'IN_PROGRESS' as any,
        progress: 40,
        startDate: '2025-02-01',
        endDate: '2025-08-31',
        team: [
          { id: '4', name: '이영희', role: '개발자' },
          { id: '5', name: '최지훈', role: '개발자' },
        ],
        createdAt: '2025-02-01',
        updatedAt: '2025-02-15',
      },
      {
        id: '3',
        name: 'API 서버 고도화',
        description: '백엔드 API 성능 최적화 및 기능 확장',
        status: 'PLANNING' as any,
        progress: 20,
        startDate: '2025-03-01',
        endDate: '2025-05-31',
        team: [
          { id: '6', name: '김개발', role: '백엔드 개발자' },
        ],
        createdAt: '2025-02-20',
        updatedAt: '2025-02-25',
      },
    ]

    const mockNotices: Notice[] = [
      {
        id: '1',
        title: '2025년 상반기 워크샵 안내',
        content: '워크샵 내용...',
        type: 'EVENT' as any,
        author: { id: '1', name: '관리자', role: '운영팀' },
        createdAt: '2025-01-15',
        views: 125,
        isImportant: true,
      },
      {
        id: '2',
        title: '신규 복지 제도 시행 안내',
        content: '복지 내용...',
        type: 'POLICY' as any,
        author: { id: '1', name: '관리자', role: '인사팀' },
        createdAt: '2025-01-10',
        views: 89,
        isImportant: false,
      },
      {
        id: '3',
        title: '보안 정책 업데이트',
        content: '보안 내용...',
        type: 'SYSTEM' as any,
        author: { id: '2', name: '시스템관리자', role: '보안팀' },
        createdAt: '2025-01-05',
        views: 203,
        isImportant: false,
      },
    ]

    setProjects(mockProjects)
    setNotices(mockNotices)
  }, [])

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
        <main className="px-5 py-8">
          {/* 인사말 */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-dark mb-2">
              안녕하세요 {userName}님,
            </h2>
            <p className="text-gray-600">오늘도 좋은 하루되세요</p>
          </div>

          {/* 나의 상태 카드 */}
          <UserStatusCard status={userStatus} career={career} />

          {/* 프로젝트 정보 섹션 */}
          <ProjectSection projects={projects} />

          {/* 공지사항 섹션 */}
          <NoticeSection notices={notices} />
        </main>

        {/* 하단 네비게이션 */}
        <BottomNav />
      </div>
    </MobileContainer>
  )
}