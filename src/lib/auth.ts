import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'
import prisma from './prisma'

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'oasis-secret-key-live-forever'
)

export async function getUser() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('auth-token')

    if (!token) {
      return null
    }

    const { payload } = await jwtVerify(token.value, secret)
    
    if (!payload.userId) {
      return null
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId as string },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true
      }
    })

    return user
  } catch (error) {
    console.error('Error verifying token:', error)
    return null
  }
}

export async function getUserFromRequest(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')

    if (!token) {
      return null
    }

    const { payload } = await jwtVerify(token.value, secret)
    
    if (!payload.userId) {
      return null
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId as string },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true
      }
    })

    return user
  } catch (error) {
    console.error('Error verifying token:', error)
    return null
  }
}

export async function requireAuth() {
  const user = await getUser()
  if (!user) {
    throw new Error('Authentication required')
  }
  return user
}
