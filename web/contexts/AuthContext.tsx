import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useSession } from 'next-auth/react'

interface User {
  id: string
  email: string
  name: string
  image?: string
  provider: 'kakao' | 'apple'
  createdAt: string
  updatedAt: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  signOut: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { data: session, status } = useSession()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const isAuthenticated = !!session || !!user

  const fetchUser = async () => {
    try {
      const response = await fetch('/api/user/me')
      if (response.ok) {
        const userData = await response.json()
        setUser(userData)
      } else {
        setUser(null)
      }
    } catch (error) {
      console.error('Failed to fetch user:', error)
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  const refreshUser = async () => {
    setIsLoading(true)
    await fetchUser()
  }

  const signOut = async () => {
    try {
      await fetch('/api/auth/signout', { method: 'POST' })
      setUser(null)
      localStorage.removeItem('flutter_token')
      localStorage.removeItem('flutter_user')

      // Flutter 앱에 로그아웃 알림
      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(
          JSON.stringify({ type: 'LOGOUT' })
        )
      }
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  useEffect(() => {
    if (status === 'loading') return

    if (session) {
      // NextAuth 세션이 있는 경우
      setUser({
        id: session.userId,
        email: session.user?.email || '',
        name: session.user?.name || '',
        image: session.user?.image || '',
        provider: session.provider,
        createdAt: '',
        updatedAt: '',
      })
      setIsLoading(false)
    } else {
      // Flutter에서 전달된 토큰 확인
      const flutterToken = localStorage.getItem('flutter_token')
      if (flutterToken) {
        fetchUser()
      } else {
        setIsLoading(false)
      }
    }
  }, [session, status])

  // Flutter 앱과의 통신 설정
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'FLUTTER_AUTH_TOKEN') {
        localStorage.setItem('flutter_token', event.data.token)
        localStorage.setItem('flutter_user', JSON.stringify(event.data.user))
        fetchUser()
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  const value = {
    user,
    isLoading,
    isAuthenticated,
    signOut,
    refreshUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}