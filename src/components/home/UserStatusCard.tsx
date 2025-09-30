'use client'

import Link from 'next/link'
import { UserStatus } from '@/types/user'
import type { CareerInfo } from '@/types/user'
import { formatCareerInfo, formatUserStatus, getUserStatusColor } from '@/lib/utils/career'

interface UserStatusCardProps {
  status: UserStatus
  career: CareerInfo
}

export default function UserStatusCard({ status, career }: UserStatusCardProps) {
  const statusText = formatUserStatus(status)
  const statusColor = getUserStatusColor(status)
  const careerText = formatCareerInfo(career)

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-8">
      <h3 className="text-lg font-semibold text-dark mb-4">나의 정보</h3>

      <div className="space-y-3">
        {/* 현재 상태 */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">현재 상태</span>
          <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusColor}`}>
            {statusText}
          </span>
        </div>

        {/* 개발 경력 */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">개발 경력</span>
          <span className="text-sm font-medium text-dark">{careerText}</span>
        </div>
      </div>

      {/* 이력 관리하기 링크 */}
      <div className="flex justify-end mt-3">
        <Link
          href="/mypage/career"
          className="text-xs text-gray-500 hover:text-dark transition-colors"
        >
          이력 관리하기 →
        </Link>
      </div>
    </div>
  )
}