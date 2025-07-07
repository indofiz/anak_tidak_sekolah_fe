import { LucideIcon } from 'lucide-react'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip'

interface StatusProgressProps {
    icon: LucideIcon
    isActive?: boolean
    tooltip?: string
}

const StatusProgress = ({ icon, isActive, tooltip }: StatusProgressProps) => {
    const Icon = icon
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <div
                    className={`flex items-center gap-2 ${
                        isActive ? 'text-teal-500' : 'text-gray-300'
                    }`}
                >
                    {<Icon size={16} />}
                </div>
            </TooltipTrigger>
            <TooltipContent>
                <p>{tooltip || ''}</p>
            </TooltipContent>
        </Tooltip>
    )
}

export default StatusProgress
