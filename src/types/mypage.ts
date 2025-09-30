import type { UserStatus, CareerInfo } from './user'
import type { Project } from './project'

// 마이페이지 프로필
export interface MyPageProfile {
  id: string
  name: string
  email: string
  phone: string
  avatar?: string // 프로필 사진 URL
  status: UserStatus // 현재 상태 (투입 중, 대기 중 등)
  totalCareer: CareerInfo // 총 경력
  skills: string[] // 보유 스킬
  currentProject?: CurrentProjectInfo // 현재 투입 중인 프로젝트
  appliedProjects?: CurrentProjectInfo[] // 지원한 프로젝트 목록
}

// 현재/지원 프로젝트 정보 (간단 버전)
export interface CurrentProjectInfo {
  id: string
  name: string
  clientName?: string
  startDate: string
  endDate?: string
  role: string // 역할
  status: 'applied' | 'ongoing' | 'completed' // 지원함, 진행중, 완료
}

// 프로필 업데이트 요청
export interface UpdateProfileRequest {
  name?: string
  phone?: string
  avatar?: string
  skills?: string[]
}

// 프로필 이미지 업로드 응답
export interface ProfileImageUploadResponse {
  url: string
  thumbnailUrl?: string
}