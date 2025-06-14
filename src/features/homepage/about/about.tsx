import React from 'react'
import VideoImageAbout from './video-image'

interface GridItem {
    id: number
    icon: string
    text: string
}

const GridAbout: React.FC = () => {
    const items: GridItem[] = [
        {
            id: 1,
            icon: '/icon/backpack.png',
            text: 'Anak Tidak Sekolah menjadi isu penting yang harus ditangani Pemerintah Kota Pangkal Pinang untuk meningkatkan partisipasi pendidikan dan memperkuat penanggulangan kemiskinan. Partisipasi masyarakat sangat dibutuhkan dalam melaporkan keberadaan Anak Tidak Sekolah agar semua anak mendapat hak pendidikan, baik formal maupun nonformal seperti program kejar Paket A/B/C.',
        },
        {
            id: 2,
            icon: '/icon/magazine.png',
            text: 'Anak Tidak Sekolah (ATS) adalah anak yang berusia 5 (lima) s.d. 18 (delapan belas) tahun yang belum pernah sekolah maupun yang belum tuntas dalam mengenyam pendidikan (Anak Putus Sekolah), mulai dari Pendidikan Anak Usia Dini (PAUD), Sekolah Dasar (SD), Sekolah Menengah Pertama (SMP) sampai dengan Sekolah Menengah Atas (SMA/SMK).',
        },
    ]

    return (
        <div className="w-full max-w-7xl mx-auto p-4 my-12 lg:my-24">
            <div className="flex flex-col lg:grid grid-cols-12 gap-8 lg:gap-16">
                {/* Left Section - 5 columns */}
                <div className="col-span-12 md:col-span-6 bg-gray-100 border border-gray-300 rounded-4xl pt-6 px-6 flex items-center justify-center relative">
                    <div className="relative z-10">
                        <VideoImageAbout />
                    </div>
                    <div className="absolute -z-20 inset-0 bg-blue-primary rounded-4xl transform  scale-75 -bottom-22"></div>
                    <div className="absolute -z-10 inset-0 bg-yellow-primary rounded-4xl transform  scale-95 -bottom-6"></div>
                </div>

                {/* Right Section - 7 columns */}
                <div className="col-span-12 md:col-span-6 space-y-6 flex flex-col justify-center items-center">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-start gap-6 lg:gap-8"
                        >
                            {/* Icon Container with decorative element */}
                            <div className="relative flex-shrink-0">
                                {/* Decorative background element with rotation */}
                                <div className="absolute inset-0 bg-yellow-400 rounded-lg transform rotate-12 scale-110 opacity-30"></div>

                                {/* Main icon container */}
                                <div className="relative bg-blue-primary p-3 rounded-lg shadow-lg">
                                    <img
                                        src={item.icon}
                                        className="w-12 h-12"
                                        alt=""
                                    />
                                </div>
                            </div>

                            {/* Text Content */}
                            <div className="flex-1 pt-1">
                                <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                                    {item.text}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default GridAbout
