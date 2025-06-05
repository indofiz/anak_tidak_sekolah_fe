import { useAuthStore } from '@/store/login-store'
import { useParams } from 'react-router'
import FormDataWali from '../../form/form-data-wali'
import { useWaliData } from './query'
import Loading from '@/components/other/loading'

const ContainerDataWali = () => {
    const { id } = useParams()
    const { user } = useAuthStore()

    const { data, isLoading } = useWaliData({
        nik: id || '',
        token: user?.token || '',
    })

    if (isLoading) {
        return (
            <div className="max-w-md text-center p-8">
                <Loading text="Memuat Data ..." size="sm" color="gray" />
            </div>
        )
    }

    return (
        <div>
            <FormDataWali nik={id || ''} initialData={data?.data} />
        </div>
    )
}

export default ContainerDataWali
