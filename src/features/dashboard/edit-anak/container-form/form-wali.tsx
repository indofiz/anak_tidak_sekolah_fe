import {
    WaliDetailParams,
    WaliError,
    WaliResponse,
    fetchWaliData,
} from '@/api/data-wali'
import { useAuthStore } from '@/store/login-store'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'
import FormDataWali from '../../form/form-data-wali'

export const useWaliData = (params: WaliDetailParams) => {
    return useQuery<WaliResponse, WaliError>({
        queryKey: ['wali-data', params.nik],
        queryFn: () => {
            if (!params.token) throw new Error('Token tidak tersedia')
            return fetchWaliData(params)
        },
        enabled: !!params.nik,
        retry: false,
    })
}

const ContainerDataWali = () => {
    const { id } = useParams()
    const { user } = useAuthStore()

    const { data, isLoading } = useWaliData({
        nik: id || '',
        token: user?.token || '',
    })

    if (isLoading) {
        return <div className="text-center">Loading...</div>
    }

    return (
        <div>
            <FormDataWali nik={id || ''} initialData={data?.data} />
        </div>
    )
}

export default ContainerDataWali
