import { prisma } from '../lib/prisma'
import { CreateBookingInput, UpdateBookingStatusInput } from '../schemas/booking.schema'

export async function createBookingService(
  input: CreateBookingInput,
  userId: string
) {
  const service = await prisma.service.findUnique({ where: { id: input.serviceId } })
  if (!service || !service.isActive) {
    throw Object.assign(new Error('Service not found'), { statusCode: 404 })
  }

  if (input.staffId) {
    const staff = await prisma.staff.findUnique({ where: { id: input.staffId } })
    if (!staff || !staff.isActive) {
      throw Object.assign(new Error('Staff member not found'), { statusCode: 404 })
    }
  }

  const scheduledAt = new Date(input.scheduledAt)
  const endAt = new Date(scheduledAt.getTime() + service.duration * 60 * 1000)

  const conflict = await prisma.appointment.findFirst({
    where: {
      staffId: input.staffId,
      status: { in: ['PENDING', 'CONFIRMED'] },
      scheduledAt: { lt: endAt },
      AND: [{ scheduledAt: { gte: scheduledAt } }],
    },
  })

  if (conflict) {
    throw Object.assign(new Error('Time slot not available'), { statusCode: 409 })
  }

  return prisma.appointment.create({
    data: {
      userId,
      serviceId: input.serviceId,
      staffId: input.staffId,
      scheduledAt,
      notes: input.notes,
    },
    include: { service: true, staff: true },
  })
}

export async function getBookingsForUser(userId: string) {
  return prisma.appointment.findMany({
    where: { userId },
    include: { service: true, staff: true },
    orderBy: { scheduledAt: 'desc' },
  })
}

export async function getAllBookings() {
  return prisma.appointment.findMany({
    include: { service: true, staff: true, user: { include: { profile: true } } },
    orderBy: { scheduledAt: 'desc' },
  })
}

export async function updateBookingStatusService(
  id: string,
  input: UpdateBookingStatusInput
) {
  const appointment = await prisma.appointment.findUnique({ where: { id } })
  if (!appointment) {
    throw Object.assign(new Error('Appointment not found'), { statusCode: 404 })
  }

  return prisma.appointment.update({
    where: { id },
    data: { status: input.status },
  })
}

export async function cancelBookingService(id: string, userId: string) {
  const appointment = await prisma.appointment.findUnique({ where: { id } })
  if (!appointment) {
    throw Object.assign(new Error('Appointment not found'), { statusCode: 404 })
  }
  if (appointment.userId !== userId) {
    throw Object.assign(new Error('Forbidden'), { statusCode: 403 })
  }
  if (appointment.status === 'CANCELLED') {
    throw Object.assign(new Error('Appointment is already cancelled'), { statusCode: 400 })
  }

  return prisma.appointment.update({
    where: { id },
    data: { status: 'CANCELLED' },
  })
}
