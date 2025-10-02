'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import MainLayout from '@/components/layout/MainLayout'
import type { ProjectCareer } from '@/types/career'

export default function AddProjectCareerPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<Omit<ProjectCareer, 'id' | 'createdAt' | 'updatedAt'>>({
    projectName: '',
    clientName: '',
    startDate: '',
    endDate: '',
    orderer: '',
    environment: [],
    responsibilities: '',
  })
  const [isOngoing, setIsOngoing] = useState(false)
  const [techInput, setTechInput] = useState('')

  const handleChange = (field: keyof typeof formData, value: string | string[]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleAddTech = () => {
    if (techInput.trim() && !formData.environment.includes(techInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        environment: [...prev.environment, techInput.trim()],
      }))
      setTechInput('')
    }
  }

  const handleRemoveTech = (tech: string) => {
    setFormData((prev) => ({
      ...prev,
      environment: prev.environment.filter((t) => t !== tech),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // TODO: API 호출
      const submitData = {
        ...formData,
        endDate: isOngoing ? undefined : formData.endDate,
      }
      console.log('Adding project career:', submitData)
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Mock delay

      alert('프로젝트 경력이 추가되었습니다.')
      router.push('/mypage/career/manage')
    } catch (error) {
      console.error('Add error:', error)
      alert('추가 중 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <MainLayout showBackButton backHref="/mypage/career/manage" headerTitle="프로젝트 경력 추가">
      <main className="p-6">
        <form onSubmit={handleSubmit}>
          {/* 프로젝트명 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-dark mb-2">
              프로젝트명 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.projectName}
              onChange={(e) => handleChange('projectName', e.target.value)}
              placeholder="프로젝트명을 입력하세요"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark"
              required
            />
          </div>

          {/* 고객사명 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-dark mb-2">
              고객사명 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.clientName}
              onChange={(e) => handleChange('clientName', e.target.value)}
              placeholder="고객사명을 입력하세요"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark"
              required
            />
          </div>

          {/* 발주처 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-dark mb-2">
              발주처 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.orderer}
              onChange={(e) => handleChange('orderer', e.target.value)}
              placeholder="발주처를 입력하세요"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark"
              required
            />
          </div>

          {/* 시작일 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-dark mb-2">
              시작일 <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => handleChange('startDate', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark"
              required
            />
          </div>

          {/* 진행 중 체크박스 */}
          <div className="mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isOngoing}
                onChange={(e) => setIsOngoing(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm text-dark">현재 진행 중</span>
            </label>
          </div>

          {/* 종료일 */}
          {!isOngoing && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-dark mb-2">종료일</label>
              <input
                type="date"
                value={formData.endDate || ''}
                onChange={(e) => handleChange('endDate', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark"
              />
            </div>
          )}

          {/* 개발환경/기술스택 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-dark mb-2">개발환경/기술스택</label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTech())}
                placeholder="기술 입력 후 추가 버튼 클릭"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark"
              />
              <button
                type="button"
                onClick={handleAddTech}
                className="px-4 py-3 bg-dark text-light rounded-lg hover:bg-opacity-90 transition-colors"
              >
                추가
              </button>
            </div>
            {formData.environment.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.environment.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full flex items-center gap-2"
                  >
                    {tech}
                    <button
                      type="button"
                      onClick={() => handleRemoveTech(tech)}
                      className="text-blue-700 hover:text-blue-900"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* 담당업무 */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-dark mb-2">
              담당업무 <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.responsibilities}
              onChange={(e) => handleChange('responsibilities', e.target.value)}
              placeholder="담당했던 주요 업무를 입력하세요"
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark resize-none"
              required
            />
          </div>

          {/* 버튼 */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 py-3 border border-gray-300 rounded-lg text-dark hover:bg-gray-50 transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 py-3 bg-dark text-light rounded-lg hover:bg-opacity-90 transition-colors disabled:opacity-50"
            >
              {isLoading ? '저장 중...' : '저장'}
            </button>
          </div>
        </form>
      </main>
    </MainLayout>
  )
}
