import {
    TindakLanjutDetailParams,
    TindakLanjutError,
    TindakLanjutResponse,
    fetchTindakLanjutData,
} from '@/api/data-tindak-lanjut'
import { useAuthStore } from '@/store/login-store'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'
import FormDataTindakLanjut from '../../form/form-data-tindak-lanjut'

const useTindakLanjutData = (params: TindakLanjutDetailParams) => {
    return useQuery<TindakLanjutResponse, TindakLanjutError>({
        queryKey: ['tindak-lanjut-data', params.nik],
        queryFn: () => {
            if (!params.token) throw new Error('Token tidak tersedia')
            return fetchTindakLanjutData(params)
        },
        enabled: !!params.nik,
        retry: false,
    })
}

const ContainerDataTidakLanjut = () => {
    const { id } = useParams()
    const { user } = useAuthStore()

    const { data, isLoading } = useTindakLanjutData({
        nik: id || '',
        token: user?.token || '',
    })

    if (isLoading) {
        return <div className="text-center">Loading...</div>
    }

    return (
        <div>
            <FormDataTindakLanjut nik={id || ''} initialData={data?.data} />
        </div>
    )
}

export default ContainerDataTidakLanjut
