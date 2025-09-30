import axios from 'axios'
import type {
  CheckCIRequest,
  CheckCIResponse,
  CheckEmailRequest,
  CheckEmailResponse,
  CheckPhoneRequest,
  CheckPhoneResponse,
  SignUpRequest,
  SignUpResponse,
} from '@/types/auth'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api'

// CI 값으로 회원 조회
export const checkUserByCi = async (data: CheckCIRequest): Promise<CheckCIResponse> => {
  try {
    const response = await axios.post<CheckCIResponse>(`${API_BASE_URL}/auth/check-ci`, data)
    return response.data
  } catch (error) {
    console.error('CI check error:', error)
    throw error
  }
}

// 이메일 중복 확인
export const checkEmailAvailable = async (data: CheckEmailRequest): Promise<CheckEmailResponse> => {
  try {
    const response = await axios.post<CheckEmailResponse>(`${API_BASE_URL}/auth/check-email`, data)
    return response.data
  } catch (error) {
    console.error('Email check error:', error)
    throw error
  }
}

// 전화번호 중복 확인
export const checkPhoneAvailable = async (data: CheckPhoneRequest): Promise<CheckPhoneResponse> => {
  try {
    const response = await axios.post<CheckPhoneResponse>(`${API_BASE_URL}/auth/check-phone`, data)
    return response.data
  } catch (error) {
    console.error('Phone check error:', error)
    throw error
  }
}

// 회원가입
export const signUp = async (data: SignUpRequest): Promise<SignUpResponse> => {
  try {
    const response = await axios.post<SignUpResponse>(`${API_BASE_URL}/auth/signup`, data)
    return response.data
  } catch (error) {
    console.error('Sign up error:', error)
    throw error
  }
}