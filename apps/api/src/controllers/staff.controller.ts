import { Request, Response, NextFunction } from 'express'
import { createStaffSchema, updateStaffSchema } from '../schemas/staff.schema'
import {
  getAllStaff,
  getAllStaffAdmin,
  getStaffById,
  createStaffRecord,
  updateStaffRecord,
  deleteStaffRecord,
} from '../services/staff.service'

export async function listStaffController(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const staff = await getAllStaff()
    res.status(200).json(staff)
  } catch (err) {
    next(err)
  }
}

export async function listStaffAdminController(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const staff = await getAllStaffAdmin()
    res.status(200).json(staff)
  } catch (err) {
    next(err)
  }
}

export async function getStaffController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const staff = await getStaffById(req.params.id)
    res.status(200).json(staff)
  } catch (err) {
    next(err)
  }
}

export async function createStaffController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const input = createStaffSchema.parse(req.body)
    const staff = await createStaffRecord(input)
    res.status(201).json(staff)
  } catch (err) {
    next(err)
  }
}

export async function updateStaffController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const input = updateStaffSchema.parse(req.body)
    const staff = await updateStaffRecord(req.params.id, input)
    res.status(200).json(staff)
  } catch (err) {
    next(err)
  }
}

export async function deleteStaffController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    await deleteStaffRecord(req.params.id)
    res.status(204).send()
  } catch (err) {
    next(err)
  }
}
