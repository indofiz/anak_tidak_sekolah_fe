import { useQuery } from '@tanstack/react-query'
import { listSubKategori } from '../url'

export interface SubKategori {
    id: number
    sub_kategori: string
    kategori: string
}

export interface SubKategoriResponse {
    status: number
    message: string
    data: SubKategori[]
}

export interface SubKategoriError {
    status: number
    message: string
}

export interface ParamsSubKategori {
    kategori: string
    token?: string
}
export const fetchSubKategoriList = async (
    data: ParamsSubKategori
): Promise<SubKategoriResponse> => {
    const response = await fetch(
        `${listSubKategori}?id_kategori=${data.kategori}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Token: data?.token || '',
            },
        }
    )

    if (!response.ok) {
        throw new Error('Gagal mengambil data kategori')
    }

    return response.json()
}

export const useSubKategori = (params: ParamsSubKategori) => {
    return useQuery<SubKategoriResponse, SubKategoriError>({
        queryKey: ['sub-kategori', params.kategori],
        queryFn: () => {
            if (!params.token) throw new Error('Token tidak tersedia')
            return fetchSubKategoriList(params)
        },
        enabled: !!params.kategori,
        retry: false,
    })
}
