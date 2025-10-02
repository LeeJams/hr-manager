'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'

export default function BottomNav() {
  const pathname = usePathname()

  const navItems = [
    {
      name: '홈',
      path: '/home',
      icon: (active: boolean) => (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke={active ? '#333333' : '#9CA3AF'} // active=검정, inactive=회색
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
        </svg>
      )
    },
    {
      name: '프로젝트',
      path: '/projects',
      icon: (active: boolean) => (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke={active ? '#333333' : '#9CA3AF'}
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
        </svg>
      )
    },
    {
      name: '일정관리',
      path: '/schedule',
      icon: (active: boolean) => (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke={active ? '#333333' : '#9CA3AF'}
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
        </svg>
      )
    },
    {
      name: '마이페이지',
      path: '/mypage',
      icon: (active: boolean) => (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke={active ? '#333333' : '#9CA3AF'}
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
        </svg>
      )
    }
  ]

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 max-w-[480px] md:max-w-[640px] mx-auto safe-bottom">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.path
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                isActive ? 'text-black' : 'text-gray-400'
              }`}
            >
              <div className="w-6 h-6">{item.icon(isActive)}</div>
              <span className="text-[10px] sm:text-xs mt-1">{item.name}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
