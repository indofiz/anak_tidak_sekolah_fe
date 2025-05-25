import {
    AnakDetailParams,
    ErrorResponse,
    fetchAnakData,
    SuccessResponse,
} from '@/api/data-anak'
import { useAuthStore } from '@/store/login-store'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'
import FormDataAnak from '../../form/form-data-anak'

export const useAnakData = (params: AnakDetailParams) => {
    return useQuery<SuccessResponse, ErrorResponse>({
        queryKey: ['anak-data', params.nik],
        queryFn: () => {
            if (!params.token) throw new Error('Token tidak tersedia')
            return fetchAnakData(params)
        },
        enabled: !!params.nik,
        retry: false,
    })
}

const ContainerDataAnak = () => {
    const { id } = useParams()
    const { user } = useAuthStore()

    const { data, isLoading } = useAnakData({
        nik: id || '',
        token: user?.token || '',
    })

    if (isLoading) {
        return <div className="text-center">Loading...</div>
    }

    return (
        <div>
            <FormDataAnak initialData={data?.data} />
        </div>
    )
}

export default ContainerDataAnak
