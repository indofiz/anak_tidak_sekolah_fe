import { useAuthStore } from '@/store/login-store'
import { useParams } from 'react-router'
import FormDataAnak from '../../form/form-data-anak'
import { useAnakData } from './query'
import Loading from '@/components/other/loading'

const ContainerDataAnak = () => {
    const { id } = useParams()
    const { user } = useAuthStore()

    const { data, isLoading, isFetching } = useAnakData({
        nik: id || '',
        token: user?.token || '',
    })

    if (isLoading || isFetching) {
        return (
            <div className="max-w-md text-center p-8">
                <Loading text="Memuat Data ..." size="sm" color="gray" />
            </div>
        )
    }

    return (
        <div>
            <FormDataAnak
                initialData={{
                    ...data?.data,
                    nik: id || '',
                    id_kategori: data?.data.id_kategori?.toString(),
                    id_sub_kategori: data?.data.id_sub_kategori?.toString(),
                }}
            />
        </div>
    )
}

export default ContainerDataAnak
