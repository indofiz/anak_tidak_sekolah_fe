import { useAuthStore } from '@/store/login-store'
import { detailTindakLanjut, updateTindakLanjut } from './url'
import { useMutation } from '@tanstack/react-query'

export interface TindakLanjutData {
    nik_anak?: string | null
    bersedia?: string | null
    program?: string | null
    catatan?: string | null
    created_at?: string | null
    created_by?: string | null
    updated_at?: string | null
    updated_by?: string | null
}

export interface TindakLanjutResponse {
    status: number
    message: string
    data: TindakLanjutData
}

export interface TindakLanjutError {
    status: number
    message: string
}

export interface TindakLanjutDetailParams {
    nik: string
    token?: string
}

export const fetchTindakLanjutData = async (
    params: TindakLanjutDetailParams
): Promise<TindakLanjutResponse> => {
    const response = await fetch(
        `${detailTindakLanjut}?nik=${encodeURIComponent(params.nik)}`,
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
        } as TindakLanjutError
    }

    if (!response.ok) {
        throw new Error(data.message || 'Terjadi kesalahan')
    }

    return data as TindakLanjutResponse
}

export const useSaveTindakLanjutData = () => {
    const { user } = useAuthStore()

    return useMutation({
        mutationFn: async (formData: FormData) => {
            const response = await fetch(updateTindakLanjut, {
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
