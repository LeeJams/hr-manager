export enum UserStatus {
  DEPLOYED = 'DEPLOYED', // 투입 중
  DEVELOPING = 'DEVELOPING', // 개발 중
  STANDBY = 'STANDBY', // 대기 중
  ON_VACATION = 'ON_VACATION', // 휴가 중
  TRAINING = 'TRAINING', // 교육 중
}

export interface CareerInfo {
  years: number
  months: number
  startDate: string // ISO date string
}

export interface User {
  id: string
  name: string
  email: string
  status: UserStatus
  career: CareerInfo
  role?: string
  team?: string
  avatar?: string
}

export interface UserProfile {
  user: User
  currentProject?: {
    id: string
    name: string
  }
}