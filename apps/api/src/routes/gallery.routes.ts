import { Router } from 'express'
import multer from 'multer'
import { authMiddleware, requireRole } from '../middleware/auth.middleware'
import {
  listGalleryController,
  listGalleryAdminController,
  uploadImageController,
  deleteImageController,
  reorderGalleryController,
} from '../controllers/gallery.controller'

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true)
    } else {
      cb(new Error('Only image files are allowed'))
    }
  },
})

const router = Router()

router.get('/', listGalleryController)

router.get('/admin/all', authMiddleware, requireRole('ADMIN'), listGalleryAdminController)
router.post('/', authMiddleware, requireRole('ADMIN'), upload.single('image'), uploadImageController)
router.delete('/:id', authMiddleware, requireRole('ADMIN'), deleteImageController)
router.patch('/reorder', authMiddleware, requireRole('ADMIN'), reorderGalleryController)

export default router
