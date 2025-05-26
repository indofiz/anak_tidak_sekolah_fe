const AboutSection = () => {
    return (
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-8 md:mt-24">
            <div className="w-full grid grid-cols-12 gap-6 lg:gap-8">
                <div className="col-span-12">
                    <div className="text-center mb-8 md:mb-12">
                        <h2 className="text-3xl md:text-4xl font-semibold mb-4">
                            Tentang ATS
                        </h2>
                        <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Quae, quia.
                        </p>
                    </div>

                    <div className="grid grid-cols-12 gap-6 lg:gap-8">
                        {/* First Feature Item */}
                        <div className="col-span-12 md:col-span-6">
                            <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                                <div className="shrink-0">
                                    <div className="relative z-10 w-20 h-20 md:w-24 md:h-24 grid place-items-center">
                                        <div className="absolute inset-0 -z-10 bg-yellow-primary rounded-xl rotate-12" />
                                        <div className="z-10 bg-blue-primary rounded-xl w-full h-full grid place-items-center p-4">
                                            <img
                                                src="/icon/magazine.png"
                                                className="w-12 h-12 md:w-16 md:h-16"
                                                alt="Education Icon"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-1 text-slate-700 leading-relaxed md:leading-8">
                                    Anak Tidak Sekolah (ATS) di Kota Pangkal
                                    Pinang perlu ditangani bersama agar lebih
                                    banyak anak bisa sekolah dan kemiskinan
                                    berkurang. Masyarakat bisa berperan dengan
                                    melaporkan anak yang belum sekolah. Semua
                                    anak berhak mendapat pendidikan, baik formal
                                    maupun non-formal seperti Kejar Paket A, B,
                                    atau C.
                                </div>
                            </div>
                        </div>

                        {/* Second Feature Item */}
                        <div className="col-span-12 md:col-span-6">
                            <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                                <div className="shrink-0">
                                    <div className="relative z-10 w-20 h-20 md:w-24 md:h-24 grid place-items-center">
                                        <div className="absolute inset-0 -z-10 bg-yellow-primary rounded-xl rotate-12" />
                                        <div className="z-10 bg-blue-primary rounded-xl w-full h-full grid place-items-center p-4">
                                            <img
                                                src="/icon/backpack.png"
                                                className="w-12 h-12 md:w-16 md:h-16"
                                                alt="Backpack Icon"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-1 text-slate-700 leading-relaxed md:leading-8">
                                    Anak Tidak Sekolah (ATS) adalah anak usia 5
                                    sampai 18 tahun yang belum pernah sekolah,
                                    atau sempat sekolah tapi nggak selesai
                                    (putus sekolah). Mereka bisa aja belum
                                    sempat masuk PAUD, SD, SMP, atau bahkan
                                    SMA/SMK.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutSection
