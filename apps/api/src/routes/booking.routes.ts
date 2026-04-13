import { Router } from 'express'
import { authMiddleware, requireRole } from '../middleware/auth.middleware'
import { bookingRateLimit } from '../middleware/rateLimit.middleware'
import {
  createBookingController,
  getMyBookingsController,
  getAllBookingsController,
  updateBookingStatusController,
  cancelBookingController,
} from '../controllers/booking.controller'

const router = Router()

router.get('/my', authMiddleware, getMyBookingsController)
router.post('/', authMiddleware, bookingRateLimit, createBookingController)
router.patch('/:id/cancel', authMiddleware, cancelBookingController)

router.get('/admin', authMiddleware, requireRole('ADMIN'), getAllBookingsController)
router.patch('/admin/:id/status', authMiddleware, requireRole('ADMIN'), updateBookingStatusController)

export default router
