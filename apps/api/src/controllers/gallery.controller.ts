import { Request, Response, NextFunction } from 'express'
import {
  listGallery,
  listGalleryAdmin,
  uploadImage,
  deleteImage,
  reorderGallery,
} from '../services/gallery.service'

export async function listGalleryController(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const images = await listGallery()
    res.status(200).json(images)
  } catch (err) {
    next(err)
  }
}

export async function listGalleryAdminController(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const images = await listGalleryAdmin()
    res.status(200).json(images)
  } catch (err) {
    next(err)
  }
}

export async function uploadImageController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const file = req.file
    const caption = req.body.caption
    const category = req.body.category
    const image = await uploadImage(file!, caption, category)
    res.status(201).json(image)
  } catch (err) {
    next(err)
  }
}

export async function deleteImageController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    await deleteImage(req.params.id as string)
    res.status(204).send()
  } catch (err) {
    next(err)
  }
}

export async function reorderGalleryController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const ids = req.body.ids
    const result = await reorderGallery(ids)
    res.status(200).json(result)
  } catch (err) {
    next(err)
  }
}