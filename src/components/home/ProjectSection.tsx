'use client'

import Link from 'next/link'
import type { Project } from '@/types/project'
import { formatProjectStatus, getProjectStatusColor, formatDate } from '@/lib/utils/career'

interface ProjectSectionProps {
  projects: Project[]
}

export default function ProjectSection({ projects }: ProjectSectionProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-dark">프로젝트 정보</h3>
        <Link
          href="/projects"
          className="text-sm text-gray-600 hover:text-dark transition-colors"
        >
          더보기 →
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 py-10 px-6 text-center">
          <p className="text-gray-500 text-sm">진행 중인 프로젝트가 없습니다</p>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="block bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-base font-semibold text-dark flex-1 pr-2">
                  {project.title}
                </h4>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${getProjectStatusColor(
                    project.status
                  )}`}
                >
                  {formatProjectStatus(project.status)}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {project.overview}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {/* 기술 스택 */}
                  <div className="flex gap-1 flex-wrap">
                    {project.requiredSkills.slice(0, 3).map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded"
                      >
                        {skill}
                      </span>
                    ))}
                    {project.requiredSkills.length > 3 && (
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                        +{project.requiredSkills.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* 모집 인원 */}
                <div className="flex items-center gap-1">
                  <span className="text-xs text-gray-600">모집</span>
                  <span className="text-xs text-dark font-medium">{project.positions}명</span>
                </div>
              </div>

              {/* 프로젝트 기간 */}
              <div className="mt-3 pt-3 border-t border-gray-100">
                <span className="text-xs text-gray-500">
                  {project.contractStartDate && formatDate(project.contractStartDate)}
                  {project.contractEndDate && ` ~ ${formatDate(project.contractEndDate)}`}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}