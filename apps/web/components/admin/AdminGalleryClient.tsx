'use client'

import Image from 'next/image'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useRef } from 'react'

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000'

async function fetchAdminGallery() {
  const res = await fetch(`${API_BASE}/api/gallery/admin/all`, { credentials: 'include' })
  if (!res.ok) throw new Error('Failed to fetch')
  return res.json()
}

async function uploadImage(file: File, caption?: string, category?: string) {
  const form = new FormData()
  form.append('image', file)
  if (caption) form.append('caption', caption)
  if (category) form.append('category', category)
  const res = await fetch(`${API_BASE}/api/gallery`, {
    method: 'POST',
    credentials: 'include',
    body: form,
  })
  if (!res.ok) throw new Error('Upload failed')
  return res.json()
}

async function removeImage(id: string) {
  const res = await fetch(`${API_BASE}/api/gallery/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  })
  if (!res.ok) throw new Error('Failed to delete')
}

export function AdminGalleryClient() {
  const qc = useQueryClient()
  const fileRef = useRef<HTMLInputElement>(null)

  const { data: images, isLoading } = useQuery({
    queryKey: ['admin-gallery'],
    queryFn: fetchAdminGallery,
  })

  const { mutate: upload, isPending: uploading } = useMutation({
    mutationFn: ({ file }: { file: File }) => uploadImage(file),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-gallery'] }),
  })

  const { mutate: remove } = useMutation({
    mutationFn: removeImage,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-gallery'] }),
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) upload({ file })
            e.target.value = ''
          }}
        />
        <button
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="bg-noir text-cream px-5 py-2.5 rounded-[--radius-pill] text-sm hover:bg-charcoal transition-colors duration-300 disabled:opacity-50"
        >
          {uploading ? 'Uploading...' : '+ Upload image'}
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-square bg-cream animate-pulse rounded-[--radius-card]" />
            ))
          : (images ?? []).map((img: { id: string; url: string; caption?: string | null }) => (
              <div key={img.id} className="group relative aspect-square overflow-hidden rounded-[--radius-card] bg-blush/20">
                <Image src={img.url} alt={img.caption ?? 'Gallery image'} fill className="object-cover" sizes="25vw" />
                <div className="absolute inset-0 bg-noir/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button
                    onClick={() => remove(img.id)}
                    className="bg-cream text-noir text-xs px-3 py-1.5 rounded-[--radius-pill] hover:bg-blush transition-colors duration-300"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
        {!images?.length && !isLoading && (
          <p className="col-span-full text-sm text-muted text-center py-8">No images yet</p>
        )}
      </div>
    </div>
  )
}
