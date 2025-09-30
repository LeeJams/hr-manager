export interface CheckCIRequest {
  ci: string
  provider: 'kakao' | 'apple'
}

export interface CheckCIResponse {
  exists: boolean
  userId?: string
  message?: string
}

export interface CheckEmailRequest {
  email: string
}

export interface CheckEmailResponse {
  available: boolean
  message?: string
}

export interface CheckPhoneRequest {
  phone: string
}

export interface CheckPhoneResponse {
  available: boolean
  message?: string
}

export interface SignUpRequest {
  ci: string
  provider: 'kakao' | 'apple'
  name: string
  birthDate: string // YYYY-MM-DD
  gender: 'male' | 'female' | 'other'
  email: string
  phone: string
  agreements: {
    age14: boolean
    terms: boolean
    privacy: boolean
    optionalPrivacy: boolean
    marketing: boolean
  }
}

export interface SignUpResponse {
  success: boolean
  userId?: string
  message?: string
}

export interface TermsAgreement {
  age14: boolean
  terms: boolean
  privacy: boolean
  optionalPrivacy: boolean
  marketing: boolean
}

export interface SocialUserInfo {
  name?: string
  email?: string
  phone?: string
  birthDate?: string
  gender?: 'male' | 'female'
}