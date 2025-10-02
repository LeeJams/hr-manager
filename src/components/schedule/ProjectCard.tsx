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
          <h3 className="text-base font-semibold text-dark mb-1">{project.title}</h3>
          <p className="text-xs text-gray-500 line-clamp-2">{project.overview}</p>
        </div>
        <span className={`${statusColor} text-white text-xs px-2 py-1 rounded-full ml-3 whitespace-nowrap`}>
          {formatProjectStatus(project.status)}
        </span>
      </div>

      {/* 기술 스택 */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-1">
          {project.requiredSkills.slice(0, 5).map((skill, idx) => (
            <span key={idx} className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded">
              {skill}
            </span>
          ))}
          {project.requiredSkills.length > 5 && (
            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
              +{project.requiredSkills.length - 5}
            </span>
          )}
        </div>
      </div>

      {/* 날짜 정보 */}
      <div className="mb-4 space-y-1">
        <div className="flex justify-between text-xs">
          <span className="text-gray-500">계약 시작</span>
          <span className="text-dark">{project.contractStartDate}</span>
        </div>
        {project.contractEndDate && (
          <div className="flex justify-between text-xs">
            <span className="text-gray-500">계약 종료</span>
            <span className="text-dark">{project.contractEndDate}</span>
          </div>
        )}
        {project.applicationDeadline && (
          <div className="flex justify-between text-xs">
            <span className="text-gray-500">지원 마감</span>
            <span className="text-orange-600 font-medium">{project.applicationDeadline}</span>
          </div>
        )}
      </div>

      {/* 모집 인원 및 지원 버튼 */}
      <div className="flex items-center justify-between">
        <div className="text-xs text-gray-600">
          모집 인원: <span className="text-dark font-medium">{project.positions}명</span>
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
