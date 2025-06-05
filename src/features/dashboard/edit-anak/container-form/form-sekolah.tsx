import { useAuthStore } from '@/store/login-store'
import { useParams } from 'react-router'
import FormDataSekolah from '../../form/form-data-sekolah'
import { useAnakData, useSekolahData } from './query'
import Loading from '@/components/other/loading'

const ContainerDataSekolah = () => {
    const { id } = useParams()
    const { user } = useAuthStore()

    const { data: anak, isLoading: anakLoading } = useAnakData({
        nik: id || '',
        token: user?.token || '',
    })

    const { data, isLoading } = useSekolahData({
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

    return (
        <div>
            <FormDataSekolah
                nik={id || ''}
                initialData={data?.data}
                kategori={Number(anak?.data.id_kategori) || 0}
                isBelumSekolah={Number(anak?.data?.id_sub_kategori) === 1}
            />
        </div>
    )
}

export default ContainerDataSekolah
