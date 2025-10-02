export enum ProjectStatus {
  RECRUITING = 'RECRUITING', // 모집 중
  CLOSED = 'CLOSED', // 모집 마감
  IN_PROGRESS = 'IN_PROGRESS', // 진행 중
  COMPLETED = 'COMPLETED', // 완료
  CANCELLED = 'CANCELLED', // 취소
}

export enum ContractType {
  FREELANCE = 'FREELANCE', // 프리랜서
  OUTSOURCING = 'OUTSOURCING', // 위임계약
  EMPLOYEE = 'EMPLOYEE', // 정규직
  CONTRACT = 'CONTRACT', // 계약직
}

export enum WorkType {
  REMOTE = 'REMOTE', // 재택
  ONSITE = 'ONSITE', // 상주
  HYBRID = 'HYBRID', // 혼합
}

export interface ProjectRequirement {
  required: string[] // 필수 기술/자격
  preferred: string[] // 우대 사항
}

export interface Project {
  id: string
  title: string // 프로젝트 제목
  company?: string // 회사/클라이언트명

  // 프로젝트 개요
  overview: string // 프로젝트 개요
  projectStatus?: string // 프로젝트 진행 상황 (신규/진행중 등)
  systemStack?: string // 전체 시스템 구성

  // 상세 업무
  detailedWork: string // 상세 업무 내용

  // 기술 및 요건
  requiredSkills: string[] // 필수 기술
  preferredSkills?: string[] // 우대 사항
  qualifications?: string[] // 자격 요건

  // 계약 조건
  contractType: ContractType // 계약 형태
  workType: WorkType // 근무 형태
  experienceLevel: string // 경력 범위 (예: "4~15년 차")
  positions: number // 모집 인원

  // 일정
  contractStartDate?: string // 계약 시작일
  contractEndDate?: string // 계약 종료일
  applicationDeadline?: string // 지원 마감일
  interviewSchedule?: string // 인터뷰 일정

  // 기타 정보
  additionalNotes?: string // 기타 유의 사항

  // 상태
  status: ProjectStatus
  isApplied?: boolean // 지원 여부

  // 메타 정보
  createdAt: string
  updatedAt: string
}

export interface ProjectListResponse {
  projects: Project[]
  total: number
  page: number
  pageSize: number
}