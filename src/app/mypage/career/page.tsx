'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import MainLayout from '@/components/layout/MainLayout'
import { formatCareerInfo } from '@/lib/utils/career'
import type { CareerInfo } from '@/types/user'

interface CareerProject {
  id: string
  name: string
  clientName: string
  role: string
  startDate: string
  endDate: string
  description: string
  technologies: string[]
  achievements?: string[]
}

export default function CareerPage() {
  // TODO: API 연동 후 실제 데이터로 교체
  const [totalCareer] = useState<CareerInfo>({
    years: 5,
    months: 3,
    startDate: '2019-09-01',
  })

  const [careerProjects, setCareerProjects] = useState<CareerProject[]>([])

  useEffect(() => {
    // Mock 경력 프로젝트 데이터
    const mockCareerProjects: CareerProject[] = [
      {
        id: '1',
        name: 'HR 관리 시스템 고도화',
        clientName: '테크밋',
        role: 'Frontend Developer',
        startDate: '2025-01-01',
        endDate: '진행중',
        description: 'Next.js 기반 HR 관리 시스템 개발 및 UI/UX 개선',
        technologies: ['Next.js', 'React', 'TypeScript', 'TailwindCSS'],
        achievements: [
          '모바일 반응형 UI 구현',
          'Blue-Green 배포 전략 도입',
          '사용자 경험 개선으로 만족도 30% 향상',
        ],
      },
      {
        id: '2',
        name: '이커머스 플랫폼 구축',
        clientName: '쇼핑몰 주식회사',
        role: 'Full Stack Developer',
        startDate: '2024-03-01',
        endDate: '2024-12-31',
        description: '대규모 이커머스 플랫폼 설계 및 개발',
        technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
        achievements: [
          '월 100만 건 이상 트랜잭션 처리',
          'API 응답속도 40% 개선',
          '결제 시스템 안정화',
        ],
      },
      {
        id: '3',
        name: '금융 데이터 분석 대시보드',
        clientName: '금융테크',
        role: 'Frontend Developer',
        startDate: '2023-06-01',
        endDate: '2024-02-28',
        description: '실시간 금융 데이터 시각화 대시보드 개발',
        technologies: ['Vue.js', 'D3.js', 'WebSocket', 'Redis'],
        achievements: ['실시간 데이터 처리 구현', '차트 성능 최적화', '사용자 정의 대시보드 기능 개발'],
      },
      {
        id: '4',
        name: '병원 예약 시스템',
        clientName: '메디컬센터',
        role: 'Backend Developer',
        startDate: '2022-09-01',
        endDate: '2023-05-31',
        description: '병원 예약 및 환자 관리 시스템 개발',
        technologies: ['Spring Boot', 'MySQL', 'Docker', 'Jenkins'],
        achievements: ['예약 처리 시간 50% 단축', 'SMS 알림 시스템 구축', 'API 문서화 자동화'],
      },
      {
        id: '5',
        name: '교육 플랫폼 LMS',
        clientName: '에듀테크',
        role: 'Full Stack Developer',
        startDate: '2020-11-01',
        endDate: '2022-08-31',
        description: '온라인 교육 플랫폼 개발 및 유지보수',
        technologies: ['Django', 'React', 'PostgreSQL', 'S3'],
        achievements: ['동시 접속자 1만명 지원', '동영상 스트리밍 최적화', '학습 관리 기능 고도화'],
      },
    ]

    setCareerProjects(mockCareerProjects)
  }, [])

  const careerText = formatCareerInfo(totalCareer)

  return (
    <MainLayout showBackButton backHref="/mypage" headerTitle="이력 정보">
      {/* 총 경력 요약 */}
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-dark">총 경력</h2>
            <span className="text-2xl font-bold text-dark">{careerText}</span>
          </div>
          <p className="text-sm text-gray-500">시작일: {totalCareer.startDate}</p>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-dark">{careerProjects.length}</p>
                <p className="text-xs text-gray-500 mt-1">프로젝트</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-dark">
                  {careerProjects.reduce((acc, p) => acc + (p.technologies?.length || 0), 0)}
                </p>
                <p className="text-xs text-gray-500 mt-1">사용 기술</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-dark">
                  {careerProjects.filter((p) => p.endDate !== '진행중').length}
                </p>
                <p className="text-xs text-gray-500 mt-1">완료 프로젝트</p>
              </div>
            </div>
          </div>
        </div>

      {/* 프로젝트 이력 */}
      <main className="p-6">
        <h2 className="text-lg font-semibold text-dark mb-4">프로젝트 이력</h2>

        <div className="space-y-4">
          {careerProjects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
              {/* 프로젝트 헤더 */}
              <div className="mb-3">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-base font-semibold text-dark flex-1">{project.name}</h3>
                  {project.endDate === '진행중' && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full ml-2">
                      진행중
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-1">{project.clientName}</p>
                <p className="text-xs text-gray-500">
                  {project.startDate} ~ {project.endDate}
                </p>
              </div>

              {/* 역할 및 설명 */}
              <div className="mb-3 pb-3 border-b border-gray-100">
                <p className="text-sm font-medium text-dark mb-1">{project.role}</p>
                <p className="text-sm text-gray-600">{project.description}</p>
              </div>

              {/* 사용 기술 */}
              <div className="mb-3">
                <p className="text-xs font-medium text-gray-600 mb-2">사용 기술</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* 주요 성과 */}
              {project.achievements && project.achievements.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-gray-600 mb-2">주요 성과</p>
                  <ul className="space-y-1">
                    {project.achievements.map((achievement, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-start">
                        <span className="mr-2 text-dark">•</span>
                        <span className="flex-1">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {careerProjects.length === 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <p className="text-gray-500">등록된 프로젝트 이력이 없습니다</p>
          </div>
        )}
      </main>
    </MainLayout>
  )
}
