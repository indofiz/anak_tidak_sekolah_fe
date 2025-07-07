import { LoginForm } from '@/components/login-form'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router'

const LoginPage = () => {
    return (
        <div className="flex bg-blue-primary bg-[url('/header.png')] bg-bottom bg-no-repeat bg-contain min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <a
                    href="#"
                    className="flex items-center gap-2 self-center font-medium"
                >
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-yellow-primary text-primary-foreground">
                        <img src="/logo-dikbud.png" className="size-6" />
                    </div>
                    ATS Login.
                </a>
                <LoginForm />
                <div className="text-center mt-0 text-white">
                    <Link
                        to="/"
                        className="flex items-center justify-center gap-2 text-sm"
                    >
                        <ArrowLeft className="size-4" />
                        Ke halaman utama
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
