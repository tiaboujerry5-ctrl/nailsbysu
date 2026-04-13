import { Router } from 'express'
import { generalRateLimit } from '../middleware/rateLimit.middleware'
import { sendContactController } from '../controllers/contact.controller'

const router = Router()

router.post('/', generalRateLimit, sendContactController)

export default router
