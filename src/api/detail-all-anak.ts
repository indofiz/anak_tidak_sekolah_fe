import { detailLengkapAnak } from './url'

interface Anak {
    nik: string
    nama_anak: string | null
    nisn: string | null
    jenis_kelamin: string | null
    tempat_lahir: string | null
    tgl_lahir: string | null
    alamat_kk: string | null
    kelurahan: string | null
    alamat_domisili: string | null
    id_sub_kategori: number | null
    status: string | null
    created_at: string | null
    created_by: string | null
    updated_at: string | null
    updated_by: string | null
    id_kategori: number | null
}

interface Sekolah {
    nik_anak: string
    nama_sekolah: string
    npsn_sekolah: string
    tingkat: string
    kelas: string
    tahun_terakhir: number
    alasan_tidak_sekolah: string[]
    lainnya: string
    created_at: string
    created_by: string
    updated_at: string
    updated_by: string | null
}

interface Wali {
    nik_anak: string
    nama_wali: string
    no_hp: string
    pekerjaan: string
    created_at: string
    created_by: string
    updated_at: string
    updated_by: string | null
}

interface TindakLanjut {
    nik_anak: string
    bersedia: string
    program: string
    catatan: string
    created_at: string
    created_by: string
    updated_at: string
    updated_by: string
}

export interface SuccessResponse {
    status: 200
    message: string
    data: {
        anak: Anak | null
        sekolah: Sekolah | null
        wali: Wali | null
        tindak_lanjut: TindakLanjut | null
    }
}

export interface ErrorResponse {
    status: 404
    message: string
}
export interface AnakDetailParams {
    nik: string
    token?: string
}

export const fetchDetailAllAnak = async (
    params: AnakDetailParams
): Promise<SuccessResponse> => {
    const response = await fetch(
        `${detailLengkapAnak}?nik=${encodeURIComponent(params.nik)}`,
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
