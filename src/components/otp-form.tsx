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
import { useNavigate } from 'react-router'

export function OTPForm({ className, ...props }: React.ComponentProps<'div'>) {
    const [otp, setOtp] = useState<string[]>(Array(6).fill(''))

    const navigate = useNavigate()

    const onSubmit = () => {
        if (otp.length == 6) navigate('/dashboard')
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
                            >
                                Login Sekarang
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
