'use client'

import Link from 'next/link'

interface HeaderProps {
  showBackButton?: boolean
  backHref?: string
  title?: string
}

export default function Header({ showBackButton = false, backHref = '/home', title = 'TechMeet' }: HeaderProps) {
  return (
    <header className="bg-dark text-light px-6 py-4 sticky top-0 z-10">
      {showBackButton ? (
        <div className="flex items-center gap-2">
          <Link href={backHref} className="hover:opacity-70 p-1 -ml-1">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-lg font-semibold">{title}</h1>
        </div>
      ) : (
        <Link href="/home">
          <h1 className="text-lg font-semibold cursor-pointer">{title}</h1>
        </Link>
      )}
    </header>
  )
}
