const AboutSection = () => {
    return (
        <section className="container mx-auto py-12 mt-24">
            <div className="grid grid-cols-12 gap-8">
                {/* <div className="col-span-6 flex flex-col gap-4 bg-gray-400 rounded-lg"></div> */}
                <div className="col-span-12 flex flex-col gap-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-semibold">Tentang ATS</h2>
                        <p className="text-lg mt-4 text-slate-500">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Quae, quia.
                        </p>
                    </div>
                    <div className="grid grid-cols-12 gap-12">
                        <div className="col-span-6 flex gap-8">
                            <div>
                                <div className="relative z-10 size-24 grid place-items-center">
                                    <div className="absolute inset-0 -z-10 bg-yellow-primary rounded-xl rotate-12"></div>
                                    <div className="z-10 bg-blue-primary rounded-xl size-24 grid place-items-center">
                                        <img
                                            src="/icon/magazine.png"
                                            className="size-16"
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className=" text-slate-700 leading-8">
                                Anak Tidak Sekolah (ATS) jadi salah satu masalah
                                penting yang perlu banget ditangani
                                bareng-bareng di Kota Pangkal Pinang. Tujuannya?
                                Biar makin banyak anak yang bisa sekolah dan
                                secara nggak langsung bantu ngurangin kemiskinan
                                juga. Nah, peran masyarakat di sini penting
                                banget—kita bisa bantu dengan kasih info kalau
                                ada anak di sekitar yang belum sekolah. Semua
                                anak punya hak yang sama buat dapet pendidikan,
                                baik lewat sekolah formal ataupun jalur
                                non-formal kayak Kejar Paket A, B, atau C.
                            </div>
                        </div>
                        <div className="col-span-6 flex gap-8">
                            <div>
                                <div className="relative z-10 size-24 grid place-items-center">
                                    <div className="absolute inset-0 -z-10 bg-yellow-primary rounded-xl rotate-12"></div>
                                    <div className="z-10 bg-blue-primary rounded-xl size-24 grid place-items-center">
                                        <img
                                            src="/icon/backpack.png"
                                            className="size-16"
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className=" text-slate-700 leading-8">
                                Anak Tidak Sekolah (ATS) adalah anak usia 5
                                sampai 18 tahun yang belum pernah sekolah, atau
                                sempat sekolah tapi nggak selesai (putus
                                sekolah). Mereka bisa aja belum sempat masuk
                                PAUD, SD, SMP, atau bahkan SMA/SMK.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutSection
