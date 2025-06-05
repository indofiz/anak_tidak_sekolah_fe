import { useAuthStore } from '@/store/login-store'
import { detailSekolah, updateSekolah } from './url'
import { useMutation } from '@tanstack/react-query'

export interface SekolahData {
    nik_anak?: string | null
    nama_sekolah?: string | null
    npsn_sekolah?: string | null
    tingkat?: string | null
    kelas?: string | null
    tahun_terakhir?: string | null
    alasan_tidak_sekolah?: string[] | null
    lainnya?: string
    created_at?: string | null
    created_by?: string | null
    updated_at?: string | null
    updated_by?: string | null
}

export interface SekolahResponse {
    status: number
    message: string
    data: SekolahData
}

export interface SekolahError {
    status: number
    message: string
}

export interface SekolahDetailParams {
    nik: string
    token?: string
}

export const fetchSekolahData = async (
    params: SekolahDetailParams
): Promise<SekolahResponse> => {
    const response = await fetch(
        `${detailSekolah}?nik=${encodeURIComponent(params.nik)}`,
        {
            method: 'GET',
            headers: {
                Token: params?.token || '',
                'Content-Type': 'application/json',
            },
        }
    )

    const data = await response.json()

    if (response.status === 401) {
        useAuthStore.getState().clearUser()
        throw new Error('Unauthorized access, please login again')
    }

    if (response.status === 404) {
        throw {
            status: 404,
            message: data.message,
        } as SekolahError
    }

    if (!response.ok) {
        throw new Error(data.message || 'Terjadi kesalahan')
    }

    return data as SekolahResponse
}

export const useSaveSekolahData = () => {
    const { user } = useAuthStore()

    return useMutation({
        mutationFn: async (formData: FormData) => {
            const response = await fetch(updateSekolah, {
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
