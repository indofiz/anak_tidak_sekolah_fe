export const LogoFooter = () => {
    return (
        <div className="flex items-center justify-center lg:items-start gap-2 flex-col px-4 lg:flex lg:max-w-lg">
            <div className="lg:flex lg:flex-row gap-2 lg:items-left text-center lg:text-left">
                <div className="text-center lg:text-left flex justify-center items-center lg:justify-start">
                    <img
                        src={'/logo/logo-dikbud.png'}
                        className="w-28"
                        alt=""
                    />
                </div>
                <div className="flex justify-center flex-col text-center">
                    <div className="text-2xl font-bold lg:max-w-[1ch]">
                        ANAK TIDAK SEKOLAH
                    </div>
                    <div className="text-base font-bold text-blue-primary">
                        PENDATAAN ANAK TIDAK SEKOLAH
                    </div>
                </div>
            </div>
            <div className="text-center mt-1 text-sm font-light lg:text-left">
                Anak Tidak Sekolah (ATS) adalah anak usia 5 sampai 18 tahun yang
                belum pernah sekolah, atau sempat sekolah tapi nggak selesai
                (putus sekolah). Mereka bisa aja belum sempat masuk PAUD, SD,
                SMP, atau bahkan SMA/SMK.
            </div>
        </div>
    )
}
