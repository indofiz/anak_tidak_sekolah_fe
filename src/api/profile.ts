import { useAuthStore } from '@/store/login-store'
import { detailUser, updateUser } from './url'
import { useMutation, useQuery } from '@tanstack/react-query'

export interface ProfileType {
    nama_lengkap?: string | null
    jenis_kelamin?: 'Laki-Laki' | 'Perempuan' | null
    alamat?: string | null
    kelurahan?: number | null
    mobile?: string | null
    email?: string | null
}

export interface ProfileResponse {
    status: string
    message: string
    data: ProfileType
}

export interface ProfileError {
    status: number
    message: string
}

export interface ProfileDetailParams {
    token?: string
}

export const fetchProfile = async (
    data: ProfileDetailParams
): Promise<ProfileResponse> => {
    // create response object with the URL and parameters using fetch

    if (!data?.token) {
        throw new Error('Token tidak tersedia')
    }
    const response = await fetch(`${detailUser}`, {
        method: 'GET',
        headers: {
            Token: data.token,
        },
    })
    //add redirect to login page if response is 401 Unauthorized
    if (response.status === 401) {
        useAuthStore.getState().clearUser()
        throw new Error('Unauthorized access, please login again')
    }
    if (!response.ok) {
        throw new Error('Gagal mengambil data AnakList')
    }

    return response.json()
}

export const useProfileDetail = (data: ProfileDetailParams) => {
    return useQuery<ProfileResponse, ProfileError>({
        queryKey: ['profile-detail'],
        queryFn: () => {
            if (!data.token) throw new Error('Token tidak tersedia')
            return fetchProfile(data)
        },
        retry: false,
    })
}

export const useSaveProfil = () => {
    const { user } = useAuthStore()

    return useMutation({
        mutationFn: async (formData: FormData) => {
            const response = await fetch(updateUser, {
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
