import { Loader2 } from 'lucide-react'
import { Suspense } from 'react'

const SpinnerLoader = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <Loader2 className="w-10 h-10 animate-spin text-blue-brand" />
        </div>
    )
}

export default SpinnerLoader

export const SpinnerLoaderSection = () => {
    return (
        <div className="flex items-center justify-center py-24 w-full col-span-12">
            <Loader2 className="w-10 h-10 animate-spin text-blue-brand" />
        </div>
    )
}

export const SuspenseLoaderSection = ({
    children,
}: {
    children: React.ReactNode
}) => {
    return <Suspense fallback={<SpinnerLoaderSection />}>{children}</Suspense>
}
