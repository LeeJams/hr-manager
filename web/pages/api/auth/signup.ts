import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/utils/prisma'
import bcrypt from 'bcryptjs'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const {
      name,
      email,
      phoneNumber,
      companyName,
      position,
    } = req.body

    // 필수 필드 검증
    if (!name || !email || !phoneNumber || !companyName || !position) {
      return res.status(400).json({ message: '모든 필드를 입력해주세요.' })
    }

    // 이메일 중복 확인
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return res.status(409).json({ message: '이미 가입된 이메일입니다.' })
    }

    // 새 사용자 생성
    const user = await prisma.user.create({
      data: {
        name,
        email,
        phoneNumber,
        companyName,
        position,
        createdAt: new Date(),
      },
    })

    // 비밀번호 정보 제외하고 반환
    const { ...userWithoutPassword } = user

    res.status(201).json({
      message: '회원가입이 완료되었습니다.',
      user: userWithoutPassword,
    })
  } catch (error) {
    console.error('Signup error:', error)
    res.status(500).json({ message: '회원가입 중 오류가 발생했습니다.' })
  }
}