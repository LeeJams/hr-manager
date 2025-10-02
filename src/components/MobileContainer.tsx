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
          w-full max-w-[480px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px]
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