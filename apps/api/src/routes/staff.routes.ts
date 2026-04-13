import { Router } from 'express'
import { authMiddleware, requireRole } from '../middleware/auth.middleware'
import {
  listStaffController,
  listStaffAdminController,
  getStaffController,
  createStaffController,
  updateStaffController,
  deleteStaffController,
} from '../controllers/staff.controller'

const router = Router()

router.get('/', listStaffController)
router.get('/:id', getStaffController)

router.get('/admin/all', authMiddleware, requireRole('ADMIN'), listStaffAdminController)
router.post('/', authMiddleware, requireRole('ADMIN'), createStaffController)
router.patch('/:id', authMiddleware, requireRole('ADMIN'), updateStaffController)
router.delete('/:id', authMiddleware, requireRole('ADMIN'), deleteStaffController)

export default router
