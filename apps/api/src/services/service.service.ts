import { prisma } from '../lib/prisma'
import { CreateServiceInput, UpdateServiceInput } from '../schemas/service.schema'

export async function getAllServices() {
  return prisma.service.findMany({
    where: { isActive: true },
    orderBy: { category: 'asc' },
  })
}

export async function getAllServicesAdmin() {
  return prisma.service.findMany({ orderBy: { category: 'asc' } })
}

export async function getServiceById(id: string) {
  const service = await prisma.service.findUnique({ where: { id } })
  if (!service) {
    throw Object.assign(new Error('Service not found'), { statusCode: 404 })
  }
  return service
}

export async function createServiceRecord(input: CreateServiceInput) {
  return prisma.service.create({ data: input })
}

export async function updateServiceRecord(id: string, input: UpdateServiceInput) {
  const service = await prisma.service.findUnique({ where: { id } })
  if (!service) {
    throw Object.assign(new Error('Service not found'), { statusCode: 404 })
  }
  return prisma.service.update({ where: { id }, data: input })
}

export async function deleteServiceRecord(id: string) {
  const service = await prisma.service.findUnique({ where: { id } })
  if (!service) {
    throw Object.assign(new Error('Service not found'), { statusCode: 404 })
  }
  return prisma.service.update({ where: { id }, data: { isActive: false } })
}
