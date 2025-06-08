import VideoImageAbout from './video-image'

const AboutSection = () => {
    return (
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-8 md:mt-24">
            <div className="text-center mb-8 md:mb-12">
                <h2 className="text-3xl md:text-4xl font-semibold mb-4">
                    Tentang ATS
                </h2>
                <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto">
                    Bersama Wujudkan Hak Pendidikan untuk Semua Anak
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24">
                <VideoImageAbout />
                <div className="md:col-span-6 flex flex-col gap-8 items-center justify-center">
                    {/* First Feature Item */}
                    <div className="flex gap-6">
                        <div className="relative z-10 w-24 h-24 md:w-24 md:h-24 grid place-items-center">
                            <div className="absolute inset-0 -z-10 bg-yellow-primary rounded-xl rotate-12" />
                            <div className="z-10 bg-blue-primary rounded-xl w-full h-full grid place-items-center p-4">
                                <img
                                    src="/icon/magazine.png"
                                    className="w-12 h-12 md:w-16 md:h-16"
                                    alt="Megazine Icon"
                                />
                            </div>
                        </div>
                        <div className="w-full text-sm md:text-base md:flex-1 text-slate-700 leading-relaxed md:leading-8 break-words">
                            Anak Tidak Sekolah (ATS) adalah anak usia 5–18 tahun
                            yang belum pernah mengenyam pendidikan atau putus
                            sekolah, baik di jenjang PAUD, SD, SMP, maupun
                            SMA/SMK.
                        </div>
                    </div>
                    {/* Second Feature Item */}
                    <div className="flex gap-6">
                        <div className="relative z-10 w-24 h-24 md:w-24 md:h-24 grid place-items-center">
                            <div className="absolute inset-0 -z-10 bg-yellow-primary rounded-xl rotate-12" />
                            <div className="z-10 bg-blue-primary rounded-xl w-full h-full grid place-items-center p-4">
                                <img
                                    src="/icon/backpack.png"
                                    className="w-12 h-12 md:w-16 md:h-16"
                                    alt="Backpack Icon"
                                />
                            </div>
                        </div>
                        <div className="w-full text-sm md:text-base md:flex-1 text-slate-700 leading-relaxed md:leading-8 break-words">
                            Setiap anak berhak memperoleh pendidikan, baik
                            formal maupun non-formal (Kejar Paket A, B, atau C),
                            demi masa depan yang lebih baik dan upaya
                            pengurangan kemiskinan.
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutSection
