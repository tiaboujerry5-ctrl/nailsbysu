import { prisma } from '../lib/prisma'
import { CreateStaffInput, UpdateStaffInput } from '../schemas/staff.schema'

type StaffRow = {
  id: string
  firstName: string
  lastName: string
  bio: string | null
  photoUrl: string | null
  specialties: string
  isActive: boolean
}

export type StaffOutput = Omit<StaffRow, 'specialties'> & { specialties: string[] }

function toOutput(row: StaffRow): StaffOutput {
  return {
    ...row,
    specialties: JSON.parse(row.specialties || '[]'),
  }
}

export async function getAllStaff(): Promise<StaffOutput[]> {
  const rows = await prisma.staff.findMany({
    where: { isActive: true },
    orderBy: { firstName: 'asc' },
  })
  return (rows as StaffRow[]).map(toOutput)
}

export async function getAllStaffAdmin(): Promise<StaffOutput[]> {
  const rows = await prisma.staff.findMany({ orderBy: { firstName: 'asc' } })
  return (rows as StaffRow[]).map(toOutput)
}

export async function getStaffById(id: string): Promise<StaffOutput> {
  const row = await prisma.staff.findUnique({ where: { id } })
  if (!row) {
    throw Object.assign(new Error('Staff member not found'), { statusCode: 404 })
  }
  return toOutput(row as StaffRow)
}

export async function createStaffRecord(input: CreateStaffInput): Promise<StaffOutput> {
  const row = await prisma.staff.create({
    data: {
      firstName: input.firstName,
      lastName: input.lastName,
      bio: input.bio,
      photoUrl: input.photoUrl,
      specialties: JSON.stringify(input.specialties ?? []),
      isActive: input.isActive ?? true,
    },
  })
  return toOutput(row as StaffRow)
}

export async function updateStaffRecord(id: string, input: UpdateStaffInput): Promise<StaffOutput> {
  const row = await prisma.staff.findUnique({ where: { id } })
  if (!row) {
    throw Object.assign(new Error('Staff member not found'), { statusCode: 404 })
  }
  const updated = await prisma.staff.update({
    where: { id },
    data: {
      ...input,
      specialties: input.specialties ? JSON.stringify(input.specialties) : undefined,
    },
  })
  return toOutput(updated as StaffRow)
}

export async function deleteStaffRecord(id: string) {
  const row = await prisma.staff.findUnique({ where: { id } })
  if (!row) {
    throw Object.assign(new Error('Staff member not found'), { statusCode: 404 })
  }
  return prisma.staff.update({ where: { id }, data: { isActive: false } })
}
