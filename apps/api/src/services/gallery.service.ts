import * as fs from 'fs'
import * as path from 'path'
import { prisma } from '../lib/prisma'

const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads')

// Ensure uploads directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true })
}

export async function getPublishedGallery() {
  return prisma.galleryImage.findMany({
    where: { isPublished: true },
    orderBy: { sortOrder: 'asc' },
  })
}

export async function getAllGalleryAdmin() {
  return prisma.galleryImage.findMany({ orderBy: { sortOrder: 'asc' } })
}

export async function uploadGalleryImage(
  fileBuffer: Buffer,
  originalName: string,
  caption?: string,
  category?: string
) {
  const ext = path.extname(originalName)
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`
  const filepath = path.join(UPLOADS_DIR, filename)

  fs.writeFileSync(filepath, fileBuffer)

  const url = `${process.env.API_URL ?? 'http://localhost:4000'}/uploads/${filename}`

  return prisma.galleryImage.create({
    data: { url, caption, category },
  })
}

export async function deleteGalleryImage(id: string) {
  const image = await prisma.galleryImage.findUnique({ where: { id } })
  if (!image) {
    throw Object.assign(new Error('Image not found'), { statusCode: 404 })
  }
  return prisma.galleryImage.update({ where: { id }, data: { isPublished: false } })
}

export async function updateGallerySortOrder(items: { id: string; sortOrder: number }[]) {
  await Promise.all(
    items.map(({ id, sortOrder }) =>
      prisma.galleryImage.update({ where: { id }, data: { sortOrder } })
    )
  )
}
