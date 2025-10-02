'use client'

import { useState } from 'react'
import type { Project } from '@/types/project'
import ProjectCard from './ProjectCard'

interface ExpandableProjectSectionProps {
  title: string
  projects: Project[]
  onApply?: (projectId: string) => void
}

export default function ExpandableProjectSection({ title, projects, onApply }: ExpandableProjectSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const displayedProjects = isExpanded ? projects : projects.slice(0, 3)
  const hasMore = projects.length > 3

  if (projects.length === 0) {
    return (
      <section className="mb-8">
        <h2 className="text-base font-semibold text-dark mb-4 px-1">{title}</h2>
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-8 text-center">
          <p className="text-sm text-gray-500">프로젝트가 없습니다</p>
        </div>
      </section>
    )
  }

  return (
    <section className="mb-8">
      <h2 className="text-base font-semibold text-dark mb-4 px-1">{title}</h2>

      <div className="space-y-3">
        {displayedProjects.map((project) => (
          <ProjectCard key={project.id} project={project} onApply={onApply} />
        ))}
      </div>

      {hasMore && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full mt-3 py-3 text-sm text-gray-600 hover:text-dark hover:bg-gray-50 rounded-lg transition-colors flex items-center justify-center gap-1"
        >
          {isExpanded ? (
            <>
              접기
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </>
          ) : (
            <>
              더보기 ({projects.length - 3}개 더 보기)
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </>
          )}
        </button>
      )}
    </section>
  )
}
