'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import { sendContact } from '@/lib/api'
import { cn } from '@/lib/utils'

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type FormValues = z.infer<typeof schema>

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: sendContact,
    onSuccess: () => reset(),
  })

  if (isSuccess) {
    return (
      <div className="rounded-[--radius-card] border border-taupe/20 p-10 text-center">
        <p className="font-display text-2xl text-noir mb-2">Message sent</p>
        <p className="text-sm text-muted">We&apos;ll get back to you within one business day.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit((data) => mutate(data))} className="space-y-6" noValidate>
      <div>
        <label className="block text-xs uppercase tracking-[0.12em] text-taupe mb-2">Name</label>
        <input
          {...register('name')}
          className={cn(
            'w-full bg-cream-dark border rounded-[--radius-card-inner] px-4 py-3 text-sm text-noir placeholder-taupe/50 outline-none transition-colors duration-300',
            errors.name ? 'border-accent/60' : 'border-taupe/25 focus:border-taupe/60'
          )}
          placeholder="Your full name"
        />
        {errors.name && (
          <p className="mt-1.5 text-xs text-accent">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-xs uppercase tracking-[0.12em] text-taupe mb-2">Email</label>
        <input
          {...register('email')}
          type="email"
          className={cn(
            'w-full bg-cream-dark border rounded-[--radius-card-inner] px-4 py-3 text-sm text-noir placeholder-taupe/50 outline-none transition-colors duration-300',
            errors.email ? 'border-accent/60' : 'border-taupe/25 focus:border-taupe/60'
          )}
          placeholder="your@email.com"
        />
        {errors.email && (
          <p className="mt-1.5 text-xs text-accent">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-xs uppercase tracking-[0.12em] text-taupe mb-2">
          Phone <span className="text-taupe/50 normal-case tracking-normal">(optional)</span>
        </label>
        <input
          {...register('phone')}
          type="tel"
          className="w-full bg-cream-dark border border-taupe/25 focus:border-taupe/60 rounded-[--radius-card-inner] px-4 py-3 text-sm text-noir placeholder-taupe/50 outline-none transition-colors duration-300"
          placeholder="+1 (514) 000-0000"
        />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-[0.12em] text-taupe mb-2">Message</label>
        <textarea
          {...register('message')}
          rows={5}
          className={cn(
            'w-full bg-cream-dark border rounded-[--radius-card-inner] px-4 py-3 text-sm text-noir placeholder-taupe/50 outline-none resize-none transition-colors duration-300',
            errors.message ? 'border-accent/60' : 'border-taupe/25 focus:border-taupe/60'
          )}
          placeholder="Tell us what you have in mind..."
        />
        {errors.message && (
          <p className="mt-1.5 text-xs text-accent">{errors.message.message}</p>
        )}
      </div>

      {isError && (
        <p className="text-xs text-accent">
          {error instanceof Error ? error.message : 'Something went wrong. Please try again.'}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-noir text-cream py-4 rounded-[--radius-pill] text-sm font-medium hover:bg-charcoal transition-colors duration-300 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? 'Sending...' : 'Send message'}
      </button>
    </form>
  )
}
