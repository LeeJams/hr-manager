export enum ProjectStatus {
  PLANNING = 'PLANNING', // 기획 중
  IN_PROGRESS = 'IN_PROGRESS', // 진행 중
  ON_HOLD = 'ON_HOLD', // 보류
  COMPLETED = 'COMPLETED', // 완료
  CANCELLED = 'CANCELLED', // 취소
}

export interface ProjectMember {
  id: string
  name: string
  role: string
  avatar?: string
}

export interface Project {
  id: string
  name: string
  description: string
  status: ProjectStatus
  progress: number // 0-100
  startDate: string // ISO date string
  endDate?: string // ISO date string
  clientName?: string
  team: ProjectMember[]
  technology?: string[]
  createdAt: string
  updatedAt: string
}

export interface ProjectListResponse {
  projects: Project[]
  total: number
  page: number
  pageSize: number
}