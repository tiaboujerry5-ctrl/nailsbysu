import { Router } from 'express'
import { authMiddleware, requireRole } from '../middleware/auth.middleware'
import {
  listServicesController,
  listServicesAdminController,
  getServiceController,
  createServiceController,
  updateServiceController,
  deleteServiceController,
} from '../controllers/service.controller'

const router = Router()

router.get('/', listServicesController)
router.get('/:id', getServiceController)

router.get('/admin/all', authMiddleware, requireRole('ADMIN'), listServicesAdminController)
router.post('/', authMiddleware, requireRole('ADMIN'), createServiceController)
router.patch('/:id', authMiddleware, requireRole('ADMIN'), updateServiceController)
router.delete('/:id', authMiddleware, requireRole('ADMIN'), deleteServiceController)

export default router
