import { create } from 'zustand'

export interface AuthUser {
  id: string
  email: string
  role: string
}

interface AuthState {
  user: AuthUser | null
  isLoaded: boolean
  setUser: (user: AuthUser | null) => void
  clearUser: () => void
  setLoaded: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoaded: false,
  setUser: (user) => set({ user, isLoaded: true }),
  clearUser: () => set({ user: null, isLoaded: true }),
  setLoaded: () => set({ isLoaded: true }),
}))
