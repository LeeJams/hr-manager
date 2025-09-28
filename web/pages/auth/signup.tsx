import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Alert,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

interface SignupFormData {
  name: string
  email: string
  phoneNumber: string
  companyName: string
  position: string
  agreeToTerms: boolean
  agreeToPrivacy: boolean
  agreeToMarketing: boolean
}

const signupSchema = yup.object({
  name: yup.string().required('이름을 입력해주세요'),
  email: yup.string().email('올바른 이메일을 입력해주세요').required('이메일을 입력해주세요'),
  phoneNumber: yup.string().required('전화번호를 입력해주세요'),
  companyName: yup.string().required('회사명을 입력해주세요'),
  position: yup.string().required('직책을 입력해주세요'),
  agreeToTerms: yup.boolean().oneOf([true], '이용약관에 동의해주세요'),
  agreeToPrivacy: yup.boolean().oneOf([true], '개인정보처리방침에 동의해주세요'),
  agreeToMarketing: yup.boolean(),
})

const steps = ['로그인 정보', '회사 정보', '약관 동의']

export default function SignupPage() {
  const [activeStep, setActiveStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { data: session } = useSession()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<SignupFormData>({
    resolver: yupResolver(signupSchema),
  })

  useEffect(() => {
    // 세션에서 기본 정보 설정
    if (session?.user) {
      setValue('name', session.user.name || '')
      setValue('email', session.user.email || '')
    }

    // Flutter에서 전달된 사용자 정보 확인
    const flutterUser = localStorage.getItem('flutter_user')
    if (flutterUser) {
      const userInfo = JSON.parse(flutterUser)
      setValue('name', userInfo.nickname || userInfo.name || '')
      setValue('email', userInfo.email || '')
    }
  }, [session, setValue])

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        // 회원가입 성공
        router.push('/dashboard?welcome=true')
      } else {
        const errorData = await response.json()
        setError(errorData.message || '회원가입에 실패했습니다.')
      }
    } catch (error) {
      setError('회원가입 중 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1)
  }

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box display="flex" flexDirection="column" gap={3}>
            <TextField
              label="이름"
              fullWidth
              {...register('name')}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <TextField
              label="이메일"
              fullWidth
              type="email"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
              disabled // OAuth로 로그인한 이메일은 수정 불가
            />
            <TextField
              label="전화번호"
              fullWidth
              placeholder="010-1234-5678"
              {...register('phoneNumber')}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber?.message}
            />
          </Box>
        )

      case 1:
        return (
          <Box display="flex" flexDirection="column" gap={3}>
            <TextField
              label="회사명"
              fullWidth
              {...register('companyName')}
              error={!!errors.companyName}
              helperText={errors.companyName?.message}
            />
            <TextField
              label="직책"
              fullWidth
              placeholder="예: 인사팀 과장, CEO, 팀장 등"
              {...register('position')}
              error={!!errors.position}
              helperText={errors.position?.message}
            />
          </Box>
        )

      case 2:
        return (
          <Box display="flex" flexDirection="column" gap={2}>
            <FormControlLabel
              control={
                <Checkbox
                  {...register('agreeToTerms')}
                  color="primary"
                />
              }
              label={
                <Typography variant="body2">
                  <strong>이용약관</strong>에 동의합니다 (필수)
                </Typography>
              }
            />
            {errors.agreeToTerms && (
              <Typography variant="caption" color="error">
                {errors.agreeToTerms.message}
              </Typography>
            )}

            <FormControlLabel
              control={
                <Checkbox
                  {...register('agreeToPrivacy')}
                  color="primary"
                />
              }
              label={
                <Typography variant="body2">
                  <strong>개인정보처리방침</strong>에 동의합니다 (필수)
                </Typography>
              }
            />
            {errors.agreeToPrivacy && (
              <Typography variant="caption" color="error">
                {errors.agreeToPrivacy.message}
              </Typography>
            )}

            <FormControlLabel
              control={
                <Checkbox
                  {...register('agreeToMarketing')}
                  color="primary"
                />
              }
              label={
                <Typography variant="body2">
                  마케팅 정보 수신에 동의합니다 (선택)
                </Typography>
              }
            />
          </Box>
        )

      default:
        return null
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
        <Card sx={{ width: '100%', maxWidth: 500 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" component="h1" textAlign="center" gutterBottom>
              회원가입
            </Typography>

            <Typography variant="body2" color="textSecondary" textAlign="center" mb={4}>
              Techmeet HR Manager에 오신 것을 환영합니다
            </Typography>

            {/* 단계 표시 */}
            <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {/* 에러 메시지 */}
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            {/* 폼 */}
            <form onSubmit={handleSubmit(onSubmit)}>
              {renderStepContent(activeStep)}

              {/* 버튼들 */}
              <Box display="flex" justifyContent="space-between" mt={4}>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  variant="outlined"
                >
                  이전
                </Button>

                {activeStep === steps.length - 1 ? (
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isLoading}
                    startIcon={isLoading ? <CircularProgress size={20} /> : null}
                  >
                    {isLoading ? '처리 중...' : '회원가입 완료'}
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    variant="contained"
                  >
                    다음
                  </Button>
                )}
              </Box>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Container>
  )
}