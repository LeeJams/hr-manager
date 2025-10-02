'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import MainLayout from '@/components/layout/MainLayout'
import { ProjectStatus, ContractType, WorkType } from '@/types/project'
import type { Project } from '@/types/project'

export default function ProjectDetailPage() {
  const params = useParams()
  const projectId = params.id as string

  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // TODO: API 연동 후 실제 데이터로 교체
    const mockProjects: Record<string, Project> = {
      '1': {
        id: '1',
        title: 'AI 플랫폼 백엔드 API 개발',
        company: '테크솔루션',
        overview: 'AI 플랫폼의 모니터링, 로그처리, 통계용 Data API 개발 프로젝트입니다.',
        projectStatus: '신규 프로젝트',
        systemStack: 'Python, FastAPI, Kubernetes, SQL, Docker',
        detailedWork:
          '- Backend 기능별 API 모듈화 등 시스템 고도화\n- 모니터링, 로그처리, 통계용 Data API 개발',
        requiredSkills: ['Python', 'FastAPI', 'Kubernetes', 'Docker', 'SQL', 'Backend API 개발'],
        preferredSkills: ['LLM 개발 이해도', 'ELK', 'Loki', 'Promtail', 'Grafana 등의 로그 시스템 개발 경험'],
        qualifications: ['로그 처리 관련 개발 경력 보유자'],
        contractType: ContractType.OUTSOURCING,
        workType: WorkType.ONSITE,
        experienceLevel: '시니어, 4~15년 차',
        positions: 1,
        contractStartDate: '2025-12-01',
        contractEndDate: '2026-04-30',
        applicationDeadline: '2025-11-30',
        interviewSchedule: '프로젝트 지원 > 실무진 인터뷰 > 계약 결정 (인터뷰 진행 후 2~3일 이내 계약 여부 결정)',
        additionalNotes:
          '1. 경력기술서 제출 필수입니다.\n2. 보안 프로젝트로 개인사업자는 위임계약(세금계산서 발행) 방식으로 진행됩니다.',
        status: ProjectStatus.RECRUITING,
        isApplied: false,
        createdAt: '2025-10-01',
        updatedAt: '2025-10-01',
      },
      '2': {
        id: '2',
        title: 'Next.js 기반 HR 시스템 프론트엔드',
        company: '테크밋',
        overview: '차세대 HR 관리 시스템 프론트엔드 개발 프로젝트',
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
      '3': {
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
    }

    const foundProject = mockProjects[projectId]
    setProject(foundProject || null)
    setLoading(false)
  }, [projectId])

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
      case ProjectStatus.CANCELLED:
        return '취소'
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
      case ProjectStatus.CANCELLED:
        return 'bg-red-100 text-red-800'
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

  const handleApply = () => {
    // TODO: 프로젝트 지원 API 호출
    setProject((prev) => (prev ? { ...prev, isApplied: true } : null))
    alert('프로젝트 지원이 완료되었습니다.')
  }

  const handleCancel = () => {
    // TODO: 프로젝트 지원 취소 API 호출
    setProject((prev) => (prev ? { ...prev, isApplied: false } : null))
    alert('프로젝트 지원이 취소되었습니다.')
  }

  if (loading) {
    return (
      <MainLayout showBackButton backHref="/projects" headerTitle="프로젝트 상세">
        <div className="flex items-center justify-center py-20">
          <p className="text-gray-500">로딩 중...</p>
        </div>
      </MainLayout>
    )
  }

  if (!project) {
    return (
      <MainLayout showBackButton backHref="/projects" headerTitle="프로젝트 상세">
        <div className="p-6 text-center">
          <p className="text-gray-500 mb-4">프로젝트를 찾을 수 없습니다.</p>
          <Link
            href="/projects"
            className="inline-block px-6 py-2 bg-dark text-light rounded-lg hover:opacity-90 transition-opacity"
          >
            프로젝트 목록으로
          </Link>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout showBackButton backHref="/projects" headerTitle="프로젝트 상세">
      <main className="px-6 py-4">
          {/* 프로젝트 기본 정보 */}
          <div className="bg-white p-6 mb-2 rounded-lg shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h2 className="text-xl font-bold text-dark mb-2">{project.title}</h2>
                {project.company && <p className="text-sm text-gray-600 mb-2">{project.company}</p>}
              </div>
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
                {getStatusText(project.status)}
              </span>
            </div>

            {project.isApplied && (
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                  ✓ 지원 완료
                </span>
              </div>
            )}

            <p className="text-sm text-gray-700 mb-4 leading-relaxed whitespace-pre-line">{project.overview}</p>

            {/* 계약 조건 */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-100">
              <div>
                <p className="text-xs text-gray-500 mb-1">계약 형태</p>
                <p className="text-sm font-medium text-dark">{getContractTypeText(project.contractType)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">근무 형태</p>
                <p className="text-sm font-medium text-dark">{getWorkTypeText(project.workType)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">모집 인원</p>
                <p className="text-sm font-medium text-dark">{project.positions}명</p>
              </div>
            </div>
          </div>

          {/* 프로젝트 진행 상황 */}
          {project.projectStatus && (
            <div className="bg-white p-6 mb-2 rounded-lg shadow-sm">
              <h3 className="text-base font-semibold text-dark mb-3">프로젝트 진행 상황</h3>
              <p className="text-sm text-gray-700">{project.projectStatus}</p>
            </div>
          )}

          {/* 전체 시스템 구성 */}
          {project.systemStack && (
            <div className="bg-white p-6 mb-2 rounded-lg shadow-sm">
              <h3 className="text-base font-semibold text-dark mb-3">전체 시스템 구성</h3>
              <p className="text-sm text-gray-700">{project.systemStack}</p>
            </div>
          )}

          {/* 계약 일정 */}
          {(project.contractStartDate || project.contractEndDate || project.applicationDeadline) && (
            <div className="bg-white p-6 mb-2 rounded-lg shadow-sm">
              <h3 className="text-base font-semibold text-dark mb-3">전체 프로젝트 일정</h3>
              <div className="space-y-2">
                {project.contractStartDate && project.contractEndDate && (
                  <div className="text-sm">
                    <span className="text-gray-600">계약 기간: </span>
                    <span className="font-medium text-dark">
                      {project.contractStartDate} ~ {project.contractEndDate}
                    </span>
                  </div>
                )}
                {project.applicationDeadline && (
                  <div className="text-sm">
                    <span className="text-gray-600">지원 마감일: </span>
                    <span className="font-medium text-dark">{project.applicationDeadline}</span>
                  </div>
                )}
                {project.interviewSchedule && (
                  <div className="text-sm">
                    <span className="text-gray-600">진행 프로세스: </span>
                    <span className="font-medium text-dark">{project.interviewSchedule}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 상세 업무 내용 */}
          <div className="bg-white p-6 mb-2 rounded-lg shadow-sm">
            <h3 className="text-base font-semibold text-dark mb-3">상세 업무 내용</h3>
            <p className="text-sm text-gray-700 whitespace-pre-line">{project.detailedWork}</p>
          </div>

          {/* 필수 기술 */}
          <div className="bg-white p-6 mb-2 rounded-lg shadow-sm">
            <h3 className="text-base font-semibold text-dark mb-3">필수 기술</h3>
            <div className="flex flex-wrap gap-2">
              {project.requiredSkills.map((skill, idx) => (
                <span key={idx} className="px-3 py-1.5 bg-blue-50 text-blue-700 text-sm font-medium rounded">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* 자격 요건 */}
          {project.qualifications && project.qualifications.length > 0 && (
            <div className="bg-white p-6 mb-2 rounded-lg shadow-sm">
              <h3 className="text-base font-semibold text-dark mb-3">자격 요건</h3>
              <ul className="space-y-2">
                {project.qualifications.map((qual, idx) => (
                  <li key={idx} className="text-sm text-gray-700 flex items-start">
                    <span className="mr-2">•</span>
                    <span>{qual}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 우대 사항 */}
          {project.preferredSkills && project.preferredSkills.length > 0 && (
            <div className="bg-white p-6 mb-2 rounded-lg shadow-sm">
              <h3 className="text-base font-semibold text-dark mb-3">우대 사항</h3>
              <ul className="space-y-2">
                {project.preferredSkills.map((pref, idx) => (
                  <li key={idx} className="text-sm text-gray-700 flex items-start">
                    <span className="mr-2">•</span>
                    <span>{pref}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 경력 및 인원 */}
          <div className="bg-white p-6 mb-2 rounded-lg shadow-sm">
            <h3 className="text-base font-semibold text-dark mb-3">모집 조건</h3>
            <div className="space-y-2">
              <div className="text-sm">
                <span className="text-gray-600">경력: </span>
                <span className="font-medium text-dark">{project.experienceLevel}</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-600">모집 인원: </span>
                <span className="font-medium text-dark">{project.positions}명</span>
              </div>
            </div>
          </div>

          {/* 기타 유의 사항 */}
          {project.additionalNotes && (
            <div className="bg-white p-6 mb-2 rounded-lg shadow-sm">
              <h3 className="text-base font-semibold text-dark mb-3">기타 유의 사항</h3>
              <p className="text-sm text-gray-700 whitespace-pre-line">{project.additionalNotes}</p>
            </div>
          )}
      </main>

      {/* 액션 버튼 */}
      <div className="px-6 py-4">
        {project.isApplied ? (
          <button
            onClick={handleCancel}
            className="w-full py-3 border border-gray-300 rounded-lg text-dark hover:bg-gray-50 transition-colors"
          >
            지원 취소
          </button>
        ) : (
          <button
            onClick={handleApply}
            className="w-full py-3 bg-dark text-light rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={project.status !== ProjectStatus.RECRUITING}
          >
            {project.status === ProjectStatus.RECRUITING ? '프로젝트 지원하기' : '모집 마감'}
          </button>
        )}
      </div>
    </MainLayout>
  )
}
