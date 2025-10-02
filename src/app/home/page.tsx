'use client'

import { useState, useEffect } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import UserStatusCard from '@/components/home/UserStatusCard'
import ProjectSection from '@/components/home/ProjectSection'
import NoticeSection from '@/components/home/NoticeSection'
import { UserStatus } from '@/types/user'
import type { Project } from '@/types/project'
import { ContractType, WorkType, ProjectStatus } from '@/types/project'
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
        title: 'HR 관리 시스템 개선',
        company: '테크밋',
        overview: '차세대 HR 관리 시스템 개발 프로젝트',
        detailedWork: 'Next.js 15 기반 모바일 최적화 HR 시스템 UI/UX 개발',
        requiredSkills: ['Next.js', 'React', 'TypeScript'],
        contractType: ContractType.FREELANCE,
        workType: WorkType.REMOTE,
        experienceLevel: '주니어~시니어, 2~10년 차',
        positions: 2,
        contractStartDate: '2025-01-01',
        contractEndDate: '2025-06-30',
        status: ProjectStatus.IN_PROGRESS,
        createdAt: '2025-01-01',
        updatedAt: '2025-01-15',
      },
      {
        id: '2',
        title: '모바일 앱 개발',
        company: '테크솔루션',
        overview: 'iOS/Android 모바일 애플리케이션 개발',
        detailedWork: 'Flutter 기반 크로스플랫폼 모바일 앱 개발',
        requiredSkills: ['Flutter', 'Dart', 'Firebase'],
        contractType: ContractType.FREELANCE,
        workType: WorkType.HYBRID,
        experienceLevel: '시니어, 3년 차 이상',
        positions: 1,
        contractStartDate: '2025-02-01',
        contractEndDate: '2025-08-31',
        status: ProjectStatus.IN_PROGRESS,
        createdAt: '2025-02-01',
        updatedAt: '2025-02-15',
      },
      {
        id: '3',
        title: 'API 서버 고도화',
        overview: '백엔드 API 성능 최적화 및 기능 확장',
        detailedWork: 'Spring Boot 기반 RESTful API 개발, DB 설계',
        requiredSkills: ['Spring Boot', 'Java', 'MySQL'],
        contractType: ContractType.CONTRACT,
        workType: WorkType.ONSITE,
        experienceLevel: '시니어, 5년 차 이상',
        positions: 1,
        contractStartDate: '2025-03-01',
        contractEndDate: '2025-05-31',
        status: ProjectStatus.RECRUITING,
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
    <MainLayout>
      <main className="px-6 py-8">
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
    </MainLayout>
  )
}