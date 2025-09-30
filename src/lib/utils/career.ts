import type { CareerInfo } from '@/types/user'
import { UserStatus } from '@/types/user'
import { ProjectStatus } from '@/types/project'
import { NoticeType } from '@/types/notice'

/**
 * 시작일로부터 경력 계산 (년, 개월)
 */
export const calculateCareer = (startDate: string | Date): CareerInfo => {
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate
  const now = new Date()

  let years = now.getFullYear() - start.getFullYear()
  let months = now.getMonth() - start.getMonth()

  if (months < 0) {
    years--
    months += 12
  }

  return {
    years,
    months,
    startDate: start.toISOString(),
  }
}

/**
 * 경력 정보를 "N년 N개월" 형식으로 포맷
 */
export const formatCareerInfo = (career: CareerInfo): string => {
  const { years, months } = career

  if (years === 0 && months === 0) {
    return '신입'
  }

  if (years === 0) {
    return `${months}개월`
  }

  if (months === 0) {
    return `${years}년`
  }

  return `${years}년 ${months}개월`
}

/**
 * 사용자 상태를 한글로 변환
 */
export const formatUserStatus = (status: UserStatus): string => {
  const statusMap: Record<UserStatus, string> = {
    [UserStatus.DEPLOYED]: '투입 중',
    [UserStatus.DEVELOPING]: '개발 중',
    [UserStatus.STANDBY]: '대기 중',
    [UserStatus.ON_VACATION]: '휴가 중',
    [UserStatus.TRAINING]: '교육 중',
  }

  return statusMap[status] || '알 수 없음'
}

/**
 * 사용자 상태에 따른 배지 색상 클래스 반환
 */
export const getUserStatusColor = (status: UserStatus): string => {
  const colorMap: Record<UserStatus, string> = {
    [UserStatus.DEPLOYED]: 'bg-blue-100 text-blue-800',
    [UserStatus.DEVELOPING]: 'bg-green-100 text-green-800',
    [UserStatus.STANDBY]: 'bg-gray-100 text-gray-800',
    [UserStatus.ON_VACATION]: 'bg-purple-100 text-purple-800',
    [UserStatus.TRAINING]: 'bg-yellow-100 text-yellow-800',
  }

  return colorMap[status] || 'bg-gray-100 text-gray-800'
}

/**
 * 프로젝트 상태를 한글로 변환
 */
export const formatProjectStatus = (status: ProjectStatus): string => {
  const statusMap: Record<ProjectStatus, string> = {
    [ProjectStatus.PLANNING]: '기획 중',
    [ProjectStatus.IN_PROGRESS]: '진행 중',
    [ProjectStatus.ON_HOLD]: '보류',
    [ProjectStatus.COMPLETED]: '완료',
    [ProjectStatus.CANCELLED]: '취소',
  }

  return statusMap[status] || '알 수 없음'
}

/**
 * 프로젝트 상태에 따른 배지 색상 클래스 반환
 */
export const getProjectStatusColor = (status: ProjectStatus): string => {
  const colorMap: Record<ProjectStatus, string> = {
    [ProjectStatus.PLANNING]: 'bg-yellow-100 text-yellow-800',
    [ProjectStatus.IN_PROGRESS]: 'bg-blue-100 text-blue-800',
    [ProjectStatus.ON_HOLD]: 'bg-orange-100 text-orange-800',
    [ProjectStatus.COMPLETED]: 'bg-green-100 text-green-800',
    [ProjectStatus.CANCELLED]: 'bg-red-100 text-red-800',
  }

  return colorMap[status] || 'bg-gray-100 text-gray-800'
}

/**
 * 공지사항 타입을 한글로 변환
 */
export const formatNoticeType = (type: NoticeType): string => {
  const typeMap: Record<NoticeType, string> = {
    [NoticeType.GENERAL]: '일반',
    [NoticeType.URGENT]: '긴급',
    [NoticeType.EVENT]: '행사',
    [NoticeType.POLICY]: '정책',
    [NoticeType.SYSTEM]: '시스템',
  }

  return typeMap[type] || '일반'
}

/**
 * 공지사항 타입에 따른 배지 색상 클래스 반환
 */
export const getNoticeTypeColor = (type: NoticeType): string => {
  const colorMap: Record<NoticeType, string> = {
    [NoticeType.GENERAL]: 'bg-gray-100 text-gray-800',
    [NoticeType.URGENT]: 'bg-red-100 text-red-800',
    [NoticeType.EVENT]: 'bg-purple-100 text-purple-800',
    [NoticeType.POLICY]: 'bg-blue-100 text-blue-800',
    [NoticeType.SYSTEM]: 'bg-green-100 text-green-800',
  }

  return colorMap[type] || 'bg-gray-100 text-gray-800'
}

/**
 * 날짜를 "YYYY.MM.DD" 형식으로 포맷
 */
export const formatDate = (date: string | Date): string => {
  const d = typeof date === 'string' ? new Date(date) : date
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')

  return `${year}.${month}.${day}`
}

/**
 * 상대적 시간 표시 (예: "3일 전", "방금 전")
 */
export const formatRelativeTime = (date: string | Date): string => {
  const d = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(diffSec / 60)
  const diffHour = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHour / 24)

  if (diffSec < 60) {
    return '방금 전'
  } else if (diffMin < 60) {
    return `${diffMin}분 전`
  } else if (diffHour < 24) {
    return `${diffHour}시간 전`
  } else if (diffDay < 7) {
    return `${diffDay}일 전`
  } else {
    return formatDate(d)
  }
}