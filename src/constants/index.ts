export const COLORS = {
  primary: '#007AFF',
  secondary: '#5856D6',
  success: '#34C759',
  warning: '#FF9500',
  error: '#FF3B30',
  background: '#F2F2F7',
  surface: '#FFFFFF',
  text: '#1C1C1E',
  textSecondary: '#8E8E93',
  border: '#C6C6C8',
} as const;

export const FONTS = {
  regular: 'NotoSans-Regular',
  bold: 'NotoSans-Bold',
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const API_ENDPOINTS = {
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  REFRESH: '/auth/refresh',
  PROFILE: '/user/profile',
  EMPLOYEES: '/employees',
  ATTENDANCE: '/attendance',
  LEAVES: '/leaves',
} as const;

export const STORAGE_KEYS = {
  TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER: 'user_data',
} as const;

export const KAKAO_CONFIG = {
  NATIVE_APP_KEY: 'YOUR_KAKAO_NATIVE_APP_KEY', // 실제 키로 교체 필요
} as const;