'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import MainLayout from '@/components/layout/MainLayout'

export default function ProfileEditPage() {
  const router = useRouter()

  // TODO: API로부터 현재 정보 가져오기
  const [formData, setFormData] = useState({
    name: '김테크',
    birthDate: '1990-01-15',
    gender: 'male' as 'male' | 'female' | 'other',
    email: 'tech@techmeet.com',
    phone: '010-1234-5678',
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (field: string, value: string) => {
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
      console.log('Updating profile:', formData)
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Mock delay

      alert('개인정보가 수정되었습니다.')
      router.push('/mypage')
    } catch (error) {
      console.error('Update error:', error)
      alert('수정 중 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <MainLayout showBackButton backHref="/mypage" headerTitle="개인정보 수정" showBottomNav={false}>
      <form onSubmit={handleSubmit} className="p-6">
          {/* 이름 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-dark mb-2">이름</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark"
              required
            />
          </div>

          {/* 생년월일 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-dark mb-2">생년월일</label>
            <input
              type="date"
              value={formData.birthDate}
              onChange={(e) => handleChange('birthDate', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark"
              required
            />
          </div>

          {/* 성별 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-dark mb-2">성별</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === 'male'}
                  onChange={(e) => handleChange('gender', e.target.value)}
                  className="w-4 h-4"
                />
                <span className="text-sm">남성</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === 'female'}
                  onChange={(e) => handleChange('gender', e.target.value)}
                  className="w-4 h-4"
                />
                <span className="text-sm">여성</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  checked={formData.gender === 'other'}
                  onChange={(e) => handleChange('gender', e.target.value)}
                  className="w-4 h-4"
                />
                <span className="text-sm">기타</span>
              </label>
            </div>
          </div>

          {/* 이메일 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-dark mb-2">이메일</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark"
              required
            />
          </div>

          {/* 휴대폰 */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-dark mb-2">휴대폰 번호</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="010-1234-5678"
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
    </MainLayout>
  )
}