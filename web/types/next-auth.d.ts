import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    accessToken?: string
    refreshToken?: string
    provider?: string
    userId?: string
  }

  interface JWT {
    accessToken?: string
    refreshToken?: string
    provider?: string
    userId?: string
  }

  interface User {
    provider?: string
  }
}