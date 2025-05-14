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

export function OTPForm({ className, ...props }: React.ComponentProps<'div'>) {
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
                                <OTPInput />
                            </div>
                            <Button type="submit" className="w-full">
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
