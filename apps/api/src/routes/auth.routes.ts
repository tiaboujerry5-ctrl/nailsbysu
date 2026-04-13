import { Router } from 'express'
import { authRateLimit } from '../middleware/rateLimit.middleware'
import { authMiddleware } from '../middleware/auth.middleware'
import {
  signUpController,
  signInController,
  signOutController,
  getMeController,
} from '../controllers/auth.controller'

const router = Router()

router.post('/sign-up', authRateLimit, signUpController)
router.post('/sign-in', authRateLimit, signInController)
router.post('/sign-out', signOutController)
router.get('/me', authMiddleware, getMeController)

export default router
