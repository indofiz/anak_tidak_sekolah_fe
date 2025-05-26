import { cn } from '@/lib/utils'
import React from 'react'
import { Link } from 'react-router'

interface LinkNavbarProps {
    to: string
    isActive?: boolean
    children?: React.ReactNode
    className?: string
    onClick?: () => void
}

const LinkNavbar: React.FC<LinkNavbarProps> = ({
    children,
    to,
    isActive,
    className,
    onClick,
}) => {
    return (
        <Link
            to={to}
            className={cn(
                'text-[16px] px-4 py-3 rounded-lg transition-colors duration-300 ease-in-out md:px-6 md:py-2.5',
                'flex items-center',
                isActive
                    ? 'bg-blue-primary md:bg-black text-white font-medium' // Active state for both mobile/desktop
                    : cn(
                          'text-gray-700 hover:bg-blue-50 hover:text-blue-primary', // Mobile/in-sidebar style
                          'md:text-white md:bg-[#4AB8EB] md:hover:bg-white md:hover:text-blue-primary' // Desktop style
                      ),
                className
            )}
            onClick={onClick}
        >
            {children}
        </Link>
    )
}

export default LinkNavbar
