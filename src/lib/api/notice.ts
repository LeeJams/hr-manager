import axios from 'axios'
import type { Notice, NoticeListResponse } from '@/types/notice'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api'

// 최근 공지사항 조회
export const getRecentNotices = async (limit: number = 5): Promise<Notice[]> => {
  try {
    const response = await axios.get<NoticeListResponse>(`${API_BASE_URL}/notices/recent`, {
      params: { limit }
    })
    return response.data.notices
  } catch (error) {
    console.error('Get recent notices error:', error)
    throw error
  }
}

// 전체 공지사항 목록 조회
export const getNotices = async (page: number = 1, pageSize: number = 10): Promise<NoticeListResponse> => {
  try {
    const response = await axios.get<NoticeListResponse>(`${API_BASE_URL}/notices`, {
      params: { page, pageSize }
    })
    return response.data
  } catch (error) {
    console.error('Get notices error:', error)
    throw error
  }
}

// 공지사항 상세 조회
export const getNoticeById = async (noticeId: string): Promise<Notice> => {
  try {
    const response = await axios.get<Notice>(`${API_BASE_URL}/notices/${noticeId}`)
    return response.data
  } catch (error) {
    console.error('Get notice by ID error:', error)
    throw error
  }
}

// 중요 공지사항 조회
export const getImportantNotices = async (): Promise<Notice[]> => {
  try {
    const response = await axios.get<NoticeListResponse>(`${API_BASE_URL}/notices/important`)
    return response.data.notices
  } catch (error) {
    console.error('Get important notices error:', error)
    throw error
  }
}