import { Request, Response, NextFunction } from 'express'
import { signUpSchema, signInSchema } from '../schemas/auth.schema'
import { signUpService, signInService } from '../services/auth.service'
import { AuthenticatedRequest } from '../middleware/auth.middleware'

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: 7 * 24 * 60 * 60 * 1000,
}

export async function signUpController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const input = signUpSchema.parse(req.body)
    const { token, user } = await signUpService(input)
    res.cookie('token', token, COOKIE_OPTIONS)
    res.status(201).json({ user })
  } catch (err) {
    next(err)
  }
}

export async function signInController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const input = signInSchema.parse(req.body)
    const { token, user } = await signInService(input)
    res.cookie('token', token, COOKIE_OPTIONS)
    res.status(200).json({ user })
  } catch (err) {
    next(err)
  }
}

export function signOutController(_req: Request, res: Response): void {
  res.clearCookie('token')
  res.status(200).json({ message: 'Signed out successfully' })
}

export function getMeController(req: AuthenticatedRequest, res: Response): void {
  res.status(200).json({ user: req.user })
}
