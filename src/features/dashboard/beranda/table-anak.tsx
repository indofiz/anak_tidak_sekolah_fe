import { Anak, useAnakList } from '@/api/list-anak'
import Loading from '@/components/other/loading'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { statusAnak, statusClassName } from '@/lib/status'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/store/login-store'
import { BadgeCheck, Eye, PlusCircle, School, ShieldUser } from 'lucide-react'
import { Link } from 'react-router'
import StatusProgress from '../list-anak/status-progress'
import NoData from '@/components/other/no-data'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { FormCariAnak } from './form-add-search'

export function TableAnak() {
    const { user } = useAuthStore()
    const {
        data: anakData,
        isLoading,
        isFetching,
    } = useAnakList({
        token: user?.token || '',
        filter: {
            per_page: 5,
            page: 1,
            is_all: 0,
            is_old: 0,
            parameter: '',
        },
    })
    if (isLoading || isFetching) {
        return (
            <div className="w-full  text-center p-8">
                <Loading text="Memuat Data ..." size="sm" color="gray" />
            </div>
        )
    }

    const dataAnak = anakData?.data?.data?.data

    return (
        <Card className="w-full shadow-none">
            <CardHeader>
                <CardTitle>5 Data Anak Terbaru</CardTitle>
                <CardDescription>
                    Data anak yang baru ditambahkan oleh PSM
                </CardDescription>
            </CardHeader>
            <CardContent>
                {dataAnak && dataAnak.length > 0 ? (
                    <TableDashboard anakData={dataAnak} />
                ) : (
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
                                            Masukan Nama dan NIK anak, guna
                                            melihat apakah anak sudah pernah
                                            didata.
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
                )}
            </CardContent>
        </Card>
    )
}

const TableDashboard = ({ anakData }: { anakData: Anak[] }) => {
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
                    <TableHead className="text-right">Progress</TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="font-normal">
                {anakData?.map((anak) => (
                    <TableRow key={anak.nama_anak}>
                        <TableCell className="font-medium">
                            {anak.nama_anak}
                        </TableCell>
                        <TableCell>{anak.nama_wali}</TableCell>
                        <TableCell>{anak.jenis_kelamin}</TableCell>
                        <TableCell>{anak.usia} Tahun</TableCell>
                        <TableCell>
                            {anak.bersedia == '1' ? 'Ya' : 'Tidak'}
                        </TableCell>
                        <TableCell className="text-right">
                            <span
                                className={cn(
                                    `px-2 text-xs py-1 rounded`,
                                    anak.status
                                        ? statusClassName[+anak.status]
                                        : 'bg-gray-100 text-gray-800'
                                )}
                            >
                                {anak.status ? statusAnak[+anak.status] : null}
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
                        <TableCell className="text-right">
                            <Button variant={'outline'} asChild>
                                <Link to={`/dashboard/anak/${anak.nik}`}>
                                    <Eye className="w-4 h-4" /> Detail
                                </Link>
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
