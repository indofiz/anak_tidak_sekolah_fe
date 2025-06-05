import { useQuery } from '@tanstack/react-query'
import { listPekerjaan } from '../url'

export interface Pekerjaan {
    id: number
    pekerjaan: string
}

export interface PekerjaanResponse {
    status: number
    message: string
    data: Pekerjaan[]
}

export interface PekerjaanError {
    status: number
    message: string
}

export interface ParamsPekerjaan {
    token?: string
}
export const fetchPekerjaanList = async (
    data: ParamsPekerjaan
): Promise<PekerjaanResponse> => {
    const response = await fetch(listPekerjaan, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Token: data?.token || '',
        },
    })

    if (!response.ok) {
        throw new Error('Gagal mengambil data pekerjaan')
    }

    return response.json()
}

export const usePekerjaan = (params: ParamsPekerjaan) => {
    return useQuery<PekerjaanResponse, PekerjaanError>({
        queryKey: ['pekerjaan'],
        queryFn: () => {
            if (!params.token) throw new Error('Token tidak tersedia')
            return fetchPekerjaanList(params)
        },
        retry: false,
    })
}
