import axios from 'axios'
import type { Project, ProjectListResponse } from '@/types/project'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api'

// 최근 프로젝트 조회 (제한된 개수)
export const getRecentProjects = async (limit: number = 3): Promise<Project[]> => {
  try {
    const response = await axios.get<ProjectListResponse>(`${API_BASE_URL}/projects/recent`, {
      params: { limit }
    })
    return response.data.projects
  } catch (error) {
    console.error('Get recent projects error:', error)
    throw error
  }
}

// 전체 프로젝트 목록 조회
export const getProjects = async (page: number = 1, pageSize: number = 10): Promise<ProjectListResponse> => {
  try {
    const response = await axios.get<ProjectListResponse>(`${API_BASE_URL}/projects`, {
      params: { page, pageSize }
    })
    return response.data
  } catch (error) {
    console.error('Get projects error:', error)
    throw error
  }
}

// 프로젝트 상세 조회
export const getProjectById = async (projectId: string): Promise<Project> => {
  try {
    const response = await axios.get<Project>(`${API_BASE_URL}/projects/${projectId}`)
    return response.data
  } catch (error) {
    console.error('Get project by ID error:', error)
    throw error
  }
}

// 내가 지원한 프로젝트 목록 조회
export const getMyAppliedProjects = async (): Promise<Project[]> => {
  try {
    const response = await axios.get<ProjectListResponse>(`${API_BASE_URL}/projects/applied`)
    return response.data.projects
  } catch (error) {
    console.error('Get my applied projects error:', error)
    throw error
  }
}

// 프로젝트 지원하기
export const applyToProject = async (projectId: string): Promise<void> => {
  try {
    await axios.post(`${API_BASE_URL}/projects/${projectId}/apply`)
  } catch (error) {
    console.error('Apply to project error:', error)
    throw error
  }
}

// 프로젝트 지원 취소
export const cancelProjectApplication = async (projectId: string): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/projects/${projectId}/apply`)
  } catch (error) {
    console.error('Cancel project application error:', error)
    throw error
  }
}