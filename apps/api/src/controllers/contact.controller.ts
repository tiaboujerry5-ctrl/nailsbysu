import { Request, Response, NextFunction } from 'express'
import { contactSchema } from '../schemas/contact.schema'
import { logger } from '../lib/logger'

export async function sendContactController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const input = contactSchema.parse(req.body)

    // In local dev mode, log the message instead of sending email
    logger.info('Contact form submission received', {
      name: input.name,
      email: input.email,
      phone: input.phone,
      message: input.message,
    })

    res.status(200).json({ message: 'Message received. We will be in touch shortly.' })
  } catch (err) {
    next(err)
  }
}
