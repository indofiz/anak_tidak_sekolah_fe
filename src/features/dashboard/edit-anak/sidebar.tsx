// sidebar.tsx
import { cn } from '@/lib/utils'
import { Link, useLocation } from 'react-router'

const SidebarForm = () => {
    const location = useLocation()

    const getActiveLink = (link: string) => {
        const path = location.pathname.split('/')
        const lastPath = path[path.length - 1]
        return lastPath === link
    }

    return (
        <div className="bg-[#F8F8F8] px-1 py-1 md:px-2 md:py-4 md:p-6 rounded-lg md:rounded-xl overflow-x-auto md:overflow-visible scrollbar-hide">
            <div className="flex md:flex-col gap-2 md:gap-1 w-max md:w-full">
                <SidebarLink
                    to="data-anak"
                    isActive={getActiveLink('data-anak')}
                >
                    Data Anak
                </SidebarLink>
                <SidebarLink
                    to="data-wali"
                    isActive={getActiveLink('data-wali')}
                >
                    Data Wali
                </SidebarLink>
                <SidebarLink
                    to="data-sekolah"
                    isActive={getActiveLink('data-sekolah')}
                >
                    Data Sekolah
                </SidebarLink>
                <SidebarLink
                    to="data-tindak-lanjut"
                    isActive={getActiveLink('data-tindak-lanjut')}
                >
                    Data Tindak Lanjut
                </SidebarLink>
            </div>
        </div>
    )
}

const SidebarLink = ({
    to,
    isActive,
    children,
}: {
    to: string
    isActive?: boolean
    children?: React.ReactNode
}) => {
    return (
        <Link
            to={to}
            className={cn(
                'text-sm md:text-[14px] font-medium px-3 py-2 md:px-5 md:py-3.5',
                'whitespace-nowrap rounded-lg md:rounded-full transition-colors',
                'flex-shrink-0', // Prevent shrinking on mobile
                isActive
                    ? 'bg-blue-primary text-white md:bg-[#D0E4FF] md:text-[#29538D]'
                    : 'text-[#5C5C5C] hover:bg-[#E5E5E5] hover:text-[#000]'
            )}
        >
            {children}
        </Link>
    )
}

export default SidebarForm
