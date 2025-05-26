import { Button } from '@/components/ui/button'
import { Link } from 'react-router'

const NotFoundPage = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex max-w-xs flex-col items-center text-center">
                <img
                    src="/illustration/interface-design.png"
                    alt="Not Found"
                    className="w-40 h-40 mx-auto mb-4"
                />
                <h1 className="text-xl font-semibold">
                    Halaman Tidak Tersedia
                </h1>
                <p className="font-light text-gray-500 mt-2 text-xs">
                    Maaf, halaman yang Anda cari tidak ditemukan. Silahkan
                    periksa URL atau kembali ke halaman utama.
                </p>
                <Button className="mt-4" variant={'outline'}>
                    <Link to="/">Kembali ke Beranda</Link>
                </Button>
            </div>
        </div>
    )
}

export default NotFoundPage
