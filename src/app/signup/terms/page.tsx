'use client'

import {useState} from 'react'
import {useRouter} from 'next/navigation'
import MobileContainer from '@/components/MobileContainer'
import type {TermsAgreement} from '@/types/auth'

export default function TermsPage() {
  const router = useRouter()
  const [agreements, setAgreements] = useState<TermsAgreement>({
    age14: false,
    terms: false,
    privacy: false,
    optionalPrivacy: false,
    marketing: false,
  })

  const [showModal, setShowModal] = useState<string | null>(null)

  const handleToggle = (key: keyof TermsAgreement) => {
    setAgreements((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const handleAllAgree = () => {
    const allAgreed = agreements.age14 && agreements.terms && agreements.privacy
    setAgreements({
      age14: !allAgreed,
      terms: !allAgreed,
      privacy: !allAgreed,
      optionalPrivacy: !allAgreed,
      marketing: !allAgreed,
    })
  }

  const canProceed = agreements.age14 && agreements.terms && agreements.privacy

  const handleNext = () => {
    if (!canProceed) {
      alert('필수 약관에 모두 동의해주세요.')
      return
    }

    // TODO: 본인인증 로직 추후 개발
    // 현재는 바로 회원가입 페이지로 이동
    sessionStorage.setItem('agreements', JSON.stringify(agreements))
    router.push('/signup/register')
  }

  const handleViewDetail = (type: string) => {
    setShowModal(type)
  }

  return (
    <MobileContainer>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* 헤더 */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
          <div className="flex items-center">
            <button
              onClick={() => router.back()}
              className="mr-3 p-1 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="뒤로가기"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-lg font-semibold text-gray-900">약관 동의</h1>
          </div>
        </header>

        {/* 컨텐츠 */}
        <div className="flex-1 px-5 py-6 overflow-y-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">
              서비스 이용약관에
            </h2>
            <h2 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">
              동의해주세요
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              서비스 이용을 위해 아래 약관에 동의가 필요합니다.
            </p>
          </div>

          {/* 전체 동의 */}
          <div className="bg-white rounded-xl p-5 mb-4 border-2 border-gray-900 shadow-sm">
            <label className="flex items-center justify-between cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={agreements.age14 && agreements.terms && agreements.privacy && agreements.optionalPrivacy && agreements.marketing}
                    onChange={handleAllAgree}
                    className="w-6 h-6 rounded-md border-2 border-gray-300 checked:bg-gray-900 checked:border-gray-900 cursor-pointer transition-all"
                  />
                  {agreements.age14 && agreements.terms && agreements.privacy && agreements.optionalPrivacy && agreements.marketing && (
                    <svg className="w-4 h-4 text-white absolute top-1 left-1 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="font-bold text-gray-900 text-base group-hover:text-gray-700 transition-colors">
                  전체 동의
                </span>
              </div>
            </label>
          </div>

          {/* 개별 약관 */}
          <div className="space-y-2.5">
            {/* 1. 만 14세 이상 */}
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <label className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center gap-3 flex-1">
                  <div className="relative flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={agreements.age14}
                      onChange={() => handleToggle('age14')}
                      className="w-5 h-5 rounded border-2 border-gray-300 checked:bg-gray-900 checked:border-gray-900 cursor-pointer transition-all"
                    />
                    {agreements.age14 && (
                      <svg className="w-3 h-3 text-white absolute top-1 left-1 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="text-gray-800 text-sm group-hover:text-gray-600 transition-colors">
                    <span className="text-red-600 font-semibold">[필수]</span> 만 14세 이상입니다
                  </span>
                </div>
              </label>
            </div>

            {/* 2. 이용약관 */}
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <label className="flex items-center justify-between cursor-pointer group mb-2">
                <div className="flex items-center gap-3 flex-1">
                  <div className="relative flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={agreements.terms}
                      onChange={() => handleToggle('terms')}
                      className="w-5 h-5 rounded border-2 border-gray-300 checked:bg-gray-900 checked:border-gray-900 cursor-pointer transition-all"
                    />
                    {agreements.terms && (
                      <svg className="w-3 h-3 text-white absolute top-1 left-1 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="text-gray-800 text-sm group-hover:text-gray-600 transition-colors">
                    <span className="text-red-600 font-semibold">[필수]</span> 이용약관 동의
                  </span>
                </div>
              </label>
              <button
                onClick={() => handleViewDetail('terms')}
                className="text-xs text-gray-500 hover:text-gray-700 underline ml-8 transition-colors"
              >
                자세히 보기
              </button>
            </div>

            {/* 3. 개인정보 수집 및 이용 동의 (필수) */}
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <label className="flex items-center justify-between cursor-pointer group mb-2">
                <div className="flex items-center gap-3 flex-1">
                  <div className="relative flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={agreements.privacy}
                      onChange={() => handleToggle('privacy')}
                      className="w-5 h-5 rounded border-2 border-gray-300 checked:bg-gray-900 checked:border-gray-900 cursor-pointer transition-all"
                    />
                    {agreements.privacy && (
                      <svg className="w-3 h-3 text-white absolute top-1 left-1 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="text-gray-800 text-sm group-hover:text-gray-600 transition-colors">
                    <span className="text-red-600 font-semibold">[필수]</span> 개인정보 수집 및 이용 동의
                  </span>
                </div>
              </label>
              <button
                onClick={() => handleViewDetail('privacy')}
                className="text-xs text-gray-500 hover:text-gray-700 underline ml-8 transition-colors"
              >
                자세히 보기
              </button>
            </div>

            {/* 4. 개인정보 수집 및 이용 동의 (선택) */}
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <label className="flex items-center justify-between cursor-pointer group mb-2">
                <div className="flex items-center gap-3 flex-1">
                  <div className="relative flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={agreements.optionalPrivacy}
                      onChange={() => handleToggle('optionalPrivacy')}
                      className="w-5 h-5 rounded border-2 border-gray-300 checked:bg-gray-900 checked:border-gray-900 cursor-pointer transition-all"
                    />
                    {agreements.optionalPrivacy && (
                      <svg className="w-3 h-3 text-white absolute top-1 left-1 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="text-gray-800 text-sm group-hover:text-gray-600 transition-colors">
                    <span className="text-gray-500 font-semibold">[선택]</span> 개인정보 수집 및 이용 동의
                  </span>
                </div>
              </label>
              <button
                onClick={() => handleViewDetail('optionalPrivacy')}
                className="text-xs text-gray-500 hover:text-gray-700 underline ml-8 transition-colors"
              >
                자세히 보기
              </button>
            </div>

            {/* 5. 광고성 정보 수신 동의 */}
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <label className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center gap-3 flex-1">
                  <div className="relative flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={agreements.marketing}
                      onChange={() => handleToggle('marketing')}
                      className="w-5 h-5 rounded border-2 border-gray-300 checked:bg-gray-900 checked:border-gray-900 cursor-pointer transition-all"
                    />
                    {agreements.marketing && (
                      <svg className="w-3 h-3 text-white absolute top-1 left-1 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="text-gray-800 text-sm group-hover:text-gray-600 transition-colors">
                    <span className="text-gray-500 font-semibold">[선택]</span> 광고성 정보 수신 모두 동의
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="p-5 bg-white border-t border-gray-200 sticky bottom-0">
          <button
            onClick={handleNext}
            disabled={!canProceed}
            className={`w-full py-4 rounded-xl font-bold text-white transition-all transform active:scale-95 ${
              canProceed
                ? 'bg-gray-900 hover:bg-gray-800 shadow-md hover:shadow-lg'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            다음
          </button>
        </div>

        {/* 모달 */}
        {showModal && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-end z-50 animate-fade-in"
            onClick={() => setShowModal(null)}
          >
            <div
              className="bg-white rounded-t-3xl w-full max-h-[80vh] overflow-y-auto animate-slide-up shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 px-5 py-4 flex justify-between items-center rounded-t-3xl">
                <h3 className="text-lg font-bold text-gray-900">
                  {showModal === 'terms' && '이용약관'}
                  {showModal === 'privacy' && '개인정보 수집 및 이용 동의 (필수)'}
                  {showModal === 'optionalPrivacy' && '개인정보 수집 및 이용 동의 (선택)'}
                </h3>
                <button
                  onClick={() => setShowModal(null)}
                  className="text-gray-500 hover:text-gray-700 p-1 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="닫기"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-5">
                <div className="text-sm text-gray-700 space-y-4 leading-relaxed">
                  <p className="font-semibold text-gray-900">약관 내용이 여기에 표시됩니다.</p>
                  <p>실제 서비스에서는 각 약관의 상세 내용을 표시해야 합니다.</p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-xs text-gray-600">
                      이 영역에 실제 약관 내용을 추가하세요.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MobileContainer>
  )
}