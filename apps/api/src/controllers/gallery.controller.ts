import { Request, Response, NextFunction } from 'express'
import {
  getPublishedGallery,
  getAllGalleryAdmin,
  uploadGalleryImage,
  deleteGalleryImage,
  updateGallerySortOrder,
} from '../services/gallery.service'

export async function listGalleryController(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const images = await getPublishedGallery()
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
    const images = await getAllGalleryAdmin()
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
    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded' })
      return
    }
    const image = await uploadGalleryImage(
      req.file.buffer,
      req.file.originalname,
      req.body.caption,
      req.body.category
    )
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
    await deleteGalleryImage(req.params.id)
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
    const { items } = req.body as { items: { id: string; sortOrder: number }[] }
    await updateGallerySortOrder(items)
    res.status(200).json({ message: 'Gallery reordered' })
  } catch (err) {
    next(err)
  }
}
