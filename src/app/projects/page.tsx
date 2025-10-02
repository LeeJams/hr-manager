'use client'

import { useState } from 'react'
import Link from 'next/link'
import MainLayout from '@/components/layout/MainLayout'
import { ProjectStatus, ContractType, WorkType } from '@/types/project'
import type { Project } from '@/types/project'

type FilterType = 'ALL' | 'RECRUITING' | 'APPLIED' | 'CLOSED'

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('ALL')

  // TODO: API 연동 후 실제 데이터로 교체
  const mockProjects: Project[] = [
    {
      id: '1',
      title: 'AI 플랫폼 백엔드 API 개발',
      company: '테크솔루션',
      overview: 'AI 플랫폼의 모니터링, 로그처리, 통계용 Data API 개발',
      projectStatus: '신규 프로젝트',
      systemStack: 'Python, FastAPI, Kubernetes, SQL, Docker',
      detailedWork: '모니터링, 로그처리, 통계용 Data API 개발',
      requiredSkills: ['Python', 'FastAPI', 'Kubernetes', 'Docker', 'SQL', 'Backend API 개발'],
      preferredSkills: ['LLM 개발 이해도', 'ELK', 'Loki', 'Promtail', 'Grafana'],
      qualifications: ['로그 처리 관련 개발 경력 보유자'],
      contractType: ContractType.OUTSOURCING,
      workType: WorkType.ONSITE,
      experienceLevel: '시니어, 4~15년 차',
      positions: 1,
      contractStartDate: '2025-12-01',
      contractEndDate: '2026-04-30',
      applicationDeadline: '2025-11-30',
      interviewSchedule: '인터뷰 진행 후 2~3일 이내 계약 여부 결정',
      additionalNotes: '경력기술서 제출 필수. 보안 프로젝트로 위임계약(세금계산서 발행)',
      status: ProjectStatus.RECRUITING,
      isApplied: false,
      createdAt: '2025-10-01',
      updatedAt: '2025-10-01',
    },
    {
      id: '2',
      title: 'Next.js 기반 HR 시스템 프론트엔드',
      company: '테크밋',
      overview: '차세대 HR 관리 시스템 프론트엔드 개발',
      projectStatus: '진행 중',
      systemStack: 'Next.js, React, TypeScript, TailwindCSS',
      detailedWork: 'Next.js 15 기반 모바일 최적화 HR 시스템 UI/UX 개발',
      requiredSkills: ['Next.js', 'React', 'TypeScript', 'TailwindCSS'],
      preferredSkills: ['Zustand', 'React Query', 'Shadcn/ui'],
      contractType: ContractType.FREELANCE,
      workType: WorkType.REMOTE,
      experienceLevel: '주니어~시니어, 2~10년 차',
      positions: 2,
      contractStartDate: '2025-11-01',
      contractEndDate: '2026-05-31',
      applicationDeadline: '2025-10-25',
      status: ProjectStatus.RECRUITING,
      isApplied: true,
      createdAt: '2025-09-15',
      updatedAt: '2025-10-01',
    },
    {
      id: '3',
      title: 'Spring Boot 백엔드 API 서버 개발',
      overview: '헬스케어 플랫폼 백엔드 API 서버 개발 및 고도화',
      projectStatus: '완료',
      systemStack: 'Spring Boot, Java, MySQL, QueryDSL, AWS',
      detailedWork: 'Spring Boot 기반 RESTful API 개발, DB 설계',
      requiredSkills: ['Spring Boot', 'Java', 'MySQL', 'JPA'],
      preferredSkills: ['QueryDSL', 'AWS', 'Docker'],
      contractType: ContractType.CONTRACT,
      workType: WorkType.HYBRID,
      experienceLevel: '시니어, 5년 차 이상',
      positions: 1,
      status: ProjectStatus.CLOSED,
      isApplied: false,
      createdAt: '2025-08-01',
      updatedAt: '2025-09-30',
    },
  ]

  const getStatusText = (status: ProjectStatus) => {
    switch (status) {
      case ProjectStatus.RECRUITING:
        return '모집중'
      case ProjectStatus.CLOSED:
        return '마감'
      case ProjectStatus.IN_PROGRESS:
        return '진행중'
      case ProjectStatus.COMPLETED:
        return '완료'
      default:
        return '알 수 없음'
    }
  }

  const getStatusColor = (status: ProjectStatus) => {
    switch (status) {
      case ProjectStatus.RECRUITING:
        return 'bg-blue-100 text-blue-800'
      case ProjectStatus.CLOSED:
        return 'bg-gray-100 text-gray-800'
      case ProjectStatus.IN_PROGRESS:
        return 'bg-green-100 text-green-800'
      case ProjectStatus.COMPLETED:
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getContractTypeText = (type: ContractType) => {
    switch (type) {
      case ContractType.FREELANCE:
        return '프리랜서'
      case ContractType.OUTSOURCING:
        return '위임계약'
      case ContractType.EMPLOYEE:
        return '정규직'
      case ContractType.CONTRACT:
        return '계약직'
    }
  }

  const getWorkTypeText = (type: WorkType) => {
    switch (type) {
      case WorkType.REMOTE:
        return '재택'
      case WorkType.ONSITE:
        return '상주'
      case WorkType.HYBRID:
        return '혼합'
    }
  }

  const filteredProjects = mockProjects.filter((project) => {
    switch (activeFilter) {
      case 'RECRUITING':
        return project.status === ProjectStatus.RECRUITING
      case 'APPLIED':
        return project.isApplied
      case 'CLOSED':
        return project.status === ProjectStatus.CLOSED
      default:
        return true
    }
  })

  return (
    <MainLayout>
      {/* 프로젝트 필터 */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveFilter('ALL')}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
              activeFilter === 'ALL' ? 'bg-dark text-light' : 'bg-gray-100 text-dark'
            }`}
          >
            전체
          </button>
          <button
            onClick={() => setActiveFilter('RECRUITING')}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
              activeFilter === 'RECRUITING' ? 'bg-dark text-light' : 'bg-gray-100 text-dark'
            }`}
          >
            지원가능
          </button>
          <button
            onClick={() => setActiveFilter('APPLIED')}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
              activeFilter === 'APPLIED' ? 'bg-dark text-light' : 'bg-gray-100 text-dark'
            }`}
          >
            지원완료
          </button>
          <button
            onClick={() => setActiveFilter('CLOSED')}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
              activeFilter === 'CLOSED' ? 'bg-dark text-light' : 'bg-gray-100 text-dark'
            }`}
          >
            마감
          </button>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <main className="p-6">
          <div className="space-y-4">
            {filteredProjects.map((project) => (
              <Link key={project.id} href={`/projects/${project.id}`}>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-dark mb-1">{project.title}</h3>
                      {project.company && <p className="text-sm text-gray-600">{project.company}</p>}
                    </div>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
                      {getStatusText(project.status)}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{project.overview}</p>

                  {/* 기술 스택 */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.requiredSkills.slice(0, 4).map((skill, idx) => (
                      <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                        {skill}
                      </span>
                    ))}
                    {project.requiredSkills.length > 4 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        +{project.requiredSkills.length - 4}
                      </span>
                    )}
                  </div>

                  {/* 프로젝트 정보 */}
                  <div className="flex items-center gap-4 pt-4 border-t border-gray-100 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <span>{getContractTypeText(project.contractType)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>{getWorkTypeText(project.workType)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>{project.experienceLevel}</span>
                    </div>
                  </div>

                  {project.isApplied && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <span className="text-xs text-blue-600 font-medium">✓ 지원 완료</span>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
      </main>
    </MainLayout>
  )
}