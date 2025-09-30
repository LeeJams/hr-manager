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
                  {project.name}
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
                {project.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {/* 팀원 아바타 */}
                  <div className="flex -space-x-2">
                    {project.team.slice(0, 3).map((member, idx) => (
                      <div
                        key={idx}
                        className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center border-2 border-white"
                        title={member.name}
                      >
                        <span className="text-[10px] text-dark font-medium">
                          {member.name.charAt(0)}
                        </span>
                      </div>
                    ))}
                    {project.team.length > 3 && (
                      <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center border-2 border-white">
                        <span className="text-[10px] text-dark font-medium">
                          +{project.team.length - 3}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* 진행률 */}
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-dark h-1.5 rounded-full transition-all"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-600 font-medium w-8 text-right">
                    {project.progress}%
                  </span>
                </div>
              </div>

              {/* 프로젝트 기간 */}
              <div className="mt-3 pt-3 border-t border-gray-100">
                <span className="text-xs text-gray-500">
                  {formatDate(project.startDate)}
                  {project.endDate && ` ~ ${formatDate(project.endDate)}`}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}