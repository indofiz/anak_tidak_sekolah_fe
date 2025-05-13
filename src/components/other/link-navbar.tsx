import { cn } from '@/lib/utils'
import React from 'react'
import { Link } from 'react-router'

interface LinkNavbarProps {
    to: string
    isActive?: boolean
    children?: React.ReactNode
}

const LinkNavbar: React.FC<LinkNavbarProps> = ({ children, to, isActive }) => {
    return (
        <Link
            to={to}
            className={cn(
                'text-[16px] text-white px-6 py-2.5 rounded-[8px] transition duration-300 ease-in-out',
                isActive
                    ? 'bg-black font-medium'
                    : 'bg-[#4AB8EB] hover:bg-white hover:text-blue-primary'
            )}
        >
            {children}
        </Link>
    )
}

export default LinkNavbar
