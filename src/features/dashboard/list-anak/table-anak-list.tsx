import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Eye, Pencil, Trash2 } from 'lucide-react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { statusAnak, statusClassName } from '@/lib/status'
import { cn } from '@/lib/utils'
import { Link } from 'react-router'
import { Anak, useDeleteAnak } from '@/api/list-anak'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

const TableAnakList = ({ dataAnak }: { dataAnak: Anak[] }) => {
    const deleteMutation = useDeleteAnak()

    const handleDelete = (nik: string) => {
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
                        <TableCell className="text-right space-x-1">
                            <Button variant="outline" size={'icon'}>
                                <Eye size={16} />
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
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="bg-red-100 text-red-500 border-red-200"
                                        size={'icon'}
                                    >
                                        <Trash2 size={16} />
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>
                                            Apakah anda yakin ingin menghapus?
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Setelah dihapus, data tidak bisa
                                            dikembalikan, harus di tambah ulang.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>
                                            Batal
                                        </AlertDialogCancel>
                                        <AlertDialogAction asChild>
                                            <Button
                                                variant={'destructive'}
                                                className="bg-red-500 text-white"
                                                onClick={() =>
                                                    handleDelete(anak.nik)
                                                }
                                            >
                                                Ya, Hapus
                                            </Button>
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default TableAnakList
