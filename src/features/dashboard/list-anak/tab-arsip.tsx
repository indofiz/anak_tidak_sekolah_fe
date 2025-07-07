import { cn } from '@/lib/utils'
import useFilterAnak from '@/store/filter-anak-store'

interface TabItem {
    id: string
    label: string
    className?: string
}

const TabArsip: React.FC = () => {
    const { setFilter, is_old } = useFilterAnak()

    const tabs: TabItem[] = [
        {
            id: 'tab_dibawah_umur',
            label: 'Anak Dibawah Umur',
            className:
                is_old == 0
                    ? 'text-blue-primary border-b-2 border-blue-primary bg-blue-50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50',
        },
        {
            id: 'tab_diatas_umur',
            label: 'Diatas 18',
            className:
                is_old == 1
                    ? 'text-blue-primary border-b-2 border-blue-primary bg-blue-50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50',
        },
    ]

    return (
        <div className="max-w-2xl mx-auto md:mx-0">
            <div className="w-full">
                {/* Tab Headers */}
                <div className="flex border-b border-gray-200">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => {
                                setFilter({
                                    is_old:
                                        tab.id === 'tab_diatas_umur' ? 1 : 0,
                                })
                            }}
                            className={cn(
                                'px-3 md:px-6 py-3 font-medium text-sm transition-colors duration-200',
                                tab.className
                            )}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TabArsip
