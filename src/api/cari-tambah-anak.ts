import { useAuthStore } from '@/store/login-store'
import { saveAnak } from './url'

export interface AnakData {
    nik: string
    nama_anak: string | null
    nisn: string | null
    jenis_kelamin: string | null
    tempat_lahir: string | null
    tgl_lahir: string | null
    alamat_kk: string | null
    kelurahan: string | null
    alamat_domisili: string | null
    id_sub_kategori: string | null
    status: string
    created_at: string | null
    created_by: string | null
    updated_at: string | null
    updated_by: string | null
}

export interface SearchResponse {
    status: number
    message: string
    data?: AnakData
}

export interface SearchError {
    status: number
    message: string
}
export interface CreateNikSuccess {
    status: 'success'
    message: string
}

export interface CreateNikError {
    status: 'failed'
    message: string
    data: {
        nik?: string[]
    }
}

export interface CreateNikParams {
    nik: string
    token?: string
}
export const createNik = async (
    param: CreateNikParams
): Promise<CreateNikSuccess> => {
    const formData = new FormData()
    formData.append('nik', param.nik)

    const response = await fetch(saveAnak, {
        method: 'POST',
        headers: {
            Token: param?.token || '',
        },
        body: formData,
    })

    const data = await response.json()

    if (!response.ok) {
        throw {
            status: 'failed',
            message: data.message,
            data: data.data,
        } as CreateNikError
    }

    return data as CreateNikSuccess
}
