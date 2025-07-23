import { Database } from 'lucide-react'
import React from 'react'

interface NoDataProps {
    title?: string
    description?: string
    button?: React.ReactNode
}

const NoData = ({
    title = 'No Items Yet',
    description = 'Add your first item to get started',
    button,
}: NoDataProps) => {
    return (
        <div className="bg-white rounded-lg md:shadow-sm md:border md:border-gray-200 p-4 md:p-8">
            <div className="text-center">
                <div className="w-12 h-12 mx-auto bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                    <Database className="w-6 h-6 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-0">
                    {title}
                </h3>
                <p className="text-gray-500 text-sm mb-6">{description}</p>
                {button ? button : null}
            </div>
        </div>
    )
}

export default NoData
