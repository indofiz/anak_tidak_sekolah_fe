import { useState } from 'react'
import { logoutAUTH } from '@/api/login'
import LinkNavbar from '@/components/other/link-navbar'
import { useAuthStore } from '@/store/login-store'
import { useEffect } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router'
import { LogOut, Menu, X } from 'lucide-react'

const DashboardPage = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { user, clearUser } = useAuthStore()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    useEffect(() => {
        const currentUser = useAuthStore.getState().user
        if (!currentUser?.token) {
            navigate('/login')
        }
    }, [navigate])

    const isActive = (path: string) => {
        if (path === '/dashboard') {
            return location.pathname === path
        }
        return location.pathname.startsWith(path)
    }

    const handleLogout = () => {
        clearUser()
        logoutAUTH(user?.token)
        navigate('/login')
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading...
            </div>
        )
    }

    return (
        <section className="bg-gray-100 min-h-screen">
            {/* Mobile Sidebar */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <div
                className={`fixed inset-y-0 left-0 w-64 bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="p-4 h-full flex flex-col">
                    <div className="flex justify-between items-center ml-2 mb-6">
                        <span className="text-gray-800">
                            Hi, <br />
                            <span className="text-lg font-semibold text-black">
                                {user.nama_lengkap}
                            </span>
                        </span>
                        <button
                            onClick={() => setIsSidebarOpen(false)}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <nav className="space-y-2 flex-1">
                        <LinkNavbar
                            to="/dashboard"
                            isActive={isActive('/dashboard')}
                            onClick={() => setIsSidebarOpen(false)}
                            className="text-base"
                        >
                            Beranda
                        </LinkNavbar>
                        <LinkNavbar
                            to="/dashboard/anak"
                            isActive={isActive('/dashboard/anak')}
                            onClick={() => setIsSidebarOpen(false)}
                            className="text-base"
                        >
                            List Anak
                        </LinkNavbar>
                        <LinkNavbar
                            to="/dashboard/profil"
                            isActive={isActive('/dashboard/profil')}
                            onClick={() => setIsSidebarOpen(false)}
                            className="text-base"
                        >
                            Profil Anda
                        </LinkNavbar>
                    </nav>

                    <button
                        onClick={handleLogout}
                        className="mt-auto flex items-center justify-center gap-4 bg-gray-100 text-gray-800 hover:text-white px-4 py-3 rounded-md font-semibold hover:bg-red-700"
                    >
                        <LogOut className="w-6 h-6" />
                        Logout
                    </button>
                </div>
            </div>

            {/* Header Section */}
            <div className="bg-blue-primary bg-[url('/bg-dashboard.png')] min-h-48 md:min-h-64 lg:min-h-96 bg-bottom bg-no-repeat bg-cover md:bg-contain">
                <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center gap-4">
                        <Link to="/" className="shrink-0">
                            <img
                                src="/logo_dashboard.png"
                                className="h-16 md:h-20 lg:h-24 transition-all duration-300"
                                alt="Dashboard Logo"
                            />
                        </Link>
                        <div className="flex items-center gap-3 md:gap-4">
                            <div className="hidden md:flex items-center gap-4">
                                <span className="text-white text-sm md:text-base">
                                    Hi, {user.nama_lengkap}
                                </span>
                                <button
                                    onClick={handleLogout}
                                    className="bg-black text-white px-4 py-2 rounded-md text-sm font-semibold hover:opacity-80"
                                >
                                    LOGOUT
                                </button>
                            </div>
                            <button
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                className="md:hidden cursor-pointer text-white border border-white rounded-md p-2 hover:bg-white hover:text-blue-primary transition-colors duration-300"
                            >
                                <Menu className="w-6 h-6 transition-transform duration-300 transform hover:scale-110" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8 -mt-20 md:-mt-24 lg:-mt-32 xl:-mt-48">
                {/* Desktop Navigation */}
                <div className="hidden md:flex flex-wrap gap-3 bg-black/10 pb-16 -mb-12 pt-3 px-6 rounded-3xl">
                    <LinkNavbar
                        to="/dashboard"
                        isActive={isActive('/dashboard')}
                        className="text-base"
                    >
                        Beranda
                    </LinkNavbar>
                    <LinkNavbar
                        to="/dashboard/anak"
                        isActive={isActive('/dashboard/anak')}
                        className="text-base"
                    >
                        List Anak
                    </LinkNavbar>
                    <LinkNavbar
                        to="/dashboard/profil"
                        isActive={isActive('/dashboard/profil')}
                        className="text-base"
                    >
                        Profil Anda
                    </LinkNavbar>
                </div>

                {/* Content Wrapper */}
                <div className="grid grid-cols-12 gap-4 bg-white shadow rounded-xl md:rounded-3xl py-4 md:py-6 px-4 md:px-6 lg:px-8">
                    <Outlet />
                </div>
            </div>
        </section>
    )
}

export default DashboardPage
