import { useAuthStore } from '@/store/login-store'
import { useParams } from 'react-router'
import FormDataTindakLanjut from '../../form/form-data-tindak-lanjut'
import { useAnakData, useTindakLanjutData } from './query'
import Loading from '@/components/other/loading'

const ContainerDataTidakLanjut = () => {
    const { id } = useParams()
    const { user } = useAuthStore()

    const { data: anak, isLoading: anakLoading } = useAnakData({
        nik: id || '',
        token: user?.token || '',
    })

    const { data, isLoading } = useTindakLanjutData({
        nik: id || '',
        token: user?.token || '',
    })

    if (isLoading || anakLoading) {
        return (
            <div className="max-w-md text-center p-8">
                <Loading text="Memuat Data ..." size="sm" color="gray" />
            </div>
        )
    }

    if (Number(anak?.data.id_kategori) === 2) {
        return (
            <div className="text-center">
                Anak Masih Sekolah, Tidak Perlu Tindak Lanjut
            </div>
        )
    }

    return (
        <div>
            <FormDataTindakLanjut nik={id || ''} initialData={data?.data} />
        </div>
    )
}

export default ContainerDataTidakLanjut
