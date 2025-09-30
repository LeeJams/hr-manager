// 개인정보
export interface PersonalInfo {
  name: string
  gender: 'male' | 'female' | 'other'
  birthDate: string // YYYY-MM-DD
  phone: string
  email: string
  skills: string[] // 보유 스킬
}

// 회사 경력
export interface CompanyCareer {
  id: string
  companyName: string
  startDate: string // YYYY-MM-DD
  endDate?: string // YYYY-MM-DD, 현재 재직중이면 null
  position: string // 직위
  duties: string // 업무내용
  createdAt?: string
  updatedAt?: string
}

// 프로젝트 경력
export interface ProjectCareer {
  id: string
  projectName: string
  clientName: string // 고객사명
  startDate: string // YYYY-MM-DD
  endDate?: string // YYYY-MM-DD
  orderer: string // 발주처
  environment: string[] // 개발환경 (배열)
  responsibilities: string // 담당업무
  createdAt?: string
  updatedAt?: string
}

// 자격증
export interface Certificate {
  id: string
  name: string // 자격증명
  acquisitionDate: string // YYYY-MM-DD 취득일
  issuer: string // 발행기관
  note?: string // 특이사항
  attachmentUrl?: string // 첨부파일 URL
  attachmentName?: string // 첨부파일명
  createdAt?: string
  updatedAt?: string
}

// 학력
export enum EducationLevel {
  HIGH_SCHOOL = 'HIGH_SCHOOL', // 고등학교
  ASSOCIATE = 'ASSOCIATE', // 전문학사
  BACHELOR = 'BACHELOR', // 학사
  MASTER = 'MASTER', // 석사
  DOCTORATE = 'DOCTORATE', // 박사
}

export enum GraduationStatus {
  GRADUATED = 'GRADUATED', // 졸업
  EXPECTED = 'EXPECTED', // 졸업예정
  ENROLLED = 'ENROLLED', // 재학중
  LEAVE = 'LEAVE', // 휴학
  DROPPED = 'DROPPED', // 중퇴
}

export interface Education {
  id: string
  level: EducationLevel // 학력
  status: GraduationStatus // 졸업구분
  schoolName: string // 학교명
  startDate: string // YYYY-MM-DD 입학일
  endDate?: string // YYYY-MM-DD 졸업일
  major: string // 전공
  createdAt?: string
  updatedAt?: string
}

// 전체 이력 프로필
export interface CareerProfile {
  personalInfo: PersonalInfo
  companyCareer: CompanyCareer[]
  projectCareer: ProjectCareer[]
  certificates: Certificate[]
  education: Education[]
}

// API Request/Response 타입
export interface UpdatePersonalInfoRequest {
  personalInfo: PersonalInfo
}

export interface AddCompanyCareerRequest {
  career: Omit<CompanyCareer, 'id' | 'createdAt' | 'updatedAt'>
}

export interface UpdateCompanyCareerRequest {
  id: string
  career: Partial<Omit<CompanyCareer, 'id' | 'createdAt' | 'updatedAt'>>
}

export interface AddProjectCareerRequest {
  career: Omit<ProjectCareer, 'id' | 'createdAt' | 'updatedAt'>
}

export interface UpdateProjectCareerRequest {
  id: string
  career: Partial<Omit<ProjectCareer, 'id' | 'createdAt' | 'updatedAt'>>
}

export interface AddCertificateRequest {
  certificate: Omit<Certificate, 'id' | 'createdAt' | 'updatedAt'>
}

export interface UpdateCertificateRequest {
  id: string
  certificate: Partial<Omit<Certificate, 'id' | 'createdAt' | 'updatedAt'>>
}

export interface AddEducationRequest {
  education: Omit<Education, 'id' | 'createdAt' | 'updatedAt'>
}

export interface UpdateEducationRequest {
  id: string
  education: Partial<Omit<Education, 'id' | 'createdAt' | 'updatedAt'>>
}

export interface FileUploadResponse {
  url: string
  fileName: string
}