import 'dotenv/config'
import express, { Request, Response, NextFunction } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import path from 'path'
import { generalRateLimit } from './middleware/rateLimit.middleware'
import { logger } from './lib/logger'

import authRoutes from './routes/auth.routes'
import bookingRoutes from './routes/booking.routes'
import serviceRoutes from './routes/service.routes'
import staffRoutes from './routes/staff.routes'
import galleryRoutes from './routes/gallery.routes'
import contactRoutes from './routes/contact.routes'

const app = express()
const PORT = process.env.PORT ?? 4000

app.use(helmet())
app.use(
  cors({
    origin: process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
    credentials: true,
  })
)
app.use(cookieParser())
app.use(express.json({ limit: '10mb' }))
app.use(generalRateLimit)

app.use('/uploads', express.static(path.join(process.cwd(), 'public', 'uploads')))

app.use('/api/auth', authRoutes)
app.use('/api/bookings', bookingRoutes)
app.use('/api/services', serviceRoutes)
app.use('/api/staff', staffRoutes)
app.use('/api/gallery', galleryRoutes)
app.use('/api/contact', contactRoutes)

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' })
})

app.use((err: Error & { statusCode?: number }, _req: Request, res: Response, _next: NextFunction) => {
  const statusCode = err.statusCode ?? 500
  const message = statusCode < 500 ? err.message : 'Internal server error'
  if (statusCode >= 500) {
    logger.error(err.message, { stack: err.stack })
  }
  res.status(statusCode).json({ error: message })
})

app.listen(PORT, () => {
  logger.info(`API server running on http://localhost:${PORT}`)
})

export default app
