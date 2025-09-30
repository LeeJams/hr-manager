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
  // 스케줄 관련
  applicationStartDate?: string // 지원 시작일
  applicationEndDate?: string // 지원 마감일
  deploymentDate?: string // 투입 예정일
  // 프로젝트 구분
  isRequested?: boolean // 관리자 요청 여부
  isApplied?: boolean // 신청 여부
  isRecommended?: boolean // 추천 여부
}

export interface ProjectListResponse {
  projects: Project[]
  total: number
  page: number
  pageSize: number
}