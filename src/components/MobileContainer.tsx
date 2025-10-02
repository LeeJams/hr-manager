import { ReactNode } from 'react'

interface MobileContainerProps {
  children: ReactNode
  className?: string
}

export default function MobileContainer({ children, className = '' }: MobileContainerProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex justify-center">
      <div
        className={`
          w-full max-w-[480px] md:max-w-[640px]
          bg-white min-h-screen
          shadow-xl
          relative ${className}
        `}
      >
        {children}
      </div>
    </div>
  )
}