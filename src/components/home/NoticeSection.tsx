"use client";

import Link from "next/link";
import type { Notice } from "@/types/notice";
import {
  formatRelativeTime,
  formatNoticeType,
  getNoticeTypeColor,
} from "@/lib/utils/career";

interface NoticeSectionProps {
  notices: Notice[];
}

export default function NoticeSection({ notices }: NoticeSectionProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-dark">공지사항</h3>
        <Link
          href="/notices"
          className="text-sm text-gray-600 hover:text-dark transition-colors"
        >
          전체보기 →
        </Link>
      </div>

      {notices.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 py-10 px-6 text-center">
          <p className="text-gray-500 text-sm">등록된 공지사항이 없습니다</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="divide-y divide-gray-100">
            {notices.map((notice, index) => (
              <Link
                key={notice.id}
                href={`/notices/${notice.id}`}
                className="block py-4 px-5 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  {/* 중요 표시 */}
                  {notice.isImportant && (
                    <span className="flex-shrink-0 text-red-500 text-lg font-bold">
                      !
                    </span>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2 mb-1">
                      {/* 타입 배지 */}
                      <span
                        className={`flex-shrink-0 px-2 py-0.5 text-xs font-medium rounded ${getNoticeTypeColor(
                          notice.type
                        )}`}
                      >
                        {formatNoticeType(notice.type)}
                      </span>

                      {/* 제목 */}
                      <h4 className="text-sm font-medium text-dark flex-1 line-clamp-1">
                        {notice.title}
                      </h4>
                    </div>

                    {/* 작성자 및 날짜 */}
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{notice.author.name}</span>
                      <span>·</span>
                      <span>{formatRelativeTime(notice.createdAt)}</span>
                      {notice.views > 0 && (
                        <>
                          <span>·</span>
                          <span>조회 {notice.views}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* 화살표 아이콘 */}
                  <svg
                    className="w-4 h-4 text-gray-400 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
