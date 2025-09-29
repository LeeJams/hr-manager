import * as AppleAuthentication from 'expo-apple-authentication';
import * as AuthSession from 'expo-auth-session';
import { KakaoLogin } from '@react-native-seoul/kakao-login';
import { Platform } from 'react-native';
import { User } from '../types';
import { apiService } from './api';
import { KAKAO_CONFIG } from '../constants';

export interface SocialLoginResult {
  user: User;
  token: string;
  refreshToken: string;
}

class AuthService {
  // 카카오 로그인 초기화
  async initializeKakao(): Promise<void> {
    try {
      await KakaoLogin.init(KAKAO_CONFIG.NATIVE_APP_KEY);
    } catch (error) {
      console.error('Kakao initialization failed:', error);
      throw error;
    }
  }

  // 카카오 로그인
  async loginWithKakao(): Promise<SocialLoginResult> {
    try {
      // 카카오 토큰 받기
      const kakaoResult = await KakaoLogin.login();
      console.log('Kakao login result:', kakaoResult);

      // 카카오 사용자 정보 가져오기
      const kakaoProfile = await KakaoLogin.getProfile();
      console.log('Kakao profile:', kakaoProfile);

      // 백엔드 서버에 카카오 토큰으로 인증 요청
      const response = await this.authenticateWithSocialProvider({
        provider: 'kakao',
        accessToken: kakaoResult.accessToken,
        profile: {
          id: kakaoProfile.id,
          email: kakaoProfile.email,
          name: kakaoProfile.nickname,
          profileImage: kakaoProfile.profileImageUrl,
        },
      });

      return response;
    } catch (error) {
      console.error('Kakao login failed:', error);
      throw error;
    }
  }

  // 애플 로그인
  async loginWithApple(): Promise<SocialLoginResult> {
    try {
      // 애플 로그인 가능 여부 확인
      const isAvailable = await AppleAuthentication.isAvailableAsync();
      if (!isAvailable) {
        throw new Error('Apple Sign In is not available on this device');
      }

      // 애플 인증 요청
      const appleResult = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      console.log('Apple login result:', appleResult);

      // 백엔드 서버에 애플 토큰으로 인증 요청
      const response = await this.authenticateWithSocialProvider({
        provider: 'apple',
        identityToken: appleResult.identityToken,
        authorizationCode: appleResult.authorizationCode,
        profile: {
          id: appleResult.user,
          email: appleResult.email,
          name: appleResult.fullName ?
            `${appleResult.fullName.givenName} ${appleResult.fullName.familyName}` :
            'Apple User',
        },
      });

      return response;
    } catch (error) {
      console.error('Apple login failed:', error);
      throw error;
    }
  }

  // 구글 로그인 (웹용 - AuthSession 사용)
  async loginWithGoogle(): Promise<SocialLoginResult> {
    try {
      const redirectUri = AuthSession.makeRedirectUri({
        useProxy: true,
      });

      const authUrl = `https://accounts.google.com/oauth/authorize?` +
        `client_id=YOUR_GOOGLE_CLIENT_ID&` +
        `redirect_uri=${encodeURIComponent(redirectUri)}&` +
        `response_type=code&` +
        `scope=openid email profile`;

      const result = await AuthSession.startAsync({
        authUrl,
        returnUrl: redirectUri,
      });

      if (result.type === 'success' && result.params.code) {
        // 백엔드에서 구글 토큰 교환 및 사용자 정보 처리
        const response = await this.authenticateWithSocialProvider({
          provider: 'google',
          authorizationCode: result.params.code,
          redirectUri,
        });

        return response;
      } else {
        throw new Error('Google login was cancelled or failed');
      }
    } catch (error) {
      console.error('Google login failed:', error);
      throw error;
    }
  }

  // 백엔드에 소셜 로그인 인증 요청
  private async authenticateWithSocialProvider(data: any): Promise<SocialLoginResult> {
    try {
      // 실제 백엔드 API 엔드포인트로 요청
      const response = await fetch('/api/auth/social', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Social authentication failed');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Social authentication failed:', error);
      throw error;
    }
  }

  // 이메일/패스워드 로그인
  async loginWithEmail(email: string, password: string): Promise<SocialLoginResult> {
    try {
      const response = await apiService.login({ email, password });
      return response;
    } catch (error) {
      console.error('Email login failed:', error);
      throw error;
    }
  }

  // 로그아웃
  async logout(): Promise<void> {
    try {
      // API 서버에 로그아웃 요청
      await apiService.logout();

      // 카카오 로그아웃
      try {
        await KakaoLogin.logout();
      } catch (error) {
        console.log('Kakao logout skipped or failed:', error);
      }

      // 애플 로그아웃은 별도 처리가 없음 (토큰 무효화만)
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  }

  // 사용자 정보 새로고침
  async refreshUserProfile(): Promise<User> {
    try {
      const user = await apiService.getProfile();
      return user;
    } catch (error) {
      console.error('Failed to refresh user profile:', error);
      throw error;
    }
  }
}

export const authService = new AuthService();