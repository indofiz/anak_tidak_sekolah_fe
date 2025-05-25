// components/protected-route.tsx
import { useEffect } from 'react'
import { useAuthStore } from '@/store/login-store'
import { useNavigate } from 'react-router'

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate()
    const { user } = useAuthStore()

    useEffect(() => {
        if (!user?.token) {
            navigate('/login')
        }
    }, [user, navigate])

    return user ? <>{children}</> : null
}
