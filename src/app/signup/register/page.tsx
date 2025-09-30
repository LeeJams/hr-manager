'use client'

import {useState, useEffect} from 'react'
import {useRouter} from 'next/navigation'
import MobileContainer from '@/components/MobileContainer'
import {checkEmailAvailable, checkPhoneAvailable, signUp} from '@/lib/api/auth'
import type {TermsAgreement, SocialUserInfo} from '@/types/auth'

export default function RegisterPage() {
  const router = useRouter()
  const [agreements, setAgreements] = useState<TermsAgreement | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    gender: '' as 'male' | 'female' | 'other' | '',
    email: '',
    phone: '',
  })

  const [validation, setValidation] = useState({
    emailChecked: false,
    emailAvailable: false,
    phoneChecked: false,
    phoneAvailable: false,
  })

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{[key: string]: string}>({})

  useEffect(() => {
    // 약관 동의 정보 가져오기
    const savedAgreements = sessionStorage.getItem('agreements')
    const ci = sessionStorage.getItem('ci')
    const provider = sessionStorage.getItem('provider')
    const socialUserInfoStr = sessionStorage.getItem('socialUserInfo')

    if (!savedAgreements || !ci || !provider) {
      alert('잘못된 접근입니다.')
      router.push('/login')
      return
    }

    setAgreements(JSON.parse(savedAgreements))

    // 소셜 로그인에서 받아온 사용자 정보로 폼 데이터 초기화
    if (socialUserInfoStr) {
      try {
        const socialUserInfo: SocialUserInfo = JSON.parse(socialUserInfoStr)
        setFormData((prev) => ({
          ...prev,
          name: socialUserInfo.name || prev.name,
          email: socialUserInfo.email || prev.email,
          phone: socialUserInfo.phone || prev.phone,
          birthDate: socialUserInfo.birthDate || prev.birthDate,
          gender: socialUserInfo.gender || prev.gender,
        }))
      } catch (error) {
        console.error('소셜 사용자 정보 파싱 오류:', error)
      }
    }
  }, [router])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({...prev, [field]: value}))

    // 이메일이나 전화번호가 변경되면 중복확인 초기화
    if (field === 'email') {
      setValidation((prev) => ({...prev, emailChecked: false, emailAvailable: false}))
      setErrors((prev) => {
        const {email, ...rest} = prev
        return rest
      })
    }
    if (field === 'phone') {
      setValidation((prev) => ({...prev, phoneChecked: false, phoneAvailable: false}))
      setErrors((prev) => {
        const {phone, ...rest} = prev
        return rest
      })
    }
  }

  const handleCheckEmail = async () => {
    if (!formData.email) {
      setErrors((prev) => ({...prev, email: '이메일을 입력해주세요.'}))
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setErrors((prev) => ({...prev, email: '올바른 이메일 형식이 아닙니다.'}))
      return
    }

    setLoading(true)
    try {
      const response = await checkEmailAvailable({email: formData.email})
      if (response.available) {
        setValidation((prev) => ({...prev, emailChecked: true, emailAvailable: true}))
        setErrors((prev) => {
          const {email, ...rest} = prev
          return rest
        })
        alert('사용 가능한 이메일입니다.')
      } else {
        setValidation((prev) => ({...prev, emailChecked: true, emailAvailable: false}))
        setErrors((prev) => ({...prev, email: '이미 사용 중인 이메일입니다. 다른 이메일을 입력해주세요.'}))
      }
    } catch (error) {
      console.error('Email check error:', error)
      setErrors((prev) => ({...prev, email: '이메일 확인 중 오류가 발생했습니다.'}))
    } finally {
      setLoading(false)
    }
  }

  const handleCheckPhone = async () => {
    if (!formData.phone) {
      setErrors((prev) => ({...prev, phone: '전화번호를 입력해주세요.'}))
      return
    }

    const phoneRegex = /^01[0-9]{8,9}$/
    if (!phoneRegex.test(formData.phone.replace(/-/g, ''))) {
      setErrors((prev) => ({...prev, phone: '올바른 전화번호 형식이 아닙니다.'}))
      return
    }

    setLoading(true)
    try {
      const response = await checkPhoneAvailable({phone: formData.phone})
      if (response.available) {
        setValidation((prev) => ({...prev, phoneChecked: true, phoneAvailable: true}))
        setErrors((prev) => {
          const {phone, ...rest} = prev
          return rest
        })
        alert('사용 가능한 전화번호입니다.')
      } else {
        setValidation((prev) => ({...prev, phoneChecked: true, phoneAvailable: false}))
        setErrors((prev) => ({...prev, phone: '이미 등록된 전화번호입니다. 다른 번호를 입력해주세요.'}))
      }
    } catch (error) {
      console.error('Phone check error:', error)
      setErrors((prev) => ({...prev, phone: '전화번호 확인 중 오류가 발생했습니다.'}))
    } finally {
      setLoading(false)
    }
  }

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}

    if (!formData.name.trim()) {
      newErrors.name = '이름을 입력해주세요.'
    }

    if (!formData.birthDate) {
      newErrors.birthDate = '생년월일을 입력해주세요.'
    }

    if (!formData.gender) {
      newErrors.gender = '성별을 선택해주세요.'
    }

    if (!formData.email) {
      newErrors.email = '이메일을 입력해주세요.'
    } else if (!validation.emailChecked || !validation.emailAvailable) {
      newErrors.email = '이메일 중복확인을 해주세요.'
    }

    if (!formData.phone) {
      newErrors.phone = '전화번호를 입력해주세요.'
    } else if (!validation.phoneChecked || !validation.phoneAvailable) {
      newErrors.phone = '전화번호 중복확인을 해주세요.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    const ci = sessionStorage.getItem('ci')
    const provider = sessionStorage.getItem('provider') as 'kakao' | 'apple'

    if (!ci || !provider || !agreements) {
      alert('잘못된 접근입니다.')
      router.push('/login')
      return
    }

    setLoading(true)
    try {
      const response = await signUp({
        ci,
        provider,
        name: formData.name,
        birthDate: formData.birthDate,
        gender: formData.gender as 'male' | 'female' | 'other',
        email: formData.email,
        phone: formData.phone,
        agreements,
      })

      if (response.success) {
        alert('회원가입이 완료되었습니다.')
        sessionStorage.removeItem('agreements')
        sessionStorage.removeItem('ci')
        sessionStorage.removeItem('provider')
        router.push('/home')
      } else {
        alert(response.message || '회원가입에 실패했습니다.')
      }
    } catch (error) {
      console.error('Sign up error:', error)
      alert('회원가입 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  if (!agreements) {
    return null
  }

  return (
    <MobileContainer>
      <div className="min-h-screen bg-light flex flex-col">
        {/* 헤더 */}
        <header className="bg-white border-b border-gray-200 px-4 py-4">
          <div className="flex items-center">
            <button onClick={() => router.back()} className="mr-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-xl font-bold text-dark">회원가입</h1>
          </div>
        </header>

        {/* 컨텐츠 */}
        <form onSubmit={handleSubmit} className="flex-1 px-4 py-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-dark mb-2">회원정보를</h2>
            <h2 className="text-2xl font-bold text-dark mb-4">입력해주세요</h2>
          </div>

          <div className="space-y-4">
            {/* 이름 */}
            <div>
              <label className="block text-sm font-medium text-dark mb-2">
                이름 <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="이름을 입력하세요"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark"
              />
              {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
            </div>

            {/* 생년월일 */}
            <div>
              <label className="block text-sm font-medium text-dark mb-2">
                생년월일 <span className="text-primary">*</span>
              </label>
              <input
                type="date"
                value={formData.birthDate}
                onChange={(e) => handleInputChange('birthDate', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark"
              />
              {errors.birthDate && <p className="text-sm text-red-500 mt-1">{errors.birthDate}</p>}
            </div>

            {/* 성별 */}
            <div>
              <label className="block text-sm font-medium text-dark mb-2">
                성별 <span className="text-primary">*</span>
              </label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => handleInputChange('gender', 'male')}
                  className={`flex-1 py-3 rounded-lg font-medium border transition-colors ${
                    formData.gender === 'male'
                      ? 'bg-dark text-white border-dark'
                      : 'bg-white text-gray-700 border-gray-300'
                  }`}
                >
                  남성
                </button>
                <button
                  type="button"
                  onClick={() => handleInputChange('gender', 'female')}
                  className={`flex-1 py-3 rounded-lg font-medium border transition-colors ${
                    formData.gender === 'female'
                      ? 'bg-dark text-white border-dark'
                      : 'bg-white text-gray-700 border-gray-300'
                  }`}
                >
                  여성
                </button>
              </div>
              {errors.gender && <p className="text-sm text-red-500 mt-1">{errors.gender}</p>}
            </div>

            {/* 이메일 */}
            <div>
              <label className="block text-sm font-medium text-dark mb-2">
                이메일 <span className="text-primary">*</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="example@email.com"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark"
                />
                <button
                  type="button"
                  onClick={handleCheckEmail}
                  disabled={loading || !formData.email}
                  className="px-4 py-3 bg-dark text-white rounded-lg font-medium hover:bg-opacity-90 transition-opacity disabled:bg-gray-300 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  중복확인
                </button>
              </div>
              {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
              {validation.emailChecked && validation.emailAvailable && (
                <p className="text-sm text-green-600 mt-1">✓ 사용 가능한 이메일입니다.</p>
              )}
            </div>

            {/* 전화번호 */}
            <div>
              <label className="block text-sm font-medium text-dark mb-2">
                전화번호 <span className="text-primary">*</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="01012345678"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark"
                />
                <button
                  type="button"
                  onClick={handleCheckPhone}
                  disabled={loading || !formData.phone}
                  className="px-4 py-3 bg-dark text-white rounded-lg font-medium hover:bg-opacity-90 transition-opacity disabled:bg-gray-300 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  중복확인
                </button>
              </div>
              {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
              {validation.phoneChecked && validation.phoneAvailable && (
                <p className="text-sm text-green-600 mt-1">✓ 사용 가능한 전화번호입니다.</p>
              )}
            </div>
          </div>
        </form>

        {/* 하단 버튼 */}
        <div className="p-4 bg-white border-t border-gray-200">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-4 bg-dark text-white rounded-lg font-bold hover:bg-opacity-90 transition-opacity disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {loading ? '처리 중...' : '회원가입 완료'}
          </button>
        </div>
      </div>
    </MobileContainer>
  )
}