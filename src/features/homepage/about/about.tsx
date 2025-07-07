import React from 'react'
import VideoImageAbout from './video-image'
import { Element } from 'react-scroll'

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
        <Element
            name="tentang"
            id="tentang"
            className="w-full max-w-7xl mx-auto px-4 py-12 md:py-16 lg:py-24"
        >
            <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-16">
                {/* Left Section - Video */}
                <div className="lg:col-span-6 w-full relative min-h-[300px] sm:min-h-[400px] bg-gray-100 border border-gray-300 rounded-3xl p-6 pb-0 flex items-end justify-center">
                    <div className="relative z-10 w-full">
                        <VideoImageAbout />
                    </div>
                    <div className="absolute inset-0 rounded-3xl bg-blue-primary scale-75 sm:scale-90 -z-20" />
                    <div className="absolute inset-0 rounded-3xl bg-yellow-primary scale-95 -z-10" />
                </div>

                {/* Right Section - Text */}
                <div className="lg:col-span-6 space-y-6 flex flex-col justify-center">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-start gap-4 sm:gap-6"
                        >
                            <div className="relative flex-shrink-0">
                                <div className="absolute inset-0 bg-yellow-400 rounded-lg rotate-12 scale-110 opacity-30"></div>
                                <div className="relative bg-blue-primary p-3 rounded-lg shadow-lg">
                                    <img
                                        src={item.icon}
                                        alt=""
                                        className="w-10 h-10 sm:w-12 sm:h-12"
                                    />
                                </div>
                            </div>
                            <div className="flex-1">
                                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                                    {item.text}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Element>
    )
}

export default GridAbout
