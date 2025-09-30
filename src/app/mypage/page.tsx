'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import BottomNav from '@/components/BottomNav'
import MobileContainer from '@/components/MobileContainer'
import { UserStatus } from '@/types/user'
import type { MyPageProfile } from '@/types/mypage'
import { formatCareerInfo, formatUserStatus, getUserStatusColor } from '@/lib/utils/career'

export default function MyPage() {
  const router = useRouter()

  // TODO: API 연동 후 실제 데이터로 교체
  const [profile, setProfile] = useState<MyPageProfile>({
    id: '1',
    name: '김테크',
    email: 'tech@techmeet.com',
    phone: '010-1234-5678',
    avatar: undefined,
    status: UserStatus.DEPLOYED,
    totalCareer: {
      years: 5,
      months: 3,
      startDate: '2019-09-01',
    },
    skills: ['React', 'TypeScript', 'Next.js', 'Node.js', 'AWS'],
    currentProject: {
      id: '1',
      name: 'HR 관리 시스템 고도화',
      clientName: '테크밋',
      startDate: '2025-01-01',
      endDate: '2025-06-30',
      role: 'Frontend Developer',
      status: 'ongoing',
    },
    appliedProjects: [],
  })

  const handleLogout = () => {
    // TODO: 로그아웃 로직 구현
    router.push('/login')
  }

  const menuItems = [
    {
      title: '개인정보 수정',
      href: '/mypage/profile/edit',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
    },
    {
      title: '이력 정보 조회',
      href: '/mypage/career/view',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
    {
      title: '이력 관리',
      href: '/mypage/career/manage',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      ),
    },
    {
      title: '설정',
      href: '/mypage/settings',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ]

  const statusText = formatUserStatus(profile.status)
  const statusColor = getUserStatusColor(profile.status)
  const careerText = formatCareerInfo(profile.totalCareer)

  return (
    <MobileContainer>
      <div className="min-h-screen bg-light pb-16">
        {/* 헤더 */}
        <header className="bg-dark text-light px-6 py-4">
          <Link href="/home">
            <h1 className="text-xl font-bold cursor-pointer">TechMeet</h1>
          </Link>
        </header>

        {/* 내 정보 섹션 */}
        <div className="bg-white border-b border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-dark mb-4">내 정보</h2>

          <div className="flex items-start gap-4 mb-4">
            {/* 프로필 사진 */}
            <div className="relative">
              {profile.avatar ? (
                <img src={profile.avatar} alt={profile.name} className="w-20 h-20 rounded-full object-cover" />
              ) : (
                <div className="w-20 h-20 bg-dark rounded-full flex items-center justify-center text-light text-2xl font-bold">
                  {profile.name.charAt(0)}
                </div>
              )}
              {/* 편집 아이콘 */}
              <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-dark rounded-full flex items-center justify-center text-light">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </button>
            </div>

            {/* 정보 */}
            <div className="flex-1">
              <h3 className="text-lg font-bold text-dark mb-1">{profile.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{profile.email}</p>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-gray-600">총 경력</span>
                <span className="text-sm font-medium text-dark">{careerText}</span>
              </div>
              <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${statusColor}`}>
                {statusText}
              </span>
            </div>
          </div>

          {/* 보유 스킬 */}
          <div className="pt-4 border-t border-gray-100">
            <h4 className="text-sm font-medium text-gray-600 mb-2">보유 스킬</h4>
            <div className="flex flex-wrap gap-2">
              {profile.skills.slice(0, 6).map((skill, index) => (
                <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                  {skill}
                </span>
              ))}
              {profile.skills.length > 6 && (
                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                  +{profile.skills.length - 6}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* 현재 프로젝트 정보 */}
        <div className="bg-white p-6 mb-2">
          <h3 className="text-base font-semibold text-dark mb-3">현재 프로젝트</h3>
          {profile.currentProject ? (
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-sm font-semibold text-dark">{profile.currentProject.name}</h4>
                <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                  투입 중
                </span>
              </div>
              <p className="text-xs text-gray-600 mb-1">
                {profile.currentProject.clientName && `${profile.currentProject.clientName} · `}
                {profile.currentProject.role}
              </p>
              <p className="text-xs text-gray-500">
                {profile.currentProject.startDate} ~ {profile.currentProject.endDate || '진행중'}
              </p>
            </div>
          ) : profile.appliedProjects && profile.appliedProjects.length > 0 ? (
            <div className="space-y-2">
              {profile.appliedProjects.map((project) => (
                <div key={project.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-sm font-semibold text-dark">{project.name}</h4>
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                      지원함
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">{project.role}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-6 text-center border border-gray-200">
              <p className="text-sm text-gray-500">투입 중인 프로젝트가 없습니다</p>
            </div>
          )}
        </div>

        {/* 메뉴 목록 */}
        <main className="bg-white mb-2">
          <div className="divide-y divide-gray-100">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="text-dark">{item.icon}</div>
                  <span className="text-dark">{item.title}</span>
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </main>

        {/* 로그아웃 버튼 */}
        <div className="px-6 py-4">
          <button
            onClick={handleLogout}
            className="w-full py-3 border border-gray-300 rounded-lg text-dark hover:bg-gray-50 transition-colors"
          >
            로그아웃
          </button>
        </div>

        {/* 하단 네비게이션 */}
        <BottomNav />
      </div>
    </MobileContainer>
  )
}