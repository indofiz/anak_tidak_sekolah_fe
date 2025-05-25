import { useQuery } from '@tanstack/react-query'
import { listKategori } from '../url'

export interface Kategori {
    id: number
    kategori: string
}

export interface KategoriResponse {
    status: number
    message: string
    data: Kategori[]
}

export interface KategoriError {
    status: number
    message: string
}

export interface ParamsKategori {
    token?: string
}
export const fetchKategoriList = async (
    data: ParamsKategori
): Promise<KategoriResponse> => {
    const response = await fetch(listKategori, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Token: data?.token || '',
        },
    })

    if (!response.ok) {
        throw new Error('Gagal mengambil data kategori')
    }

    return response.json()
}

export const useKategori = (params: ParamsKategori) => {
    return useQuery<KategoriResponse, KategoriError>({
        queryKey: ['kategori'],
        queryFn: () => {
            if (!params.token) throw new Error('Token tidak tersedia')
            return fetchKategoriList(params)
        },
        retry: false,
    })
}
