import { prisma } from '../lib/prisma'
import argon2 from 'argon2'
import { sign, SignOptions } from 'jsonwebtoken'
import { SignUpInput, SignInInput } from '../schemas/auth.schema'

export interface AuthUser {
  id: string
  email: string
  role: string
}

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'
const JWT_EXPIRES_IN = (process.env.JWT_EXPIRES_IN || '7d') as SignOptions['expiresIn']

export async function signUpService(input: SignUpInput) {
  const existingUser = await prisma.user.findUnique({
    where: { email: input.email },
  })

  if (existingUser) {
    const err = new Error('Email already registered')
    ;(err as any).statusCode = 400
    throw err
  }

  const hashedPassword = await argon2.hash(input.password)

  // Development-only: auto-admin for specific email
  const role = process.env.NODE_ENV !== 'production' && input.email === 'admin@nailsbysu.com' ? 'ADMIN' : 'USER'

  const user = await prisma.user.create({
    data: {
      email: input.email,
      password: hashedPassword,
      firstName: input.firstName,
      lastName: input.lastName,
      phone: input.phone,
      role,
    },
  })

  const token = sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  })

  return { token, user: { id: user.id, email: user.email, role: user.role } }
}

export async function signInService(input: SignInInput) {
  const user = await prisma.user.findUnique({
    where: { email: input.email },
  })

  if (!user) {
    const err = new Error('Invalid email or password')
    ;(err as any).statusCode = 401
    throw err
  }

  const passwordMatch = await argon2.verify(user.password, input.password)

  if (!passwordMatch) {
    const err = new Error('Invalid email or password')
    ;(err as any).statusCode = 401
    throw err
  }

  const token = sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  })

  return { token, user: { id: user.id, email: user.email, role: user.role } }
}