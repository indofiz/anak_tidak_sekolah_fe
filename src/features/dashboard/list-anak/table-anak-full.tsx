import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
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
import { useAnakList, useDeleteAnak } from '@/api/list-anak'
import { useAuthStore } from '@/store/login-store'
import { Link } from 'react-router'
import { toast } from 'sonner'
import { statusAnak, statusClassName } from '@/lib/status'
import { cn } from '@/lib/utils'

export function TableAnakFull() {
    const { user } = useAuthStore()
    const { data: dataAnak, isLoading } = useAnakList({
        token: user?.token,
    })

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

    if (isLoading) {
        return <div className="text-center">Loading...</div>
    }

    return (
        <Card className="col-span-12 shadow-none border-0">
            <CardHeader>
                <CardTitle>List Anak Tidak Sekolah</CardTitle>
                <CardDescription>
                    Semua data anak yang baru ditambahkan oleh PSM
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex w-full justify-between mb-4">
                    <div className="w-full flex items-center space-x-2">
                        <div className="flex w-full max-w-lg items-center space-x-2">
                            <Input
                                type="email"
                                placeholder="Cari nama anak atau nik"
                            />
                            <Button type="submit" variant={'outline'}>
                                Cari
                            </Button>
                        </div>
                    </div>
                    <div>
                        <Button>Export</Button>
                    </div>
                </div>
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
                        {dataAnak?.data?.data?.data.map((anak) => (
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
                                                    Apakah anda yakin ingin
                                                    menghapus?
                                                </AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Setelah dihapus, data tidak
                                                    bisa dikembalikan, harus di
                                                    tambah ulang.
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
                                                            handleDelete(
                                                                anak.nik
                                                            )
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
            </CardContent>
        </Card>
    )
}
