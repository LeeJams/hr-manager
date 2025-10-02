'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import MainLayout from '@/components/layout/MainLayout'
import type { Certificate } from '@/types/career'

export default function AddCertificatePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<Omit<Certificate, 'id' | 'createdAt' | 'updatedAt'>>({
    name: '',
    acquisitionDate: '',
    issuer: '',
    note: '',
  })
  const [file, setFile] = useState<File | null>(null)

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // TODO: 파일 업로드 및 API 호출
      console.log('Adding certificate:', formData)
      if (file) {
        console.log('Uploading file:', file.name)
      }
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Mock delay

      alert('자격증이 추가되었습니다.')
      router.push('/mypage/career/manage')
    } catch (error) {
      console.error('Add error:', error)
      alert('추가 중 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <MainLayout showBackButton backHref="/mypage/career/manage" headerTitle="자격증 추가">
      <main className="p-6">
        <form onSubmit={handleSubmit}>
          {/* 자격증명 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-dark mb-2">
              자격증명 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="예: 정보처리기사"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark"
              required
            />
          </div>

          {/* 취득일 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-dark mb-2">
              취득일 <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={formData.acquisitionDate}
              onChange={(e) => handleChange('acquisitionDate', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark"
              required
            />
          </div>

          {/* 발행기관 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-dark mb-2">
              발행기관 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.issuer}
              onChange={(e) => handleChange('issuer', e.target.value)}
              placeholder="예: 한국산업인력공단"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark"
              required
            />
          </div>

          {/* 특이사항 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-dark mb-2">특이사항</label>
            <textarea
              value={formData.note}
              onChange={(e) => handleChange('note', e.target.value)}
              placeholder="추가로 기록할 내용이 있다면 입력하세요"
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark resize-none"
            />
          </div>

          {/* 첨부파일 */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-dark mb-2">자격증 첨부 (선택)</label>
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*,.pdf"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark"
            />
            {file && <p className="mt-2 text-sm text-gray-600">선택된 파일: {file.name}</p>}
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
