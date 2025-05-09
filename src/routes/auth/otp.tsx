import OtpPage from '@/pages/otp-page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/otp')({
    component: Otp,
})

function Otp() {
    return <OtpPage />
}
