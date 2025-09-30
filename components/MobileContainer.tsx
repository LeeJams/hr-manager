import { ReactNode } from 'react'

interface MobileContainerProps {
  children: ReactNode
  className?: string
}

export default function MobileContainer({ children, className = '' }: MobileContainerProps) {
  return (
    <div className="min-h-screen bg-[#FFFFFF] flex justify-center">
      <div className={`w-full max-w-[480px] md:max-w-[768px] bg-white min-h-screen shadow-2xl md:shadow-none border-l border-r border-gray-200 md:border-0 relative ${className}`}>
        {children}
      </div>
    </div>
  )
}