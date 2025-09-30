import axios from 'axios'
import type {
  MyPageProfile,
  CurrentProjectInfo,
  UpdateProfileRequest,
  ProfileImageUploadResponse,
} from '@/types/mypage'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api'

// 마이페이지 프로필 조회
export const getMyPageProfile = async (): Promise<MyPageProfile> => {
  try {
    const response = await axios.get<MyPageProfile>(`${API_BASE_URL}/mypage/profile`)
    return response.data
  } catch (error) {
    console.error('Get mypage profile error:', error)
    throw error
  }
}

// 프로필 업데이트
export const updateProfile = async (data: UpdateProfileRequest): Promise<MyPageProfile> => {
  try {
    const response = await axios.put<MyPageProfile>(`${API_BASE_URL}/mypage/profile`, data)
    return response.data
  } catch (error) {
    console.error('Update profile error:', error)
    throw error
  }
}

// 프로필 이미지 업로드
export const uploadProfileImage = async (file: File): Promise<ProfileImageUploadResponse> => {
  try {
    const formData = new FormData()
    formData.append('image', file)

    const response = await axios.post<ProfileImageUploadResponse>(
      `${API_BASE_URL}/mypage/profile/image`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    return response.data
  } catch (error) {
    console.error('Upload profile image error:', error)
    throw error
  }
}

// 현재/지원 프로젝트 조회
export const getCurrentProjects = async (): Promise<CurrentProjectInfo[]> => {
  try {
    const response = await axios.get<CurrentProjectInfo[]>(`${API_BASE_URL}/mypage/projects`)
    return response.data
  } catch (error) {
    console.error('Get current projects error:', error)
    throw error
  }
}