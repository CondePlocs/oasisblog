import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'oasis-secret-key-live-forever'
)

export interface User {
  userId: string
  email: string
  name: string
}

export async function getUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('auth-token')

    if (!token) {
      return null
    }

    const { payload } = await jwtVerify(token.value, JWT_SECRET)
    
    return {
      userId: payload.userId as string,
      email: payload.email as string,
      name: payload.name as string
    }
  } catch (error) {
    console.error('Error verificando token:', error)
    return null
  }
}

export async function requireAuth(): Promise<User> {
  const user = await getUser()
  
  if (!user) {
    throw new Error('No autorizado')
  }
  
  return user
}
