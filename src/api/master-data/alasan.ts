import { useQuery } from '@tanstack/react-query'
import { listAlasan } from '../url'

export interface Alasan {
    id: string
    alasan: string
}

export interface AlasanResponse {
    status: number
    message: string
    data: Alasan[]
}

export interface AlasanError {
    status: number
    message: string
}

export interface ParamsAlasan {
    token?: string
}
export const fetchAlasanList = async (
    data: ParamsAlasan
): Promise<AlasanResponse> => {
    const response = await fetch(listAlasan, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Token: data?.token || '',
        },
    })

    if (!response.ok) {
        throw new Error('Gagal mengambil data Alasan')
    }

    return response.json()
}

export const useAlasan = (params: ParamsAlasan) => {
    return useQuery<AlasanResponse, AlasanError>({
        queryKey: ['alasan'],
        queryFn: () => {
            if (!params.token) throw new Error('Token tidak tersedia')
            return fetchAlasanList(params)
        },
        retry: false,
    })
}
