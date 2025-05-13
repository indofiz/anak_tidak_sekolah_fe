import { useState } from 'react'
import { Menu, X } from 'lucide-react' // pastikan lucide-react sudah terinstall
import { Link } from 'react-router'

export default function Header() {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <header className="relative bg-blue-primary bg-[url('/header.png')] bg-bottom bg-no-repeat bg-contain text-white">
            {/* Floating Navbar */}
            <div className="fixed top-5 left-0 right-0 container mx-auto">
                <div className="bg-white/90 backdrop-blur-sm text-black rounded  z-30">
                    <div className="mx-auto flex justify-between items-center px-4 py-2">
                        {/* Logo */}
                        <div className="font-bold px-4 py-2">ATS</div>

                        {/* Desktop Menu */}
                        <nav className="hidden md:flex space-x-6 text-sm font-medium">
                            <a href="#beranda" className="hover:underline">
                                Beranda
                            </a>
                            <a href="#tentang" className="hover:underline">
                                Tentang
                            </a>
                            <a href="#sebaran" className="hover:underline">
                                Persebaran Data
                            </a>
                            <a href="#hubungi" className="hover:underline">
                                Hubungi Kami
                            </a>
                            <a href="#panduan" className="hover:underline">
                                Panduan
                            </a>
                        </nav>

                        {/* Login & Hamburger */}
                        <div className="flex items-center space-x-4">
                            <button className="hidden md:block bg-black text-white px-4 py-2 rounded-md text-sm font-semibold hover:opacity-80">
                                LOGIN
                            </button>
                            {/* Mobile Hamburger */}
                            <button
                                className="md:hidden"
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                            >
                                {sidebarOpen ? (
                                    <X size={24} />
                                ) : (
                                    <Menu size={24} />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sidebar Mobile Menu */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-white text-black shadow-lg z-40 transform transition-transform duration-300 ease-in-out ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } md:hidden`}
            >
                <div className="p-4 space-y-4 text-sm font-medium">
                    <a href="#beranda" className="block hover:underline">
                        Beranda
                    </a>
                    <a href="#tentang" className="block hover:underline">
                        Tentang
                    </a>
                    <a href="#sebaran" className="block hover:underline">
                        Persebaran Data
                    </a>
                    <a href="#hubungi" className="block hover:underline">
                        Hubungi Kami
                    </a>
                    <a href="#panduan" className="block hover:underline">
                        Panduan
                    </a>
                    <button className="w-full bg-black text-white px-4 py-2 rounded-md hover:opacity-90">
                        LOGIN
                    </button>
                </div>
            </div>

            {/* Hero Section */}
            <div className="pt-20 md:pt-0">
                <div className="container mx-auto px-4 py-10 md:min-h-screen md:flex justify-center md:items-center">
                    <div className="text-center md:text-center">
                        <img
                            src="/logo-dikbud.png"
                            alt="Logo Dikbud"
                            className="mx-auto mb-4 w-24 md:w-32"
                        />
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                            ANAK TIDAK SEKOLAH
                        </h1>
                        <p className="tracking-[.25em] text-white text-sm mb-4">
                            PENDATAAN ANAK TIDAK SEKOLAH PANGKALPINANG
                        </p>
                        <p className="text-white text-sm mb-6 max-w-xl mx-auto md:mx-0">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.
                        </p>
                        <Link
                            to="/login"
                            className="cursor-pointer bg-yellow-primary hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-lg"
                        >
                            Login Petugas Pendata
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}
