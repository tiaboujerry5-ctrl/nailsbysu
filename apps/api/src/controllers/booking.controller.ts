import { Response, NextFunction } from 'express'
import { AuthenticatedRequest } from '../middleware/auth.middleware'
import { createBookingSchema, updateBookingStatusSchema } from '../schemas/booking.schema'
import {
  createBookingService,
  getBookingsForUser,
  getAllBookings,
  updateBookingStatusService,
  cancelBookingService,
} from '../services/booking.service'

export async function createBookingController(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const input = createBookingSchema.parse(req.body)
    const booking = await createBookingService(input, req.user!.id)
    res.status(201).json(booking)
  } catch (err) {
    next(err)
  }
}

export async function getMyBookingsController(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const bookings = await getBookingsForUser(req.user!.id)
    res.status(200).json(bookings)
  } catch (err) {
    next(err)
  }
}

export async function getAllBookingsController(
  _req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const bookings = await getAllBookings()
    res.status(200).json(bookings)
  } catch (err) {
    next(err)
  }
}

export async function updateBookingStatusController(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const input = updateBookingStatusSchema.parse(req.body)
    const booking = await updateBookingStatusService(req.params.id, input)
    res.status(200).json(booking)
  } catch (err) {
    next(err)
  }
}

export async function cancelBookingController(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const booking = await cancelBookingService(req.params.id, req.user!.id)
    res.status(200).json(booking)
  } catch (err) {
    next(err)
  }
}
