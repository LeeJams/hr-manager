'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import MainLayout from '@/components/layout/MainLayout'
import { NoticeType } from '@/types/notice'
import type { Notice } from '@/types/notice'

export default function NoticeDetailPage() {
  const params = useParams()
  const router = useRouter()
  const noticeId = params.id as string

  const [notice, setNotice] = useState<Notice | null>(null)
  const [loading, setLoading] = useState(true)
  const [adjacentNotices, setAdjacentNotices] = useState<{
    prev: Notice | null
    next: Notice | null
  }>({ prev: null, next: null })

  useEffect(() => {
    // TODO: API 연동 후 실제 데이터로 교체
    const mockNotices: Notice[] = [
      {
        id: '1',
        title: '2025년 상반기 워크샵 안내',
        content: `안녕하세요, TechMeet 운영팀입니다.

2025년 상반기 워크샵을 다음과 같이 진행하고자 합니다.

**일시:** 2025년 3월 15일 (토) 10:00 ~ 18:00
**장소:** 강원도 평창 리조트
**참가 대상:** 전체 프리랜서 및 직원

**프로그램 안내:**
- 10:00 ~ 12:00: 팀 빌딩 활동
- 12:00 ~ 13:00: 점심 식사
- 13:00 ~ 15:00: 2025년 상반기 주요 프로젝트 소개
- 15:00 ~ 18:00: 자유 시간 및 네트워킹

참가를 원하시는 분들은 2월 28일까지 운영팀으로 신청해 주시기 바랍니다.

감사합니다.`,
        type: NoticeType.EVENT,
        author: { id: '1', name: '관리자', role: '운영팀' },
        createdAt: '2025-01-15T09:00:00',
        updatedAt: '2025-01-15T14:30:00',
        views: 125,
        isImportant: true,
        attachments: [
          {
            id: '1',
            name: '워크샵_상세_일정표.pdf',
            url: '/files/workshop-schedule.pdf',
          },
          {
            id: '2',
            name: '워크샵_장소_안내.pdf',
            url: '/files/workshop-location.pdf',
          },
        ],
      },
      {
        id: '2',
        title: '[긴급] 시스템 점검 안내 (2025.01.20)',
        content: `안녕하세요, 시스템 관리팀입니다.

시스템 안정화 및 보안 강화를 위해 정기 점검을 실시합니다.

**점검 일시:** 2025년 1월 20일 (월) 02:00 ~ 06:00 (4시간)
**점검 대상:** 전체 서비스
**영향 범위:** 서비스 일시 중단

점검 시간 동안 서비스 이용이 불가능하오니 양해 부탁드립니다.
긴급한 업무가 있으신 분들은 점검 시간을 피해 작업해 주시기 바랍니다.

감사합니다.`,
        type: NoticeType.URGENT,
        author: { id: '2', name: '시스템관리자', role: '보안팀' },
        createdAt: '2025-01-18T16:00:00',
        views: 342,
        isImportant: true,
      },
      {
        id: '3',
        title: '신규 복지 제도 시행 안내',
        content: `안녕하세요, 인사팀입니다.

프리랜서 여러분의 복지 향상을 위해 새로운 제도를 시행합니다.

**신규 복지 제도:**

1. **건강검진 지원**
   - 연 1회 종합건강검진 비용 전액 지원
   - 제휴 병원 이용 시 간편 절차

2. **교육비 지원**
   - 직무 관련 교육/세미나 참가비 최대 100만원 지원
   - 온라인 강의 구독료 50% 지원

3. **장비 구매 지원**
   - 업무용 노트북, 모니터 등 장비 구매 시 최대 200만원 지원
   - 3년에 1회 신청 가능

자세한 내용은 인사팀으로 문의 바랍니다.`,
        type: NoticeType.POLICY,
        author: { id: '1', name: '관리자', role: '인사팀' },
        createdAt: '2025-01-10T11:00:00',
        views: 89,
        isImportant: false,
      },
      {
        id: '4',
        title: '보안 정책 업데이트',
        content: `보안 정책이 다음과 같이 업데이트되었습니다.

**주요 변경 사항:**
- 비밀번호 정책 강화 (최소 10자, 특수문자 포함 필수)
- 2단계 인증 의무화
- VPN 사용 권장

모든 사용자는 1월 31일까지 새로운 정책에 맞게 설정을 변경해 주시기 바랍니다.`,
        type: NoticeType.SYSTEM,
        author: { id: '2', name: '시스템관리자', role: '보안팀' },
        createdAt: '2025-01-05T14:00:00',
        views: 203,
        isImportant: false,
      },
    ]

    const foundNotice = mockNotices.find((n) => n.id === noticeId)
    setNotice(foundNotice || null)

    // 이전/다음 공지 찾기
    if (foundNotice) {
      const currentIndex = mockNotices.findIndex((n) => n.id === noticeId)
      setAdjacentNotices({
        prev: currentIndex > 0 ? mockNotices[currentIndex - 1] : null,
        next: currentIndex < mockNotices.length - 1 ? mockNotices[currentIndex + 1] : null,
      })
    }

    setLoading(false)

    // TODO: 조회수 증가 API 호출
  }, [noticeId])

  const getTypeColor = (type: NoticeType) => {
    switch (type) {
      case NoticeType.URGENT:
        return 'bg-red-100 text-red-800'
      case NoticeType.GENERAL:
        return 'bg-gray-100 text-gray-800'
      case NoticeType.EVENT:
        return 'bg-purple-100 text-purple-800'
      case NoticeType.POLICY:
        return 'bg-blue-100 text-blue-800'
      case NoticeType.SYSTEM:
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeLabel = (type: NoticeType) => {
    switch (type) {
      case NoticeType.URGENT:
        return '긴급'
      case NoticeType.GENERAL:
        return '일반'
      case NoticeType.EVENT:
        return '행사'
      case NoticeType.POLICY:
        return '정책'
      case NoticeType.SYSTEM:
        return '시스템'
      default:
        return '일반'
    }
  }

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (loading) {
    return (
      <MainLayout showBackButton backHref="/notices" headerTitle="공지사항">
        <div className="flex items-center justify-center py-20">
          <p className="text-gray-500">로딩 중...</p>
        </div>
      </MainLayout>
    )
  }

  if (!notice) {
    return (
      <MainLayout showBackButton backHref="/notices" headerTitle="공지사항">
        <div className="p-6 text-center">
          <p className="text-gray-500 mb-4">공지사항을 찾을 수 없습니다.</p>
          <Link
            href="/notices"
            className="inline-block px-6 py-2 bg-dark text-light rounded-lg hover:opacity-90 transition-opacity"
          >
            공지사항 목록으로
          </Link>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout showBackButton backHref="/notices" headerTitle="공지사항">
      {/* 공지 내용 */}
        <div className="bg-white">
          {/* 제목 영역 */}
          <div className="border-b border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className={`px-3 py-1 text-xs font-medium rounded ${getTypeColor(notice.type)}`}>
                {getTypeLabel(notice.type)}
              </span>
              {notice.isImportant && (
                <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-medium rounded flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  중요
                </span>
              )}
            </div>
            <h2 className="text-xl font-bold text-dark mb-4 leading-relaxed">{notice.title}</h2>

            {/* 작성자 정보 */}
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-dark rounded-full flex items-center justify-center text-light text-xs font-bold">
                  {notice.author.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-dark">{notice.author.name}</p>
                  <p className="text-xs text-gray-500">{notice.author.role}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs">{formatDateTime(notice.createdAt)}</p>
                <p className="text-xs text-gray-500 flex items-center gap-1 justify-end mt-1">
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
                </p>
              </div>
            </div>
          </div>

          {/* 본문 내용 */}
          <div className="p-6">
            <div className="prose prose-sm max-w-none">
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">{notice.content}</div>
            </div>

            {/* 첨부파일 */}
            {notice.attachments && notice.attachments.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-dark mb-3">첨부파일 ({notice.attachments.length})</h3>
                <div className="space-y-2">
                  {notice.attachments.map((file) => (
                    <a
                      key={file.id}
                      href={file.url}
                      download
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <span className="flex-1 text-sm text-dark">{file.name}</span>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* 수정 정보 */}
            {notice.updatedAt && notice.updatedAt !== notice.createdAt && (
              <div className="mt-6 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500">최종 수정: {formatDateTime(notice.updatedAt)}</p>
              </div>
            )}
          </div>
        </div>

        {/* 이전/다음 공지 */}
        <div className="bg-white mt-2 divide-y divide-gray-100">
          {adjacentNotices.prev && (
            <Link href={`/notices/${adjacentNotices.prev.id}`} className="block p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-1">이전 글</p>
                  <p className="text-sm text-dark font-medium line-clamp-1">{adjacentNotices.prev.title}</p>
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </div>
            </Link>
          )}
          {adjacentNotices.next && (
            <Link href={`/notices/${adjacentNotices.next.id}`} className="block p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-1">다음 글</p>
                  <p className="text-sm text-dark font-medium line-clamp-1">{adjacentNotices.next.title}</p>
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          )}
        </div>

      {/* 목록으로 버튼 */}
      <div className="p-6">
        <Link
          href="/notices"
          className="block w-full py-3 border border-gray-300 rounded-lg text-center text-dark hover:bg-gray-50 transition-colors font-medium"
        >
          목록으로
        </Link>
      </div>
    </MainLayout>
  )
}
