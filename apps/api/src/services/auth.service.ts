import argon2 from 'argon2'
import jwt from 'jsonwebtoken'
import { prisma } from '../lib/prisma'
import { SignUpInput, SignInInput } from '../schemas/auth.schema'

export interface AuthUser {
  id: string
  email: string
  role: string
}

export async function signUpService(input: SignUpInput): Promise<{ token: string; user: AuthUser }> {
  const existing = await prisma.user.findUnique({ where: { email: input.email } })
  if (existing) {
    throw Object.assign(new Error('Email already in use'), { statusCode: 409 })
  }

  const passwordHash = await argon2.hash(input.password)

  // Dev shortcut: admin@nailsbysu.com gets ADMIN role automatically
  const role =
    process.env.NODE_ENV !== 'production' && input.email === 'admin@nailsbysu.com'
      ? 'ADMIN'
      : 'CLIENT'

  const user = await prisma.user.create({
    data: {
      email: input.email,
      passwordHash,
      role,
      profile: {
        create: {
          firstName: input.firstName,
          lastName: input.lastName,
          phone: input.phone,
        },
      },
    },
  })

  const authUser: AuthUser = { id: user.id, email: user.email, role: user.role }

  const token = jwt.sign(authUser, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN ?? '7d',
  })

  return { token, user: authUser }
}

export async function signInService(input: SignInInput): Promise<{ token: string; user: AuthUser }> {
  const user = await prisma.user.findUnique({ where: { email: input.email } })

  if (!user || !user.passwordHash) {
    throw Object.assign(new Error('Invalid credentials'), { statusCode: 401 })
  }

  const valid = await argon2.verify(user.passwordHash, input.password)
  if (!valid) {
    throw Object.assign(new Error('Invalid credentials'), { statusCode: 401 })
  }

  const authUser: AuthUser = { id: user.id, email: user.email, role: user.role }

  const token = jwt.sign(authUser, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN ?? '7d',
  })

  return { token, user: authUser }
}
