import NextAuth, { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '@/utils/prisma'

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    {
      id: 'kakao',
      name: 'Kakao',
      type: 'oauth',
      authorization: {
        url: 'https://kauth.kakao.com/oauth/authorize',
        params: {
          scope: 'profile_nickname profile_image account_email',
        },
      },
      token: 'https://kauth.kakao.com/oauth/token',
      userinfo: 'https://kapi.kakao.com/v2/user/me',
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.kakao_account?.profile?.nickname,
          email: profile.kakao_account?.email,
          image: profile.kakao_account?.profile?.profile_image_url,
          provider: 'kakao',
        }
      },
    },
    {
      id: 'apple',
      name: 'Apple',
      type: 'oauth',
      authorization: {
        url: 'https://appleid.apple.com/auth/authorize',
        params: {
          scope: 'name email',
          response_mode: 'form_post',
        },
      },
      token: 'https://appleid.apple.com/auth/token',
      userinfo: {
        url: 'https://appleid.apple.com/auth/userinfo',
        async request(context) {
          // Apple은 사용자 정보를 직접 제공하지 않으므로
          // ID 토큰에서 정보를 추출해야 함
          return {}
        },
      },
      clientId: process.env.APPLE_CLIENT_ID,
      clientSecret: process.env.APPLE_CLIENT_SECRET,
      profile(profile, tokens) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: null,
          provider: 'apple',
        }
      },
    },
  ],

  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          provider: account.provider,
          userId: user.id,
        }
      }
      return token
    },

    async session({ session, token }) {
      return {
        ...session,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        provider: token.provider,
        userId: token.userId,
      }
    },

    async signIn({ user, account, profile }) {
      if (account?.provider === 'kakao' || account?.provider === 'apple') {
        try {
          // 사용자 정보를 데이터베이스에 저장 또는 업데이트
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email || '' }
          })

          if (!existingUser) {
            // 새 사용자 생성
            await prisma.user.create({
              data: {
                email: user.email || '',
                name: user.name || '',
                image: user.image || '',
                provider: account.provider,
                providerId: user.id,
              }
            })
          } else {
            // 기존 사용자 정보 업데이트
            await prisma.user.update({
              where: { email: user.email || '' },
              data: {
                name: user.name || existingUser.name,
                image: user.image || existingUser.image,
                lastLoginAt: new Date(),
              }
            })
          }

          return true
        } catch (error) {
          console.error('Sign in error:', error)
          return false
        }
      }
      return true
    },

    async redirect({ url, baseUrl }) {
      // Flutter 앱에서 호출된 경우 특별한 처리
      if (url.includes('flutter-callback')) {
        return `${baseUrl}/auth/flutter-callback`
      }

      if (url.startsWith('/')) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
  },

  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)