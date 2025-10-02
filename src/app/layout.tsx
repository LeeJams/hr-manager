import type {Metadata, Viewport} from 'next'
import './globals.css'
import React from "react";

export const metadata: Metadata = {
  title: 'TechMeet Project',
  description: '테크밋 SI 관리',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'TechMeet',
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  minimumScale: 1,
  userScalable: true,
  viewportFit: 'cover',
  themeColor: '#333333',
}

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
    <body className="antialiased">
    {children}
    </body>
    </html>
  )
}