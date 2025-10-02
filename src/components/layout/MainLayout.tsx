'use client'

import { ReactNode } from 'react'
import MobileContainer from '@/components/MobileContainer'
import Header from '@/components/layout/Header'
import BottomNav from '@/components/BottomNav'

interface MainLayoutProps {
  children: ReactNode
  showHeader?: boolean
  showBackButton?: boolean
  backHref?: string
  headerTitle?: string
  showBottomNav?: boolean
  className?: string
}

export default function MainLayout({
  children,
  showHeader = true,
  showBackButton = false,
  backHref = '/home',
  headerTitle = 'TechMeet',
  showBottomNav = true,
  className = '',
}: MainLayoutProps) {
  return (
    <MobileContainer>
      <div className={`min-h-screen bg-light ${showBottomNav ? 'pb-16' : ''} ${className}`}>
        {showHeader && (
          <Header showBackButton={showBackButton} backHref={backHref} title={headerTitle} />
        )}
        {children}
        {showBottomNav && <BottomNav />}
      </div>
    </MobileContainer>
  )
}
