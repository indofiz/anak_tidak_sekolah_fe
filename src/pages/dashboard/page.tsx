import LinkNavbar from '@/components/other/link-navbar'
import { Link, Outlet, useLocation } from 'react-router'

const DashboardPage = () => {
    // CREATE IS ACTIVE LINK NAVBAR USING REACT-ROUTER
    const location = useLocation()
    const isActive = (path: string) => {
        return location.pathname === path
    }
    return (
        <section className="bg-gray-100 min-h-screen">
            <div className="bg-blue-primary bg-[url('/bg-dashboard.png')] min-h-44 lg:min-h-64 bg-bottom bg-no-repeat bg-contain">
                {/* TOP NAV */}
                <div className="container mx-auto py-6 px-8">
                    <div className="flex justify-between items-center">
                        <img
                            src="/logo_dashboard.png"
                            className="h-24"
                            alt=""
                        />
                        <button className="bg-black text-white px-4 py-2 rounded-md text-sm font-semibold hover:opacity-80">
                            LOGOUT
                        </button>
                    </div>
                </div>
            </div>
            <div className="container mx-auto py-4 px-8 -mt-24 lg:-mt-32">
                {/* MAIN NAV */}
                <div className="flex space-x-3 mb-4">
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
                        Tambah Anak
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
