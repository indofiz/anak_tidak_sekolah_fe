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

export interface ParamsAnakList {
    token?: string
}
export const fetchAnakList = async (
    data: ParamsAnakList
): Promise<AnakListResponse> => {
    const response = await fetch(listAnak + '?per_page=1000', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Token: data?.token || '',
        },
    })

    if (!response.ok) {
        throw new Error('Gagal mengambil data AnakList')
    }

    return response.json()
}

export const useAnakList = (params: ParamsAnakList) => {
    return useQuery<AnakListResponse, AnakListError>({
        queryKey: ['list-anak'],
        queryFn: () => {
            if (!params.token) throw new Error('Token tidak tersedia')
            return fetchAnakList(params)
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
