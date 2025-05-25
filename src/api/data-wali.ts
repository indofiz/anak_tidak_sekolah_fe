import { useAuthStore } from '@/store/login-store'
import { detailWali, updateWali } from './url'
import { useMutation } from '@tanstack/react-query'

export interface WaliData {
    nik_anak?: string | null
    nama_wali?: string | null
    no_hp_wali?: string | null
    pekerjaan?: string | null
    created_at?: string | null
    created_by?: string | null
    updated_at?: string | null
    updated_by?: string | null
}

export interface WaliResponse {
    status: number
    message: string
    data: WaliData
}

export interface WaliError {
    status: number
    message: string
}

export interface WaliDetailParams {
    nik: string
    token?: string
}

export const fetchWaliData = async (
    params: WaliDetailParams
): Promise<WaliResponse> => {
    const response = await fetch(
        `${detailWali}?nik=${encodeURIComponent(params.nik)}`,
        {
            method: 'GET',
            headers: {
                Token: params?.token || '',
                'Content-Type': 'application/json',
            },
        }
    )

    const data = await response.json()

    if (response.status === 404) {
        throw {
            status: 404,
            message: data.message,
        } as WaliError
    }

    if (!response.ok) {
        throw new Error(data.message || 'Terjadi kesalahan')
    }

    return data as WaliResponse
}

export const useSaveWaliData = () => {
    const { user } = useAuthStore()

    return useMutation({
        mutationFn: async (formData: FormData) => {
            const response = await fetch(updateWali, {
                method: 'POST',
                headers: {
                    Token: user?.token || '',
                },
                body: formData,
            })

            if (!response.ok) {
                const error = await response.json()
                throw new Error(error.message || 'Gagal menyimpan data')
            }

            return response.json()
        },
    })
}
