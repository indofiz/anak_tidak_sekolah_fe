import { useAuthStore } from '@/store/login-store'
import { detailAnak, updateAnak } from './url'
import { useMutation } from '@tanstack/react-query'

// src/api/anak.ts
export interface AnakData {
    nik: string
    nama_anak?: string | null
    nisn?: string | null
    jenis_kelamin?: string | null
    tempat_lahir?: string | null
    tgl_lahir?: string | null
    alamat_kk?: string | null
    alamat_domisili?: string | null
    id_sub_kategori?: string | null
    id_kategori?: string | null
    status?: string | null
    created_at?: string | null
    created_by?: string | null
    updated_at?: string | null
    updated_by?: string | null
}

export interface SuccessResponse {
    status: 200
    message: string
    data: AnakData
}

export interface ErrorResponse {
    status: 404
    message: string
}
export interface AnakDetailParams {
    nik: string
    token?: string
}

export const fetchAnakData = async (
    params: AnakDetailParams
): Promise<SuccessResponse> => {
    const response = await fetch(
        `${detailAnak}?nik=${encodeURIComponent(params.nik)}`,
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
        } as ErrorResponse
    }

    if (!response.ok) {
        throw new Error(data.message || 'Terjadi kesalahan')
    }

    return data as SuccessResponse
}

export const useSaveAnakData = () => {
    const { user } = useAuthStore()

    return useMutation({
        mutationFn: async (formData: FormData) => {
            const response = await fetch(updateAnak, {
                method: 'POST',
                headers: {
                    Token: user?.token || '',
                },
                body: formData,
            })

            if (response.status === 401) {
                useAuthStore.getState().clearUser()
                throw new Error('Unauthorized access, please login again')
            }

            if (!response.ok) {
                const error = await response.json()
                throw new Error(error.message || 'Gagal menyimpan data')
            }

            return response.json()
        },
    })
}
