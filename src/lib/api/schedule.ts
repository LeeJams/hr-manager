import axios from 'axios'
import type { CalendarEvent, MonthCalendarData } from '@/types/schedule'
import type { Project } from '@/types/project'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api'

// 월별 캘린더 이벤트 조회
export const getCalendarEvents = async (year: number, month: number): Promise<MonthCalendarData> => {
  try {
    const response = await axios.get<MonthCalendarData>(`${API_BASE_URL}/schedule/calendar`, {
      params: { year, month },
    })
    return response.data
  } catch (error) {
    console.error('Get calendar events error:', error)
    throw error
  }
}

// 관리자 요청 프로젝트 조회
export const getRequestedProjects = async (): Promise<Project[]> => {
  try {
    const response = await axios.get<{ projects: Project[] }>(`${API_BASE_URL}/schedule/requested`)
    return response.data.projects
  } catch (error) {
    console.error('Get requested projects error:', error)
    throw error
  }
}

// 내가 신청한 프로젝트 조회
export const getMyApplications = async (): Promise<Project[]> => {
  try {
    const response = await axios.get<{ projects: Project[] }>(`${API_BASE_URL}/schedule/my-applications`)
    return response.data.projects
  } catch (error) {
    console.error('Get my applications error:', error)
    throw error
  }
}

// 추천 프로젝트 조회
export const getRecommendedProjects = async (): Promise<Project[]> => {
  try {
    const response = await axios.get<{ projects: Project[] }>(`${API_BASE_URL}/schedule/recommended`)
    return response.data.projects
  } catch (error) {
    console.error('Get recommended projects error:', error)
    throw error
  }
}

// 프로젝트 지원하기
export const applyToProject = async (projectId: string): Promise<void> => {
  try {
    await axios.post(`${API_BASE_URL}/schedule/apply`, { projectId })
  } catch (error) {
    console.error('Apply to project error:', error)
    throw error
  }
}