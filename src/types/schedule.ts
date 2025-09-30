// 스케줄 이벤트 타입
export enum ScheduleEventType {
  APPLICATION_START = 'APPLICATION_START', // 지원 시작
  APPLICATION_END = 'APPLICATION_END', // 지원 마감
  DEPLOYMENT = 'DEPLOYMENT', // 투입일
}

// 캘린더 이벤트
export interface CalendarEvent {
  id: string
  date: string // YYYY-MM-DD
  type: ScheduleEventType
  projectId: string
  projectName: string
  description?: string
}

// 프로젝트 스케줄 정보
export interface ProjectSchedule {
  projectId: string
  projectName: string
  applicationStartDate?: string // YYYY-MM-DD
  applicationEndDate?: string // YYYY-MM-DD
  deploymentDate?: string // YYYY-MM-DD
}

// 월별 캘린더 데이터
export interface MonthCalendarData {
  year: number
  month: number // 1-12
  events: CalendarEvent[]
}

// 날짜별 이벤트 그룹
export interface DateEvents {
  date: string // YYYY-MM-DD
  events: CalendarEvent[]
}