import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Chip,
  Alert,
} from '@mui/material'
import {
  People as PeopleIcon,
  Assignment as AssignmentIcon,
  Analytics as AnalyticsIcon,
  Settings as SettingsIcon,
  AccountCircle,
  Logout,
} from '@mui/icons-material'
import { useAuth } from '@/hooks/useAuth'

export default function DashboardPage() {
  const { user, isLoading, isAuthenticated, signOut } = useAuth()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [showWelcome, setShowWelcome] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/login')
    }

    // 회원가입 완료 후 웰컴 메시지 표시
    if (router.query.welcome === 'true') {
      setShowWelcome(true)
      // URL에서 welcome 파라미터 제거
      router.replace('/dashboard', undefined, { shallow: true })
    }
  }, [isLoading, isAuthenticated, router])

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleSignOut = async () => {
    await signOut()
    handleMenuClose()
    router.push('/auth/login')
  }

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography>로딩 중...</Typography>
      </Box>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  const menuItems = [
    {
      title: '직원 관리',
      description: '직원 정보를 등록하고 관리합니다',
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      href: '/employees',
      color: '#1976d2',
    },
    {
      title: '업무 관리',
      description: '업무 배정 및 진행상황을 관리합니다',
      icon: <AssignmentIcon sx={{ fontSize: 40 }} />,
      href: '/tasks',
      color: '#388e3c',
    },
    {
      title: '통계 및 분석',
      description: '인력 현황과 성과를 분석합니다',
      icon: <AnalyticsIcon sx={{ fontSize: 40 }} />,
      href: '/analytics',
      color: '#f57c00',
    },
    {
      title: '설정',
      description: '시스템 설정을 관리합니다',
      icon: <SettingsIcon sx={{ fontSize: 40 }} />,
      href: '/settings',
      color: '#7b1fa2',
    },
  ]

  return (
    <>
      {/* 상단 앱바 */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Techmeet HR Manager
          </Typography>

          <Box display="flex" alignItems="center" gap={2}>
            <Typography variant="body2">
              {user?.name}님
            </Typography>
            <Chip
              label={user?.provider === 'kakao' ? '카카오' : 'Apple'}
              size="small"
              color="secondary"
            />
            <IconButton
              size="large"
              onClick={handleMenuOpen}
              color="inherit"
            >
              <Avatar src={user?.image} sx={{ width: 32, height: 32 }}>
                {user?.name?.charAt(0)}
              </Avatar>
            </IconButton>
          </Box>

          {/* 사용자 메뉴 */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => router.push('/profile')}>
              <AccountCircle sx={{ mr: 1 }} />
              프로필
            </MenuItem>
            <MenuItem onClick={handleSignOut}>
              <Logout sx={{ mr: 1 }} />
              로그아웃
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {/* 웰컴 메시지 */}
        {showWelcome && (
          <Alert
            severity="success"
            onClose={() => setShowWelcome(false)}
            sx={{ mb: 4 }}
          >
            <Typography variant="h6">환영합니다! 🎉</Typography>
            <Typography variant="body2">
              Techmeet HR Manager에 가입해주셔서 감사합니다. 이제 인력관리를 시작해보세요.
            </Typography>
          </Alert>
        )}

        {/* 대시보드 헤더 */}
        <Box mb={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            대시보드
          </Typography>
          <Typography variant="body1" color="textSecondary">
            안녕하세요, {user?.name}님! 오늘도 효율적인 인력관리를 시작해보세요.
          </Typography>
        </Box>

        {/* 메뉴 카드들 */}
        <Grid container spacing={3}>
          {menuItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={6} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                  },
                }}
                onClick={() => router.push(item.href)}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: 'center', pt: 4 }}>
                  <Box
                    sx={{
                      color: item.color,
                      mb: 2,
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {item.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
                  <Button size="small" color="primary">
                    바로가기
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* 빠른 통계 */}
        <Box mt={6}>
          <Typography variant="h5" component="h2" gutterBottom>
            빠른 현황
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" color="primary">
                    0
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    등록된 직원 수
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" color="secondary">
                    0
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    진행 중인 업무
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" color="success.main">
                    0
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    완료된 업무
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  )
}