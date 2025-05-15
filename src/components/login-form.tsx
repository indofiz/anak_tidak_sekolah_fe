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

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    const navigate = useNavigate()
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        navigate('/otp')
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
                                        id="wa"
                                        type="text"
                                        placeholder="contoh: 083175087398"
                                        required
                                    />
                                </div>
                                <Button type="submit" className="w-full">
                                    Login Sekarang
                                </Button>
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
