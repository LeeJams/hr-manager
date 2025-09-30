import axios from 'axios'
import type {
  CareerProfile,
  UpdatePersonalInfoRequest,
  AddCompanyCareerRequest,
  UpdateCompanyCareerRequest,
  CompanyCareer,
  AddProjectCareerRequest,
  UpdateProjectCareerRequest,
  ProjectCareer,
  AddCertificateRequest,
  UpdateCertificateRequest,
  Certificate,
  AddEducationRequest,
  UpdateEducationRequest,
  Education,
  FileUploadResponse,
} from '@/types/career'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api'

// 이력 프로필 전체 조회
export const getCareerProfile = async (): Promise<CareerProfile> => {
  try {
    const response = await axios.get<CareerProfile>(`${API_BASE_URL}/career/profile`)
    return response.data
  } catch (error) {
    console.error('Get career profile error:', error)
    throw error
  }
}

// 개인정보 업데이트
export const updatePersonalInfo = async (data: UpdatePersonalInfoRequest): Promise<void> => {
  try {
    await axios.put(`${API_BASE_URL}/career/personal-info`, data)
  } catch (error) {
    console.error('Update personal info error:', error)
    throw error
  }
}

// ===== 회사 경력 =====
export const addCompanyCareer = async (data: AddCompanyCareerRequest): Promise<CompanyCareer> => {
  try {
    const response = await axios.post<CompanyCareer>(`${API_BASE_URL}/career/company`, data)
    return response.data
  } catch (error) {
    console.error('Add company career error:', error)
    throw error
  }
}

export const updateCompanyCareer = async (data: UpdateCompanyCareerRequest): Promise<CompanyCareer> => {
  try {
    const response = await axios.put<CompanyCareer>(`${API_BASE_URL}/career/company/${data.id}`, data.career)
    return response.data
  } catch (error) {
    console.error('Update company career error:', error)
    throw error
  }
}

export const deleteCompanyCareer = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/career/company/${id}`)
  } catch (error) {
    console.error('Delete company career error:', error)
    throw error
  }
}

// ===== 프로젝트 경력 =====
export const addProjectCareer = async (data: AddProjectCareerRequest): Promise<ProjectCareer> => {
  try {
    const response = await axios.post<ProjectCareer>(`${API_BASE_URL}/career/project`, data)
    return response.data
  } catch (error) {
    console.error('Add project career error:', error)
    throw error
  }
}

export const updateProjectCareer = async (data: UpdateProjectCareerRequest): Promise<ProjectCareer> => {
  try {
    const response = await axios.put<ProjectCareer>(`${API_BASE_URL}/career/project/${data.id}`, data.career)
    return response.data
  } catch (error) {
    console.error('Update project career error:', error)
    throw error
  }
}

export const deleteProjectCareer = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/career/project/${id}`)
  } catch (error) {
    console.error('Delete project career error:', error)
    throw error
  }
}

// ===== 자격증 =====
export const addCertificate = async (data: AddCertificateRequest): Promise<Certificate> => {
  try {
    const response = await axios.post<Certificate>(`${API_BASE_URL}/career/certificate`, data)
    return response.data
  } catch (error) {
    console.error('Add certificate error:', error)
    throw error
  }
}

export const updateCertificate = async (data: UpdateCertificateRequest): Promise<Certificate> => {
  try {
    const response = await axios.put<Certificate>(`${API_BASE_URL}/career/certificate/${data.id}`, data.certificate)
    return response.data
  } catch (error) {
    console.error('Update certificate error:', error)
    throw error
  }
}

export const deleteCertificate = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/career/certificate/${id}`)
  } catch (error) {
    console.error('Delete certificate error:', error)
    throw error
  }
}

// 자격증 파일 업로드
export const uploadCertificateFile = async (file: File): Promise<FileUploadResponse> => {
  try {
    const formData = new FormData()
    formData.append('file', file)

    const response = await axios.post<FileUploadResponse>(`${API_BASE_URL}/career/certificate/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  } catch (error) {
    console.error('Upload certificate file error:', error)
    throw error
  }
}

// ===== 학력 =====
export const addEducation = async (data: AddEducationRequest): Promise<Education> => {
  try {
    const response = await axios.post<Education>(`${API_BASE_URL}/career/education`, data)
    return response.data
  } catch (error) {
    console.error('Add education error:', error)
    throw error
  }
}

export const updateEducation = async (data: UpdateEducationRequest): Promise<Education> => {
  try {
    const response = await axios.put<Education>(`${API_BASE_URL}/career/education/${data.id}`, data.education)
    return response.data
  } catch (error) {
    console.error('Update education error:', error)
    throw error
  }
}

export const deleteEducation = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/career/education/${id}`)
  } catch (error) {
    console.error('Delete education error:', error)
    throw error
  }
}