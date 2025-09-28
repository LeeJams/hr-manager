import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { prisma } from '@/utils/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const session = await getSession({ req })

    if (!session?.user?.email) {
      return res.status(401).json({ message: '인증이 필요합니다.' })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        provider: true,
        phoneNumber: true,
        companyName: true,
        position: true,
        createdAt: true,
        updatedAt: true,
        lastLoginAt: true,
      },
    })

    if (!user) {
      return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' })
    }

    res.status(200).json(user)
  } catch (error) {
    console.error('Get user error:', error)
    res.status(500).json({ message: '사용자 정보를 불러오는 중 오류가 발생했습니다.' })
  }
}