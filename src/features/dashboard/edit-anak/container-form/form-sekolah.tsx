import {
    SekolahDetailParams,
    SekolahError,
    SekolahResponse,
    fetchSekolahData,
} from '@/api/data-sekolah'
import { useAuthStore } from '@/store/login-store'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'
import FormDataSekolah from '../../form/form-data-sekolah'

const useSekolahData = (params: SekolahDetailParams) => {
    return useQuery<SekolahResponse, SekolahError>({
        queryKey: ['sekolah-data', params.nik],
        queryFn: () => {
            if (!params.token) throw new Error('Token tidak tersedia')
            return fetchSekolahData(params)
        },
        enabled: !!params.nik,
        retry: false,
    })
}

const ContainerDataSekolah = () => {
    const { id } = useParams()
    const { user } = useAuthStore()

    const { data, isLoading } = useSekolahData({
        nik: id || '',
        token: user?.token || '',
    })

    if (isLoading) {
        return <div className="text-center">Loading...</div>
    }

    return (
        <div>
            <FormDataSekolah nik={id || ''} initialData={data?.data} />
        </div>
    )
}

export default ContainerDataSekolah
