'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { formatPrice, formatDuration } from '@/lib/utils'
import { useState } from 'react'

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000'

async function fetchAdminServices() {
  const res = await fetch(`${API_BASE}/api/services/admin/all`, { credentials: 'include' })
  if (!res.ok) throw new Error('Failed to fetch')
  return res.json()
}

async function createService(data: CreateServiceInput) {
  const res = await fetch(`${API_BASE}/api/services`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to create')
  return res.json()
}

async function deleteService(id: string) {
  const res = await fetch(`${API_BASE}/api/services/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  })
  if (!res.ok) throw new Error('Failed to delete')
}

const serviceSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  duration: z.coerce.number().int().positive(),
  price: z.coerce.number().positive(),
  category: z.string().min(1),
})

type CreateServiceInput = z.infer<typeof serviceSchema>

export function AdminServicesClient() {
  const qc = useQueryClient()
  const [showForm, setShowForm] = useState(false)

  const { data: services, isLoading } = useQuery({
    queryKey: ['admin-services'],
    queryFn: fetchAdminServices,
  })

  const { mutate: create, isPending: creating } = useMutation({
    mutationFn: createService,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-services'] }); setShowForm(false); reset() },
  })

  const { mutate: remove } = useMutation({
    mutationFn: deleteService,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-services'] }),
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateServiceInput>({
    resolver: zodResolver(serviceSchema) as any,
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={() => setShowForm((v) => !v)}
          className="bg-noir text-cream px-5 py-2.5 rounded-[--radius-pill] text-sm hover:bg-charcoal transition-colors duration-300"
        >
          {showForm ? 'Cancel' : '+ Add service'}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit((data) => create(data))}
          className="bg-cream rounded-[--radius-card] border border-taupe/15 p-6 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {[
            { name: 'name', label: 'Name', type: 'text' },
            { name: 'category', label: 'Category', type: 'text' },
            { name: 'price', label: 'Price (CAD)', type: 'number' },
            { name: 'duration', label: 'Duration (min)', type: 'number' },
          ].map(({ name, label, type }) => (
            <div key={name}>
              <label className="block text-xs uppercase tracking-[0.1em] text-taupe mb-1.5">{label}</label>
              <input
                {...register(name as keyof CreateServiceInput)}
                type={type}
                className="w-full bg-cream-dark border border-taupe/20 rounded-lg px-3 py-2 text-sm text-noir outline-none focus:border-taupe/50"
              />
              {errors[name as keyof CreateServiceInput] && (
                <p className="mt-1 text-xs text-accent">{errors[name as keyof CreateServiceInput]?.message}</p>
              )}
            </div>
          ))}
          <div className="md:col-span-2">
            <label className="block text-xs uppercase tracking-[0.1em] text-taupe mb-1.5">Description</label>
            <textarea
              {...register('description')}
              rows={2}
              className="w-full bg-cream-dark border border-taupe/20 rounded-lg px-3 py-2 text-sm text-noir outline-none resize-none focus:border-taupe/50"
            />
          </div>
          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              disabled={creating}
              className="bg-noir text-cream px-6 py-2.5 rounded-[--radius-pill] text-sm hover:bg-charcoal transition-colors duration-300 disabled:opacity-50"
            >
              {creating ? 'Creating...' : 'Create service'}
            </button>
          </div>
        </form>
      )}

      <div className="bg-cream rounded-[--radius-card] border border-taupe/15 divide-y divide-taupe/10">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="px-6 py-4 h-14 animate-pulse" />
            ))
          : (services ?? []).map((s: { id: string; name: string; category: string; price: string; duration: number; isActive: boolean }) => (
              <div key={s.id} className="px-6 py-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-noir">{s.name}</p>
                  <p className="text-xs text-muted">{s.category} · {formatDuration(s.duration)}</p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="font-display text-lg text-noir">{formatPrice(s.price)}</p>
                  <button
                    onClick={() => remove(s.id)}
                    className="text-xs text-muted hover:text-accent underline underline-offset-4 transition-colors duration-300"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
        {!services?.length && !isLoading && (
          <p className="px-6 py-8 text-sm text-muted text-center">No services yet</p>
        )}
      </div>
    </div>
  )
}
