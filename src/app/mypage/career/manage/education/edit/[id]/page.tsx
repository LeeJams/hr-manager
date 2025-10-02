'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import MainLayout from '@/components/layout/MainLayout'
import { EducationLevel, GraduationStatus } from '@/types/career'
import type { Education } from '@/types/career'

export default function EditEducationPage() {
  const params = useParams()
  const router = useRouter()
  const eduId = params.id as string

  const [isLoading, setIsLoading] = useState(false)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState<Omit<Education, 'createdAt' | 'updatedAt'>>({
    id: '',
    level: EducationLevel.BACHELOR,
    status: GraduationStatus.GRADUATED,
    schoolName: '',
    startDate: '',
    endDate: '',
    major: '',
  })

  useEffect(() => {
    // TODO: API로부터 데이터 가져오기
    const mockData: Education = {
      id: eduId,
      level: EducationLevel.BACHELOR,
      status: GraduationStatus.GRADUATED,
      schoolName: '한국대학교',
      startDate: '2012-03-01',
      endDate: '2016-02-20',
      major: '컴퓨터공학',
    }

    setFormData(mockData)
    setLoading(false)
  }, [eduId])

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // TODO: API 호출
      console.log('Updating education:', formData)
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Mock delay

      alert('학력이 수정되었습니다.')
      router.push('/mypage/career/manage')
    } catch (error) {
      console.error('Update error:', error)
      alert('수정 중 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  if (loading) {
    return (
      <MainLayout showBackButton backHref="/mypage/career/manage" headerTitle="학력 수정">
        <div className="flex items-center justify-center py-12">
          <p className="text-gray-500">로딩 중...</p>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout showBackButton backHref="/mypage/career/manage" headerTitle="학력 수정">
      <main className="p-6">
        <form onSubmit={handleSubmit}>
          {/* 학력 구분 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-dark mb-2">
              학력 구분 <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.level}
              onChange={(e) => handleChange('level', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark"
              required
            >
              <option value={EducationLevel.HIGH_SCHOOL}>고등학교</option>
              <option value={EducationLevel.ASSOCIATE}>전문학사</option>
              <option value={EducationLevel.BACHELOR}>학사</option>
              <option value={EducationLevel.MASTER}>석사</option>
              <option value={EducationLevel.DOCTORATE}>박사</option>
            </select>
          </div>

          {/* 졸업 구분 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-dark mb-2">
              졸업 구분 <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.status}
              onChange={(e) => handleChange('status', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark"
              required
            >
              <option value={GraduationStatus.GRADUATED}>졸업</option>
              <option value={GraduationStatus.EXPECTED}>졸업예정</option>
              <option value={GraduationStatus.ENROLLED}>재학중</option>
              <option value={GraduationStatus.LEAVE}>휴학</option>
              <option value={GraduationStatus.DROPPED}>중퇴</option>
            </select>
          </div>

          {/* 학교명 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-dark mb-2">
              학교명 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.schoolName}
              onChange={(e) => handleChange('schoolName', e.target.value)}
              placeholder="예: 한국대학교"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark"
              required
            />
          </div>

          {/* 입학일 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-dark mb-2">
              입학일 <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => handleChange('startDate', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark"
              required
            />
          </div>

          {/* 졸업일 */}
          {formData.status !== GraduationStatus.ENROLLED && formData.status !== GraduationStatus.LEAVE && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-dark mb-2">
                졸업일 {formData.status === GraduationStatus.EXPECTED ? '(예정일)' : ''}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={formData.endDate || ''}
                onChange={(e) => handleChange('endDate', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark"
                required
              />
            </div>
          )}

          {/* 전공 */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-dark mb-2">
              전공 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.major}
              onChange={(e) => handleChange('major', e.target.value)}
              placeholder="예: 컴퓨터공학"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark"
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
