import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from './ui/card'
import OTPInput from './other/otp-input'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { verifyOTP, VerifyOTPRequest, VerifyOTPResponse } from '@/api/login'
import { useMutation } from '@tanstack/react-query'
import { useAuthStore } from '@/store/login-store'
import { toast } from 'sonner'

export function OTPForm({ className, ...props }: React.ComponentProps<'div'>) {
    const [otp, setOtp] = useState<string[]>(Array(6).fill(''))

    const navigate = useNavigate()
    const location = useLocation()
    const { setUser } = useAuthStore()

    // Get mobile from location state instead of params
    const mobile = location.state?.mobile

    const mutation = useMutation<VerifyOTPResponse, Error, VerifyOTPRequest>({
        mutationFn: verifyOTP,
        onSuccess: (data) => {
            if (data.data) {
                setUser(data.data)
                setTimeout(() => {
                    navigate('/dashboard')
                }, 100)
            }
        },
        onError: (error) => {
            toast.error(`Gagal verifikasi OTP: ${error.message}`)
            console.error('Error verifying OTP:', error)
        },
    })

    const onSubmit = () => {
        if (!mobile) {
            toast.error('Nomor telepon tidak ditemukan')
            return
        }
        if (otp.length == 6 && otp.every((digit) => digit !== '') && mobile) {
            const otpString = otp.join('')
            mutation.mutate({ mobile, otp: otpString })
        }
    }

    return (
        <div className={cn('flex flex-col gap-6', className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Masukan OTP</CardTitle>
                    <CardDescription>
                        Kode OTP telah dikirim ke no whatsapp anda.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-6">
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <OTPInput otp={otp} setOtp={setOtp} />
                            </div>
                            <Button
                                type="submit"
                                className="w-full"
                                onClick={onSubmit}
                                disabled={mutation.isPending}
                            >
                                {mutation.isPending
                                    ? 'Memproses...'
                                    : 'Login Sekarang'}
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <div className="text-white/60 *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                By clicking continue, you agree to our{' '}
                <a href="#">Terms of Service</a> and{' '}
                <a href="#">Privacy Policy</a>.
            </div>
        </div>
    )
}
