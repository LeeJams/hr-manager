'use client'

import Link from 'next/link'
import BottomNav from '@/components/BottomNav'
import MobileContainer from '@/components/MobileContainer'

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      name: 'HR 관리 시스템 개선',
      description: '차세대 HR 관리 시스템 개발 프로젝트',
      status: '진행중',
      progress: 65,
      team: ['김철수', '박민수', '정수진'],
    },
    {
      id: 2,
      name: '모바일 앱 개발',
      description: 'iOS/Android 모바일 애플리케이션 개발',
      status: '진행중',
      progress: 40,
      team: ['이영희', '최지훈'],
    },
    {
      id: 3,
      name: '데이터 마이그레이션',
      description: '레거시 시스템 데이터 이전',
      status: '완료',
      progress: 100,
      team: ['김철수'],
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case '진행중':
        return 'bg-blue-100 text-blue-800'
      case '완료':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <MobileContainer>
      <div className="min-h-screen bg-light pb-16">
      {/* 헤더 */}
      <header className="bg-dark text-light px-6 py-4">
        <Link href="/home">
          <h1 className="text-xl font-bold cursor-pointer">TechMeet</h1>
        </Link>
      </header>

      {/* 프로젝트 필터 */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex gap-2 overflow-x-auto">
          <button className="px-4 py-2 bg-dark text-light rounded-full text-sm whitespace-nowrap">
            전체
          </button>
          <button className="px-4 py-2 bg-gray-100 text-dark rounded-full text-sm whitespace-nowrap">
            진행중
          </button>
          <button className="px-4 py-2 bg-gray-100 text-dark rounded-full text-sm whitespace-nowrap">
            완료
          </button>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <main className="p-6">
        <div className="space-y-4">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-dark">{project.name}</h3>
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-4">{project.description}</p>

              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>진행률</span>
                  <span className="font-medium text-dark">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-dark h-2 rounded-full transition-all"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex -space-x-2">
                  {project.team.map((member, idx) => (
                    <div
                      key={idx}
                      className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center border-2 border-white"
                      title={member}
                    >
                      <span className="text-xs text-dark font-medium">{member.charAt(0)}</span>
                    </div>
                  ))}
                </div>
                <button className="text-dark hover:opacity-70 text-sm font-medium">
                  상세보기 →
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