import { logoutAUTH } from '@/api/login'
import LinkNavbar from '@/components/other/link-navbar'
import { useAuthStore } from '@/store/login-store'
import { useEffect } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router'

const DashboardPage = () => {
    // CREATE IS ACTIVE LINK NAVBAR USING REACT-ROUTER
    const location = useLocation()
    const navigate = useNavigate()
    const { user, clearUser } = useAuthStore()

    // Add auth check
    useEffect(() => {
        // Check if user data exists in Zustand store
        const currentUser = useAuthStore.getState().user
        if (!currentUser?.token) {
            navigate('/login')
        }
    }, [navigate])

    const isActive = (path: string) => {
        return location.pathname === path
    }

    // Update logout handler
    const handleLogout = () => {
        clearUser()
        logoutAUTH(user?.token)
        navigate('/login')
    }

    // Optional: Show loading state while checking auth
    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading...
            </div>
        )
    }

    return (
        <section className="bg-gray-100 min-h-screen">
            <div className="bg-blue-primary bg-[url('/bg-dashboard.png')] min-h-56 lg:min-h-96 bg-bottom bg-no-repeat bg-contain">
                {/* TOP NAV */}
                <div className="container mx-auto py-6 px-8">
                    <div className="flex justify-between items-center">
                        <Link to="/">
                            <img
                                src="/logo_dashboard.png"
                                className="h-24"
                                alt=""
                            />
                        </Link>
                        <div className="flex items-center gap-4">
                            <span className="text-white">
                                Hi, {user.nama_lengkap}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="bg-black text-white px-4 py-2 rounded-md text-sm font-semibold hover:opacity-80"
                            >
                                LOGOUT
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto py-4 px-8 -mt-24 lg:-mt-54">
                {/* MAIN NAV */}
                <div className="flex space-x-3 bg-black/10 -mb-12 pb-15 pt-3 px-8 rounded-3xl">
                    <LinkNavbar
                        to="/dashboard"
                        isActive={isActive('/dashboard')}
                    >
                        Beranda
                    </LinkNavbar>
                    <LinkNavbar
                        to="/dashboard/anak"
                        isActive={isActive('/dashboard/anak')}
                    >
                        List Anak
                    </LinkNavbar>
                    <LinkNavbar
                        to="/dashboard/profil"
                        isActive={isActive('/profil')}
                    >
                        Profil Anda
                    </LinkNavbar>
                </div>
                {/* WRAPPER */}
                <div className="grid grid-cols-12 gap-4 bg-white shadow rounded-3xl py-6 px-8">
                    <Outlet />
                </div>
            </div>
        </section>
    )
}

export default DashboardPage
