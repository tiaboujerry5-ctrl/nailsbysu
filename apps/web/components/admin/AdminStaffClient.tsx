'use client'

import Image from 'next/image'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000'

async function fetchAdminStaff() {
  const res = await fetch(`${API_BASE}/api/staff/admin/all`, { credentials: 'include' })
  if (!res.ok) throw new Error('Failed to fetch')
  return res.json()
}

async function createStaff(data: CreateStaffInput) {
  const res = await fetch(`${API_BASE}/api/staff`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to create')
  return res.json()
}

async function deleteStaff(id: string) {
  const res = await fetch(`${API_BASE}/api/staff/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  })
  if (!res.ok) throw new Error('Failed to delete')
}

const staffSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  bio: z.string().optional(),
  photoUrl: z.string().url().optional().or(z.literal('')),
  specialties: z.string().optional(),
})

type CreateStaffInput = z.infer<typeof staffSchema>

export function AdminStaffClient() {
  const qc = useQueryClient()
  const [showForm, setShowForm] = useState(false)

  const { data: staff, isLoading } = useQuery({
    queryKey: ['admin-staff'],
    queryFn: fetchAdminStaff,
  })

  const { mutate: create, isPending: creating } = useMutation({
    mutationFn: (data: CreateStaffInput) =>
      createStaff({
        ...data,
        specialties: data.specialties?.split(',').map((s) => s.trim()).filter(Boolean).join(',') as unknown as string,
      }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-staff'] }); setShowForm(false); reset() },
  })

  const { mutate: remove } = useMutation({
    mutationFn: deleteStaff,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-staff'] }),
  })

  const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateStaffInput>({
    resolver: zodResolver(staffSchema),
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={() => setShowForm((v) => !v)}
          className="bg-noir text-cream px-5 py-2.5 rounded-[--radius-pill] text-sm hover:bg-charcoal transition-colors duration-300"
        >
          {showForm ? 'Cancel' : '+ Add staff member'}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit((data) => create(data))}
          className="bg-cream rounded-[--radius-card] border border-taupe/15 p-6 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {[
            { name: 'firstName', label: 'First name' },
            { name: 'lastName', label: 'Last name' },
            { name: 'photoUrl', label: 'Photo URL' },
            { name: 'specialties', label: 'Specialties (comma-separated)' },
          ].map(({ name, label }) => (
            <div key={name}>
              <label className="block text-xs uppercase tracking-[0.1em] text-taupe mb-1.5">{label}</label>
              <input
                {...register(name as keyof CreateStaffInput)}
                className="w-full bg-cream-dark border border-taupe/20 rounded-lg px-3 py-2 text-sm text-noir outline-none focus:border-taupe/50"
              />
              {errors[name as keyof CreateStaffInput] && (
                <p className="mt-1 text-xs text-accent">{errors[name as keyof CreateStaffInput]?.message}</p>
              )}
            </div>
          ))}
          <div className="md:col-span-2">
            <label className="block text-xs uppercase tracking-[0.1em] text-taupe mb-1.5">Bio</label>
            <textarea
              {...register('bio')}
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
              {creating ? 'Creating...' : 'Add member'}
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-40 bg-cream animate-pulse rounded-[--radius-card]" />
            ))
          : (staff ?? []).map((m: { id: string; firstName: string; lastName: string; photoUrl?: string | null; specialties: string[]; bio?: string | null }) => (
              <div key={m.id} className="bg-cream rounded-[--radius-card] border border-taupe/15 p-5">
                <div className="flex items-start gap-4 mb-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-blush/40 shrink-0">
                    {m.photoUrl ? (
                      <Image src={m.photoUrl} alt={m.firstName} width={48} height={48} className="object-cover w-full h-full" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="font-display text-lg text-taupe">{m.firstName[0]}</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-noir">{m.firstName} {m.lastName}</p>
                    {m.specialties.length > 0 && (
                      <p className="text-xs text-muted mt-0.5">{m.specialties.join(' · ')}</p>
                    )}
                  </div>
                </div>
                {m.bio && <p className="text-xs text-charcoal/60 leading-relaxed mb-4">{m.bio}</p>}
                <button
                  onClick={() => remove(m.id)}
                  className="text-xs text-muted hover:text-accent underline underline-offset-4 transition-colors duration-300"
                >
                  Remove
                </button>
              </div>
            ))}
        {!staff?.length && !isLoading && (
          <p className="text-sm text-muted col-span-full text-center py-8">No staff members yet</p>
        )}
      </div>
    </div>
  )
}
