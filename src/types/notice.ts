export enum NoticeType {
  GENERAL = 'GENERAL', // 일반
  URGENT = 'URGENT', // 긴급
  EVENT = 'EVENT', // 행사
  POLICY = 'POLICY', // 정책
  SYSTEM = 'SYSTEM', // 시스템
}

export interface NoticeAuthor {
  id: string
  name: string
  role: string
}

export interface Notice {
  id: string
  title: string
  content: string
  type: NoticeType
  author: NoticeAuthor
  createdAt: string // ISO date string
  updatedAt?: string
  views: number
  isImportant: boolean
  attachments?: {
    id: string
    name: string
    url: string
  }[]
}

export interface NoticeListResponse {
  notices: Notice[]
  total: number
  page: number
  pageSize: number
}