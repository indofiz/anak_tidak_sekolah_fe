import { cn } from '@/lib/utils'
import { Link, useLocation } from 'react-router'

const SidebarForm = () => {
    const location = useLocation()

    // function to get active link with last word in path adter last slash
    const getActiveLink = (link: string) => {
        const path = location.pathname.split('/')
        const lastPath = path[path.length - 1]
        console.log(lastPath)
        return lastPath === link
    }

    return (
        <div className="bg-[#F8F8F8] px-4 py-8 h-full w-1/4">
            <div className="flex flex-col gap-0.5">
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

export default SidebarForm

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
                'text-[14px] font-semibold px-5 py-3.5 rounded-full',
                isActive
                    ? 'bg-[#D0E4FF] text-[#29538D]'
                    : 'text-[#5C5C5C] hover:bg-[#E5E5E5] hover:text-[#000]'
            )}
        >
            {children}
        </Link>
    )
}
