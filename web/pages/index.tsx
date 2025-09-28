import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { Container, Box, Typography, CircularProgress } from '@mui/material'
import { useAuth } from '@/hooks/useAuth'

export default function Home() {
  const { data: session, status } = useSession()
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Flutter 앱에서 전달된 토큰 확인
    const handleTokenFromFlutter = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return

      if (event.data.type === 'FLUTTER_TOKEN') {
        const { accessToken, userInfo } = event.data
        // 토큰을 사용하여 세션 설정
        localStorage.setItem('flutter_token', accessToken)
        localStorage.setItem('flutter_user', JSON.stringify(userInfo))
      }
    }

    window.addEventListener('message', handleTokenFromFlutter)
    return () => window.removeEventListener('message', handleTokenFromFlutter)
  }, [])

  useEffect(() => {
    if (status === 'loading' || isLoading) return

    if (!session && !user) {
      // 인증되지 않은 경우 로그인 페이지로 리다이렉트
      router.push('/auth/login')
    } else if (session || user) {
      // 인증된 경우 대시보드로 리다이렉트
      router.push('/dashboard')
    }
  }, [session, user, status, isLoading, router])

  if (status === 'loading' || isLoading) {
    return (
      <Container maxWidth="sm">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="100vh"
        >
          <CircularProgress size={60} />
          <Typography variant="h6" sx={{ mt: 2 }}>
            로딩 중...
          </Typography>
        </Box>
      </Container>
    )
  }

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Typography variant="h3" component="h1" gutterBottom>
          Techmeet
        </Typography>
        <Typography variant="h5" component="h2" color="textSecondary">
          HR Manager
        </Typography>
        <Typography variant="body1" sx={{ mt: 2, textAlign: 'center' }}>
          인력관리 시스템에 오신 것을 환영합니다.
        </Typography>
      </Box>
    </Container>
  )
}