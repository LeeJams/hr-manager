'use client'

import {useState} from 'react'
import {useRouter} from 'next/navigation'
import MobileContainer from '@/components/MobileContainer'
import {checkUserByCi} from '@/lib/api/auth'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: 실제 로그인 로직 구현
    router.push('/home')
  }

  const handleSocialLogin = async (provider: 'kakao' | 'apple') => {
    setLoading(true)
    try {
      // TODO: 실제 카카오/애플 로그인 SDK 연동
      // 여기서는 임시로 CI 값과 사용자 정보를 생성합니다
      const mockCi = `${provider}_${Date.now()}_mock_ci`

      // 카카오/애플에서 받아온 사용자 정보 (실제로는 SDK에서 가져옴)
      const mockUserInfo = provider === 'kakao' ? {
        name: '홍길동',
        email: 'hong@kakao.com',
        phone: '01012345678',
        birthDate: '1990-01-01',
        gender: 'male' as 'male' | 'female',
      } : {
        // 애플은 최소한의 정보만 제공
        email: 'user@privaterelay.appleid.com',
      }

      // CI 값으로 회원 조회
      const response = await checkUserByCi({
        ci: mockCi,
        provider,
      })

      if (response.exists) {
        // 회원 존재 - 로그인 처리
        console.log('기존 회원 로그인:', response.userId)
        router.push('/home')
      } else {
        // 회원 미존재 - 회원가입 확인
        const confirmed = window.confirm('회원가입을 하시겠습니까?')
        if (confirmed) {
          // CI, provider 및 사용자 정보를 sessionStorage에 저장
          sessionStorage.setItem('ci', mockCi)
          sessionStorage.setItem('provider', provider)
          sessionStorage.setItem('socialUserInfo', JSON.stringify(mockUserInfo))
          router.push('/signup/terms')
        }
      }
    } catch (error) {
      console.error(`${provider} 로그인 오류:`, error)
      alert('로그인 중 오류가 발생했습니다. 다시 시도해주세요.')
    } finally {
      setLoading(false)
    }
  }

  const handleKakaoLogin = () => {
    handleSocialLogin('kakao')
  }

  const handleAppleLogin = () => {
    handleSocialLogin('apple')
  }

  return (
    <MobileContainer>
      <div className="min-h-screen bg-light flex flex-col">
        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-md">
            {/* TechMeet 로고 */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-dark tracking-tight">TechMeet</h1>
            </div>

            {/* 로그인 폼 */}
            <form onSubmit={handleSubmit} className="space-y-4 mb-6">
              <div>
                <input
                  type="email"
                  placeholder="이메일"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark text-dark"
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="비밀번호"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark text-dark"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-dark text-light rounded-lg font-medium hover:bg-opacity-90 transition-opacity"
              >
                로그인
              </button>
            </form>

            {/* 이메일/비밀번호 찾기 */}
            <div className="flex justify-center gap-4 text-sm text-gray-600 mb-8">
              <button className="hover:text-dark">이메일 찾기</button>
              <span className="text-gray-400">|</span>
              <button className="hover:text-dark">비밀번호 찾기</button>
            </div>

            {/* 구분선 */}
            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-light text-gray-500">간편 로그인</span>
              </div>
            </div>

            {/* 간편 로그인 버튼 */}
            <div className="space-y-3">
              <button
                onClick={handleKakaoLogin}
                disabled={loading}
                className="w-full py-3 bg-kakao text-dark rounded-lg font-medium hover:bg-opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M12 3C6.486 3 2 6.262 2 10.29c0 2.546 1.693 4.773 4.236 6.066-.184.733-.685 2.772-.786 3.214-.127.562.207.554.437.403.186-.123 2.956-1.97 3.422-2.282.795.11 1.613.17 2.451.17 5.514 0 9.986-3.262 9.986-7.29C21.986 6.262 17.514 3 12 3z"/>
                </svg>
                {loading ? '로그인 중...' : '카카오톡 로그인'}
              </button>
              <button
                onClick={handleAppleLogin}
                disabled={loading}
                className="w-full py-3 bg-dark text-light rounded-lg font-medium hover:bg-opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                {loading ? '로그인 중...' : 'Apple 로그인'}
              </button>
            </div>
          </div>
        </div>

        {/* 하단 고객센터/회사정보 */}
        <footer className="border-t border-gray-200 py-6 px-4">
          <div className="max-w-md mx-auto text-center text-sm text-gray-600 space-y-2">
            <div>
              <button className="hover:text-dark">고객센터</button>
            </div>
            <div className="text-xs text-gray-500">
              <p>회사정보</p>
            </div>
          </div>
        </footer>
      </div>
    </MobileContainer>
  )
}