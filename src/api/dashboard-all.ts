import { useAuthStore } from '@/store/login-store'
import { dashboardAll } from './url'

// Root response
export interface AnakTidakSekolahResponse {
    status: number
    message: string
    data: AnakTidakSekolahData
}

// Data section
export interface AnakTidakSekolahData {
    total_kelurahan: TotalKelurahan
    total_usia: UsiaStat[]
    total_tingkat: TingkatStat[]
}

// total_kelurahan object
export interface TotalKelurahan {
    id: number
    kelurahan: string
    total: number
}

// total_usia array
export interface UsiaStat {
    label: string
    total: string // originally a string in your JSON
}

// total_tingkat array
export interface TingkatStat {
    label: string
    total: string // originally a string in your JSON
}

export interface ErrorResponse {
    status: 404
    message: string
}
export interface DashboardParams {
    token?: string
}

export const fetchDataDashboard = async (
    params: DashboardParams
): Promise<AnakTidakSekolahResponse> => {
    const response = await fetch(`${dashboardAll}`, {
        method: 'GET',
        headers: {
            Token: params?.token || '',
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

    if (response.status === 401) {
        // Handle unauthorized access, e.g., redirect to login or show an error
        useAuthStore.getState().clearUser()
        throw new Error('Unauthorized access. Please log in again.')
    }

    if (!response.ok) {
        throw new Error(data.message || 'Terjadi kesalahan')
    }

    return data as AnakTidakSekolahResponse
}
