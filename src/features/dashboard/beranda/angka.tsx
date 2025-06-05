import {
    AnakTidakSekolahResponse,
    fetchDataDashboard,
} from '@/api/dashboard-all'
import Loading from '@/components/other/loading'
import { useAuthStore } from '@/store/login-store'
import { useQuery } from '@tanstack/react-query'

const Angka = () => {
    const { user } = useAuthStore()

    const { data, isFetching, isLoading } = useQuery<
        AnakTidakSekolahResponse,
        Error
    >({
        queryKey: ['data-anak-kelurahan'],
        queryFn: () => {
            if (!user?.token) {
                throw new Error('Token tidak tersedia')
            }
            return fetchDataDashboard({
                token: user?.token || '',
            })
        },
        retry: false,
    })

    if (isLoading || isFetching) {
        return (
            <div className="col-span-12 md:col-span-4 border text-center rounded-lg py-8">
                <Loading text="Memuat Data ..." size="sm" color="gray" />
            </div>
        )
    }

    return (
        <div className="col-span-12 md:col-span-4 border text-center rounded-lg px-8 py-4">
            <div className="text-5xl font-semibold mb-4 ">
                {data?.data?.total_kelurahan?.total || 0}
            </div>
            <div className="text-center">
                <img src={'/icon-child.png'} className="mx-auto" alt="" />
            </div>
            <div className="font-semibold text-blue-primary mt-4">
                Total Anak Tidak Sekolah
            </div>
            <div>Kelurahan {data?.data?.total_kelurahan?.kelurahan}</div>
        </div>
    )
}

export default Angka
