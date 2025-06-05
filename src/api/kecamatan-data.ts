import { totalKecamatan } from './url'

// Root response
export interface AnakTidakSekolahKecamatanResponse {
    status: number
    message: string
    data: KecamatanStat[]
}

// Each kecamatan data item
export interface KecamatanStat {
    id: number
    kecamatan: string
    total: number
}

export interface ErrorResponse {
    status: 404
    message: string
}

export const fetchDataKecamatan =
    async (): Promise<AnakTidakSekolahKecamatanResponse> => {
        const response = await fetch(`${totalKecamatan}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

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

        return data as AnakTidakSekolahKecamatanResponse
    }
