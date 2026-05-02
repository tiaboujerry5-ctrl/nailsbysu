import { Request, Response, NextFunction } from 'express'
import { createBookingSchema, updateBookingStatusSchema } from '../schemas/booking.schema'
import {
  createBooking,
  getMyBookings,
  getAllBookings,
  updateBookingStatus,
  cancelBooking,
} from '../services/booking.service'

export async function createBookingController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const input = createBookingSchema.parse(req.body)
    const booking = await createBooking(input, req.user!.id)
    res.status(201).json(booking)
  } catch (err) {
    next(err)
  }
}

export async function getMyBookingsController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const bookings = await getMyBookings(req.user!.id)
    res.status(200).json(bookings)
  } catch (err) {
    next(err)
  }
}

export async function getAllBookingsController(
  req: Request,
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
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const input = updateBookingStatusSchema.parse(req.body)
    const booking = await updateBookingStatus(req.params.id as string, input)
    res.status(200).json(booking)
  } catch (err) {
    next(err)
  }
}

export async function cancelBookingController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    await cancelBooking(req.params.id as string, req.user!.id)
    res.status(204).send()
  } catch (err) {
    next(err)
  }
}