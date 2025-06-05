import { useQuery } from '@tanstack/react-query'

import {
    AnakDetailParams,
    ErrorResponse,
    fetchAnakData,
    SuccessResponse,
} from '@/api/data-anak'
import {
    fetchSekolahData,
    SekolahDetailParams,
    SekolahError,
    SekolahResponse,
} from '@/api/data-sekolah'
import {
    fetchWaliData,
    WaliDetailParams,
    WaliError,
    WaliResponse,
} from '@/api/data-wali'
import {
    fetchTindakLanjutData,
    TindakLanjutDetailParams,
    TindakLanjutError,
    TindakLanjutResponse,
} from '@/api/data-tindak-lanjut'

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

export const useSekolahData = (params: SekolahDetailParams) => {
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

export const useTindakLanjutData = (params: TindakLanjutDetailParams) => {
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
