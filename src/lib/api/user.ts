import axios from 'axios'
import type { User, UserProfile } from '@/types/user'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api'

// 사용자 프로필 조회
export const getUserProfile = async (): Promise<UserProfile> => {
  try {
    const response = await axios.get<UserProfile>(`${API_BASE_URL}/user/profile`)
    return response.data
  } catch (error) {
    console.error('Get user profile error:', error)
    throw error
  }
}

// 사용자 정보 조회
export const getUserInfo = async (userId: string): Promise<User> => {
  try {
    const response = await axios.get<User>(`${API_BASE_URL}/user/${userId}`)
    return response.data
  } catch (error) {
    console.error('Get user info error:', error)
    throw error
  }
}

// 사용자 정보 업데이트
export const updateUserProfile = async (userId: string, data: Partial<User>): Promise<User> => {
  try {
    const response = await axios.patch<User>(`${API_BASE_URL}/user/${userId}`, data)
    return response.data
  } catch (error) {
    console.error('Update user profile error:', error)
    throw error
  }
}