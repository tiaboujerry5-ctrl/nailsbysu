const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000'

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...init?.headers },
    ...init,
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({ error: 'Unknown error' }))
    throw new Error(body.error ?? `API error ${res.status}`)
  }
  if (res.status === 204) return undefined as T
  return res.json() as Promise<T>
}

// ─── Auth ─────────────────────────────────────────────────────────────────
export interface AuthUser {
  id: string
  email: string
  role: string
}

export function fetchMe(): Promise<{ user: AuthUser }> {
  return apiFetch<{ user: AuthUser }>('/api/auth/me')
}

export function signIn(data: { email: string; password: string }): Promise<{ user: AuthUser }> {
  return apiFetch<{ user: AuthUser }>('/api/auth/sign-in', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export function signUp(data: {
  email: string
  password: string
  firstName: string
  lastName: string
  phone?: string
}): Promise<{ user: AuthUser }> {
  return apiFetch<{ user: AuthUser }>('/api/auth/sign-up', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export function signOut(): Promise<{ message: string }> {
  return apiFetch<{ message: string }>('/api/auth/sign-out', { method: 'POST' })
}

// ─── Services ─────────────────────────────────────────────────────────────
export interface Service {
  id: string
  name: string
  description: string | null
  duration: number
  price: number | string
  category: string
  isActive: boolean
}

export function fetchServices(): Promise<Service[]> {
  return apiFetch<Service[]>('/api/services')
}

// ─── Staff ────────────────────────────────────────────────────────────────
export interface StaffMember {
  id: string
  firstName: string
  lastName: string
  bio: string | null
  photoUrl: string | null
  specialties: string[]
}

export function fetchStaff(): Promise<StaffMember[]> {
  return apiFetch<StaffMember[]>('/api/staff')
}

// ─── Gallery ─────────────────────────────────────────────────────────────
export interface GalleryImage {
  id: string
  url: string
  caption: string | null
  category: string | null
  sortOrder: number
}

export function fetchGallery(): Promise<GalleryImage[]> {
  return apiFetch<GalleryImage[]>('/api/gallery')
}

// ─── Bookings ─────────────────────────────────────────────────────────────
export interface Booking {
  id: string
  serviceId: string
  service: Service
  staffId: string | null
  staff: StaffMember | null
  scheduledAt: string
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW'
  notes: string | null
  depositPaid: boolean
}

export function fetchMyBookings(): Promise<Booking[]> {
  return apiFetch<Booking[]>('/api/bookings/my')
}

export function createBooking(data: {
  serviceId: string
  staffId?: string
  scheduledAt: string
  notes?: string
}): Promise<Booking> {
  return apiFetch<Booking>('/api/bookings', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export function cancelBooking(id: string): Promise<Booking> {
  return apiFetch<Booking>(`/api/bookings/${id}/cancel`, { method: 'PATCH' })
}

// ─── Contact ──────────────────────────────────────────────────────────────
export function sendContact(data: {
  name: string
  email: string
  phone?: string
  message: string
}): Promise<{ message: string }> {
  return apiFetch<{ message: string }>('/api/contact', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}
