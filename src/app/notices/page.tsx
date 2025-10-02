'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import MainLayout from '@/components/layout/MainLayout'
import type { Notice } from '@/types/notice'
import { NoticeType } from '@/types/notice'

export default function NoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([])

  useEffect(() => {
    // TODO: API 연동 후 실제 데이터로 교체
    const mockNotices: Notice[] = [
      {
        id: '1',
        title: '2025년 상반기 워크샵 안내',
        content: '워크샵 내용 상세...',
        type: NoticeType.EVENT,
        author: { id: '1', name: '관리자', role: '운영팀' },
        createdAt: '2025-01-15',
        views: 125,
        isImportant: false,
      },
      {
        id: '2',
        title: '시스템 점검 안내 (2025.01.20)',
        content: '시스템 점검 내용...',
        type: NoticeType.SYSTEM,
        author: { id: '2', name: '시스템관리자', role: '보안팀' },
        createdAt: '2025-01-18',
        views: 342,
        isImportant: false,
      },
      {
        id: '3',
        title: '신규 복지 제도 시행 안내',
        content: '복지 내용 상세...',
        type: NoticeType.POLICY,
        author: { id: '1', name: '관리자', role: '인사팀' },
        createdAt: '2025-01-10',
        views: 89,
        isImportant: false,
      },
      {
        id: '4',
        title: '보안 정책 업데이트',
        content: '보안 내용 상세...',
        type: NoticeType.SYSTEM,
        author: { id: '2', name: '시스템관리자', role: '보안팀' },
        createdAt: '2025-01-05',
        views: 203,
        isImportant: false,
      },
      {
        id: '5',
        title: '2025년 첫 전체 회의 공지',
        content: '전체 회의 내용...',
        type: NoticeType.GENERAL,
        author: { id: '1', name: '관리자', role: '운영팀' },
        createdAt: '2025-01-03',
        views: 156,
        isImportant: false,
      },
      {
        id: '6',
        title: '프로젝트 매칭 시스템 개선',
        content: '시스템 개선 내용...',
        type: NoticeType.SYSTEM,
        author: { id: '3', name: '개발팀장', role: '개발팀' },
        createdAt: '2024-12-28',
        views: 78,
        isImportant: false,
      },
      {
        id: '7',
        title: '연말 송년회 일정 안내',
        content: '송년회 내용...',
        type: NoticeType.EVENT,
        author: { id: '1', name: '관리자', role: '운영팀' },
        createdAt: '2024-12-15',
        views: 234,
        isImportant: false,
      },
    ]

    setNotices(mockNotices)
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
      return '오늘'
    } else if (diffDays === 1) {
      return '어제'
    } else if (diffDays < 7) {
      return `${diffDays}일 전`
    } else {
      return dateString
    }
  }

  return (
    <MainLayout showBackButton backHref="/home" headerTitle="공지사항">
      {/* 공지사항 목록 */}
        <main className="p-6">
          <div className="space-y-3">
            {notices.map((notice) => (
              <Link key={notice.id} href={`/notices/${notice.id}`}>
                <div className="bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                  <h3 className="text-sm font-semibold text-dark line-clamp-2 mb-3">{notice.title}</h3>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>
                      {notice.author.name} · {notice.author.role}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                        {notice.views}
                      </span>
                      <span>{formatDate(notice.createdAt)}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {notices.length === 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <p className="text-gray-500">등록된 공지사항이 없습니다</p>
            </div>
          )}
      </main>
    </MainLayout>
  )
}
