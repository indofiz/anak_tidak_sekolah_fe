import { OTPForm } from '@/components/otp-form'
import { GalleryVerticalEnd } from 'lucide-react'

const OtpPage = () => {
    return (
        <div className="flex bg-blue-primary bg-[url('/header.png')] bg-bottom bg-no-repeat bg-contain min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <a
                    href="#"
                    className="flex items-center gap-2 self-center font-medium"
                >
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                        <GalleryVerticalEnd className="size-4" />
                    </div>
                    ATS Login.
                </a>
                <OTPForm />
            </div>
        </div>
    )
}

export default OtpPage
