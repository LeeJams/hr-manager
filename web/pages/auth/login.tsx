import { useState, useEffect } from 'react'
import { signIn, getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import {
  Container,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Alert,
  CircularProgress,
} from '@mui/material'
import { Business as BusinessIcon } from '@mui/icons-material'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    // 이미 로그인된 경우 대시보드로 리다이렉트
    const checkSession = async () => {
      const session = await getSession()
      if (session) {
        router.push('/dashboard')
      }
    }
    checkSession()
  }, [router])

  useEffect(() => {
    // Flutter 앱에서 전달된 토큰이 있는지 확인
    const flutterToken = localStorage.getItem('flutter_token')
    const flutterUser = localStorage.getItem('flutter_user')

    if (flutterToken && flutterUser) {
      // Flutter에서 전달받은 토큰으로 자동 로그인 처리
      handleFlutterAuth(flutterToken, JSON.parse(flutterUser))
    }
  }, [])

  const handleFlutterAuth = async (token: string, userInfo: any) => {
    try {
      setIsLoading(true)
      // Flutter에서 받은 토큰을 서버에 전송하여 세션 생성
      const response = await fetch('/api/auth/flutter-signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, userInfo }),
      })

      if (response.ok) {
        router.push('/dashboard')
      } else {
        setError('Flutter 인증에 실패했습니다.')
      }
    } catch (error) {
      setError('인증 처리 중 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleKakaoLogin = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await signIn('kakao', {
        callbackUrl: '/dashboard',
        redirect: false,
      })

      if (result?.error) {
        setError('카카오 로그인에 실패했습니다.')
      }
    } catch (error) {
      setError('로그인 중 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAppleLogin = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await signIn('apple', {
        callbackUrl: '/dashboard',
        redirect: false,
      })

      if (result?.error) {
        setError('Apple 로그인에 실패했습니다.')
      }
    } catch (error) {
      setError('로그인 중 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        py={4}
      >
        <Card sx={{ width: '100%', maxWidth: 400 }}>
          <CardContent sx={{ p: 4 }}>
            {/* 로고 */}
            <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  backgroundColor: 'primary.light',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2,
                }}
              >
                <BusinessIcon sx={{ fontSize: 40, color: 'primary.main' }} />
              </Box>

              <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
                Techmeet
              </Typography>

              <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                HR Manager
              </Typography>

              <Typography variant="body2" color="textSecondary" textAlign="center">
                간편하게 로그인하고
                <br />
                인력관리를 시작하세요
              </Typography>
            </Box>

            {/* 에러 메시지 */}
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            {/* 로그인 버튼들 */}
            <Box display="flex" flexDirection="column" gap={2}>
              {isLoading ? (
                <Box display="flex" justifyContent="center" p={3}>
                  <CircularProgress />
                </Box>
              ) : (
                <>
                  {/* 카카오 로그인 */}
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={handleKakaoLogin}
                    disabled={isLoading}
                    sx={{
                      backgroundColor: '#FEE500',
                      color: '#000',
                      fontWeight: 'bold',
                      py: 1.5,
                      '&:hover': {
                        backgroundColor: '#FDD835',
                      },
                    }}
                  >
                    카카오톡으로 로그인
                  </Button>

                  {/* Apple 로그인 (iOS Safari에서만 표시) */}
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={handleAppleLogin}
                    disabled={isLoading}
                    sx={{
                      backgroundColor: '#000',
                      color: '#fff',
                      fontWeight: 'bold',
                      py: 1.5,
                      '&:hover': {
                        backgroundColor: '#333',
                      },
                    }}
                  >
                    Apple로 로그인
                  </Button>
                </>
              )}
            </Box>

            {/* 이용약관 */}
            <Typography variant="caption" color="textSecondary" textAlign="center" mt={3} display="block">
              로그인 시 이용약관 및 개인정보처리방침에
              <br />
              동의한 것으로 간주됩니다.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  )
}