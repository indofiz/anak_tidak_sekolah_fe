import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from './ui/card'
import { useNavigate } from 'react-router'
import { useMutation } from '@tanstack/react-query'
import { sendOTPRequest, SendOTPResponse } from '@/api/login'
import React from 'react'

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    const [mobile, setMobile] = React.useState<string>('')
    const navigate = useNavigate()

    const mutation = useMutation<SendOTPResponse, Error, string>({
        mutationFn: sendOTPRequest,
        onSuccess: (data) => {
            console.log('OTP sent successfully:', data.message)
            // Add your success handling logic here
            navigate('/otp', { state: { mobile: mobile } }) // Redirect to OTP page with mobile number
        },
        onError: (error) => {
            console.error('OTP send error:', error.message)
            // Add your error handling logic here
        },
    })
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget as HTMLFormElement)
        const mobile = formData.get('mobile') as string

        if (mobile) {
            setMobile(mobile)
            mutation.mutate(mobile)
        }
    }
    return (
        <div className={cn('flex flex-col gap-6', className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Selamat Datang</CardTitle>
                    <CardDescription>
                        Silahkan login dengan nomor whatsapp
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onSubmit}>
                        <div className="grid gap-6">
                            <div className="grid gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">
                                        Nomor Whatsapp
                                    </Label>
                                    <Input
                                        id="mobile"
                                        type="text"
                                        name="mobile"
                                        placeholder="contoh: 083175087398"
                                        required
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={mutation.isPending}
                                >
                                    {mutation.isPending
                                        ? 'Mengirim OTP...'
                                        : 'Login Sekarang'}
                                </Button>
                                {mutation.isError && (
                                    <div className="text-sm text-red-500">
                                        {mutation.error.message}
                                    </div>
                                )}

                                {mutation.isSuccess && (
                                    <div className="text-sm text-green-500">
                                        {mutation.data.message}
                                    </div>
                                )}
                            </div>
                        </div>
                    </form>
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
