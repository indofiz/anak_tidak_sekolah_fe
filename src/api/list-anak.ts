import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteAnak, listAnak } from './url'
import { useAuthStore } from '@/store/login-store'

export interface Anak {
    nik: string
    nama_anak: string | null
    nisn: string | null
    jenis_kelamin: string | null
    tempat_lahir: string | null
    tgl_lahir: string | null
    usia: number | null
    alamat_kk: string | null
    kelurahan: string | null
    kecamatan: string | null
    alamat_domisili: string | null
    id_sub_kategori: number | null
    status: string
    nama_wali: string | null
    pekerjaan: string | null
    nama_sekolah: string | null
    npsn_sekolah: string | null
    tingkat: string | null
    kelas: string | null
    tahun_terakhir: number | null
    bersedia: string | null
    program: string | null
    catatan: string | null
}

interface Pagination {
    current_page: number
    per_page: string
    total: number
    last_page: number
}

export interface AnakListResponse {
    status: string
    message: string
    data: {
        data: { data: Anak[] }
        pagination: Pagination
    }
}

export interface AnakListError {
    status: number
    message: string
}

interface FilterState {
    page: number
    per_page: number
    parameter: string
    is_old: 0 | 1
    is_all: 0 | 1
}

interface AnakListParams {
    filter: FilterState
    token: string
}

export const fetchAnakList = async (
    data: AnakListParams
): Promise<AnakListResponse> => {
    // create response object with the URL and parameters using fetch

    if (!data?.token) {
        throw new Error('Token tidak tersedia')
    }
    const response = await fetch(
        `${listAnak}?page=${data.filter.page}&per_page=${data.filter.per_page}&parameter=${data.filter.parameter}&is_old=${data.filter.is_old}&is_all=${data.filter.is_all}`,
        {
            method: 'GET',
            headers: {
                Token: data.token,
            },
        }
    )
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

export const useAnakList = (data: AnakListParams) => {
    return useQuery<AnakListResponse, AnakListError>({
        queryKey: ['list-anak', { ...data.filter }],
        queryFn: () => {
            if (!data.token) throw new Error('Token tidak tersedia')
            return fetchAnakList(data)
        },
        retry: false,
    })
}

// types/anak.ts
export interface DeleteAnakResponse {
    status: string
    message: string
}

export interface DeleteAnakError {
    status: string
    message: string
}

// api/anak.ts
export const deleteAnakFn = async (
    nik: string,
    token: string
): Promise<void> => {
    const response = await fetch(`${deleteAnak}?nik=${nik}`, {
        method: 'DELETE',
        headers: {
            Token: token,
        },
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Gagal menghapus data anak')
    }
}

export const useDeleteAnak = () => {
    const queryClient = useQueryClient()
    const { user } = useAuthStore()

    return useMutation<void, DeleteAnakError, string>({
        mutationFn: (nik: string) => deleteAnakFn(nik, user?.token || ''),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['list-anak'] })
        },
    })
}
