import { logout, requestOTP, validateOTP } from './url'

export interface ErrorResponse {
    message: string
}

export interface SendOTPResponse {
    status: number
    message: string
}

export const sendOTPRequest = async (
    mobile: string
): Promise<SendOTPResponse> => {
    const formData = new FormData()
    formData.append('mobile', mobile)

    const response = await fetch(requestOTP, {
        method: 'POST',
        body: formData,
    })

    if (!response.ok) {
        const error: ErrorResponse = await response.json()
        throw new Error(error.message || 'Failed to send OTP')
    }

    return response.json()
}

export interface VerifyOTPResponse {
    status: number
    message: string
    data?: {
        nama_lengkap: string
        kelurahan: string
        mobile: string
        email: string
        token: string
    }
}

export interface VerifyOTPRequest {
    mobile: string
    otp: string
}

export const verifyOTP = async (
    data: VerifyOTPRequest
): Promise<VerifyOTPResponse> => {
    const formData = new FormData()
    formData.append('mobile', data.mobile)
    formData.append('otp', data.otp)

    const response = await fetch(validateOTP, {
        method: 'POST',
        body: formData,
    })

    const responseData = await response.json()

    if (!response.ok) {
        throw new Error(responseData.message || 'OTP verification failed')
    }

    return responseData
}

export const logoutAUTH = async (token?: string): Promise<void> => {
    if (token) {
        const formData = new FormData()
        formData.append('token', token)

        const response = await fetch(logout, {
            method: 'POST',
            body: formData,
        })

        if (!response.ok) {
            const error: ErrorResponse = await response.json()
            throw new Error(error.message || 'Logout failed')
        }
    }
}
