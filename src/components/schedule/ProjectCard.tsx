'use client'

import type { Project } from '@/types/project'
import { formatProjectStatus, getProjectStatusColor } from '@/lib/utils/career'

interface ProjectCardProps {
  project: Project
  onApply?: (projectId: string) => void
}

export default function ProjectCard({ project, onApply }: ProjectCardProps) {
  const statusColor = getProjectStatusColor(project.status)

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-base font-semibold text-dark mb-1">{project.name}</h3>
          <p className="text-xs text-gray-500 line-clamp-2">{project.description}</p>
        </div>
        <span className={`${statusColor} text-white text-xs px-2 py-1 rounded-full ml-3 whitespace-nowrap`}>
          {formatProjectStatus(project.status)}
        </span>
      </div>

      {/* 진행률 */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-gray-600">진행률</span>
          <span className="text-xs font-medium text-dark">{project.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div className="bg-dark h-1.5 rounded-full transition-all" style={{ width: `${project.progress}%` }} />
        </div>
      </div>

      {/* 날짜 정보 */}
      <div className="mb-4 space-y-1">
        <div className="flex justify-between text-xs">
          <span className="text-gray-500">시작일</span>
          <span className="text-dark">{project.startDate}</span>
        </div>
        {project.endDate && (
          <div className="flex justify-between text-xs">
            <span className="text-gray-500">종료일</span>
            <span className="text-dark">{project.endDate}</span>
          </div>
        )}
        {project.applicationEndDate && (
          <div className="flex justify-between text-xs">
            <span className="text-gray-500">지원 마감</span>
            <span className="text-orange-600 font-medium">{project.applicationEndDate}</span>
          </div>
        )}
      </div>

      {/* 팀 멤버 */}
      <div className="flex items-center justify-between">
        <div className="flex -space-x-2">
          {project.team.slice(0, 4).map((member) => (
            <div
              key={member.id}
              className="w-7 h-7 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center"
              title={member.name}
            >
              {member.avatar ? (
                <img src={member.avatar} alt={member.name} className="w-full h-full rounded-full object-cover" />
              ) : (
                <span className="text-xs text-gray-600">{member.name[0]}</span>
              )}
            </div>
          ))}
          {project.team.length > 4 && (
            <div className="w-7 h-7 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
              <span className="text-xs text-gray-600">+{project.team.length - 4}</span>
            </div>
          )}
        </div>

        {/* 지원하기 버튼 (추천 프로젝트용) */}
        {onApply && !project.isApplied && (
          <button
            onClick={() => onApply(project.id)}
            className="text-xs text-dark border border-dark px-3 py-1 rounded-lg hover:bg-dark hover:text-light transition-colors"
          >
            지원하기
          </button>
        )}
        {project.isApplied && (
          <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-lg">신청 완료</span>
        )}
      </div>
    </div>
  )
}
