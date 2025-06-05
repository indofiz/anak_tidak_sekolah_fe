import React from 'react'
import { Loader2 } from 'lucide-react'

interface LoadingProps {
    size?: 'sm' | 'md' | 'lg' | 'xl'
    text?: string
    variant?: 'default' | 'overlay' | 'inline' | 'button'
    color?: 'primary' | 'secondary' | 'white' | 'gray'
    className?: string
}

const Loading: React.FC<LoadingProps> = ({
    size = 'md',
    text = 'Loading...',
    variant = 'default',
    color = 'primary',
    className = '',
}) => {
    // Size configurations
    const sizeConfig = {
        sm: { icon: 'w-4 h-4', text: 'text-sm', gap: 'gap-2' },
        md: { icon: 'w-6 h-6', text: 'text-base', gap: 'gap-3' },
        lg: { icon: 'w-8 h-8', text: 'text-lg', gap: 'gap-4' },
        xl: { icon: 'w-12 h-12', text: 'text-xl', gap: 'gap-4' },
    }

    // Color configurations
    const colorConfig = {
        primary: 'text-blue-600',
        secondary: 'text-gray-600',
        white: 'text-white',
        gray: 'text-gray-400',
    }

    const { icon, text: textSize, gap } = sizeConfig[size]
    const colorClass = colorConfig[color]

    // Base component
    const LoadingContent = () => (
        <div
            className={`flex items-center justify-center ${gap} ${colorClass} ${className}`}
        >
            <Loader2 className={`${icon} animate-spin`} />
            {text && <span className={textSize}>{text}</span>}
        </div>
    )

    // Variant rendering
    switch (variant) {
        case 'overlay':
            return (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 shadow-lg">
                        <LoadingContent />
                    </div>
                </div>
            )

        case 'inline':
            return (
                <div
                    className={`inline-flex items-center ${gap} ${colorClass} ${className}`}
                >
                    <Loader2 className={`${icon} animate-spin`} />
                    {text && <span className={textSize}>{text}</span>}
                </div>
            )

        case 'button':
            return (
                <div
                    className={`flex items-center ${gap} ${colorClass} ${className}`}
                >
                    <Loader2 className={`${icon} animate-spin`} />
                    {text && <span className={textSize}>{text}</span>}
                </div>
            )

        default:
            return (
                <div className="flex flex-col items-center justify-center p-8">
                    <LoadingContent />
                </div>
            )
    }
}

export default Loading
