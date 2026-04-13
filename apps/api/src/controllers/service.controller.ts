import { Request, Response, NextFunction } from 'express'
import { createServiceSchema, updateServiceSchema } from '../schemas/service.schema'
import {
  getAllServices,
  getAllServicesAdmin,
  getServiceById,
  createServiceRecord,
  updateServiceRecord,
  deleteServiceRecord,
} from '../services/service.service'

export async function listServicesController(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const services = await getAllServices()
    res.status(200).json(services)
  } catch (err) {
    next(err)
  }
}

export async function listServicesAdminController(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const services = await getAllServicesAdmin()
    res.status(200).json(services)
  } catch (err) {
    next(err)
  }
}

export async function getServiceController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const service = await getServiceById(req.params.id)
    res.status(200).json(service)
  } catch (err) {
    next(err)
  }
}

export async function createServiceController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const input = createServiceSchema.parse(req.body)
    const service = await createServiceRecord(input)
    res.status(201).json(service)
  } catch (err) {
    next(err)
  }
}

export async function updateServiceController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const input = updateServiceSchema.parse(req.body)
    const service = await updateServiceRecord(req.params.id, input)
    res.status(200).json(service)
  } catch (err) {
    next(err)
  }
}

export async function deleteServiceController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    await deleteServiceRecord(req.params.id)
    res.status(204).send()
  } catch (err) {
    next(err)
  }
}
