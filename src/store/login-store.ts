import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface UserData {
    nama_lengkap: string
    kelurahan: string
    mobile: string
    email: string
    token: string
}

interface AuthStore {
    user: UserData | null
    setUser: (data: UserData) => void
    clearUser: () => void
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            user: null,
            setUser: (data) => set({ user: data }),
            clearUser: () => set({ user: null }),
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
)
