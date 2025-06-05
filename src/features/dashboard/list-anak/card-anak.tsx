import { Anak } from '@/api/list-anak'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ChevronDown, Eye, Pencil, Trash2, User2 } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router'

interface CardAnakProps {
    anak: Anak
    onDelete: (nik: string) => void
}
const CardAnak = ({ anak, onDelete }: CardAnakProps) => {
    const [open, setOpen] = useState(false)

    return (
        <div
            className={cn(
                'relative overflow-hidden col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 rounded-md border px-2 py-2 pb-4 hover:bg-gray-50 transition-colors cursor-pointer',
                open ? 'bg-gray-100 ' : 'bg-white '
            )}
            onClick={() => setOpen((prev) => !prev)}
        >
            <div className="flex pl-2 justify-between items-center border-b border-gray-200 pb-2 mb-2">
                <div className="font-medium text-md line-clamp-1 flex items-center gap-2 capitalize">
                    <User2 className="size-4" />
                    {anak.nama_anak}
                </div>
                <div className="flex items-center gap-2 justify-center">
                    <div className="text-xs text-gray-600">
                        {anak.usia ? anak.usia + ' Tahun' : '-'}
                    </div>
                    <div>
                        <button className="p-1 rounded-md hover:bg-gray-200 transition-colors">
                            <ChevronDown
                                className={cn(
                                    'size-4',
                                    open ? 'rotate-180' : ''
                                )}
                            />
                        </button>
                    </div>
                </div>
            </div>
            <div className="text-xs px-2 pt-1 text-gray-600 flex flex-col gap-1">
                <div className="flex justify-between">
                    NIK : <span className="font-medium">{anak.nik}</span>
                </div>
                <div className="flex justify-between">
                    Jenis Kelamin :{' '}
                    <span className="font-medium">
                        {anak.jenis_kelamin || '-'}
                    </span>
                </div>
                <div className="flex justify-between">
                    Wali :{' '}
                    <span className="font-medium">{anak.nama_wali || '-'}</span>
                </div>
                {open ? (
                    <>
                        <div className="flex justify-between">
                            Alamat :{' '}
                            <span className="font-medium">
                                {anak.alamat_domisili || anak.alamat_kk || '-'}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            Sekolah :{' '}
                            <span className="font-medium">
                                {anak.nama_sekolah || '-'}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            Kelas :{' '}
                            <span className="font-medium">
                                {anak.kelas || '-'}
                            </span>
                        </div>
                        <div className="flex gap-2 pt-2 mt-2 border-t border-gray-200">
                            <Button
                                variant="outline"
                                className="font-medium flex-1"
                                asChild
                            >
                                <Link to={`/dashboard/anak/${anak.nik}`}>
                                    <Eye size={16} /> Detail
                                </Link>
                            </Button>
                            <Button
                                variant="outline"
                                className="font-medium flex-1"
                                asChild
                            >
                                <Link
                                    to={`/dashboard/anak/${anak.nik}/data-anak`}
                                >
                                    <Pencil size={16} />
                                    Edit
                                </Link>
                            </Button>
                            <Button
                                variant="outline"
                                className="font-medium bg-red-100 text-red-500 border-red-200"
                                size={'icon'}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    onDelete(anak.nik)
                                }}
                            >
                                <Trash2 size={16} />
                            </Button>
                        </div>
                    </>
                ) : null}
            </div>
        </div>
    )
}

export default CardAnak
