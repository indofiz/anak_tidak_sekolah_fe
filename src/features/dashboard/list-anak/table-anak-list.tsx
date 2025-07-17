import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import {
    BadgeCheck,
    Eye,
    Pencil,
    PlusCircle,
    School,
    ShieldUser,
    Trash2,
} from 'lucide-react'

import { statusAnak, statusClassName } from '@/lib/status'
import { cn } from '@/lib/utils'
import { Link } from 'react-router'
import { Anak, useDeleteAnak } from '@/api/list-anak'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useDeleteDialogStore } from '@/store/dialog-delete'
import StatusProgress from './status-progress'
import NoData from '@/components/other/no-data'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { FormCariAnak } from '../beranda/form-add-search'

const TableAnakList = ({ dataAnak }: { dataAnak: Anak[] }) => {
    const deleteMutation = useDeleteAnak()
    const { openDialog } = useDeleteDialogStore()

    const handleDelete = async (nik: string) => {
        deleteMutation.mutate(nik, {
            onSuccess: () => {
                toast.success('Anak berhasil dihapus')
                // Optionally show a success message or perform other actions
            },
            onError: (error) => {
                toast.error('Gagal menghapus anak: ' + error.message)
                console.error('Error deleting anak:', error)
            },
        })
    }
    const openDeleteDialog = (nik: string) => {
        openDialog(
            () => handleDelete(nik),
            'Yakin ingin menghapus data anak?',
            'data yang dihapus tidak bisa dikembalikan, harus ditambahkan ulang.'
        )
    }

    if (dataAnak.length === 0) {
        return (
            <NoData
                title="Belum ada data anak"
                description="Tambahkan data anak terlebih dahulu"
                button={
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant={'default'}>
                                <PlusCircle className="size-4" />
                                Tambah Anak
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Tambah Anak</DialogTitle>
                                <DialogDescription>
                                    Masukan Nama dan NIK anak, guna melihat
                                    apakah anak sudah pernah didata.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="w-full">
                                <FormCariAnak />
                            </div>
                            <div></div>
                        </DialogContent>
                    </Dialog>
                }
            />
        )
    }

    return (
        <Table>
            <TableHeader className="bg-gray-50">
                <TableRow>
                    <TableHead>Nama Anak</TableHead>
                    <TableHead>Nama Wali</TableHead>
                    <TableHead>Jenis Kelamin</TableHead>
                    <TableHead>Usia</TableHead>
                    <TableHead>Bersedia</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                    <TableHead className="text-right">Progres</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="font-normal">
                {dataAnak?.map((anak) => (
                    <TableRow key={anak.nama_anak}>
                        <TableCell className="font-medium">
                            {anak.nama_anak}
                        </TableCell>
                        <TableCell className="font-light">
                            {anak.nama_wali}
                        </TableCell>
                        <TableCell className="font-light">
                            {anak.jenis_kelamin}
                        </TableCell>
                        <TableCell className="font-light">
                            {anak.usia} Tahun
                        </TableCell>
                        <TableCell className="font-light">
                            {anak.bersedia == '1' ? 'Ya' : 'Tidak'}
                        </TableCell>
                        <TableCell className="text-right">
                            <span
                                className={cn(
                                    `px-2 text-xs py-1 rounded `,
                                    statusClassName[+anak.status]
                                        ? statusClassName[+anak.status]
                                        : 'bg-gray-100 text-gray-800'
                                )}
                            >
                                {anak.status
                                    ? statusAnak[+anak.status]
                                    : 'Tidak Diketahui'}
                            </span>
                        </TableCell>
                        <TableCell className="text-right">
                            <div className="flex gap-1 items-center justify-end">
                                <StatusProgress
                                    icon={ShieldUser}
                                    isActive={anak.is_wali === 1}
                                    tooltip="Data Wali"
                                />
                                <StatusProgress
                                    icon={School}
                                    isActive={anak.is_sekolah === 1}
                                    tooltip="Data Sekolah"
                                />
                                <StatusProgress
                                    icon={BadgeCheck}
                                    isActive={anak.is_tindak === 1}
                                    tooltip="Data Tindak Lanjut"
                                />
                            </div>
                        </TableCell>
                        <TableCell className="text-right space-x-1">
                            <Button variant="outline" size={'icon'} asChild>
                                <Link to={`/dashboard/anak/${anak.nik}`}>
                                    <Eye size={16} />
                                </Link>
                            </Button>
                            <Button
                                variant="outline"
                                className="text-xs font-normal"
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
                                className="bg-red-100 text-red-500 border-red-200"
                                size={'icon'}
                                onClick={() => openDeleteDialog(anak.nik)}
                            >
                                <Trash2 size={16} />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default TableAnakList
