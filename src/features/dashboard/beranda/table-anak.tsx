import { useAnakList } from '@/api/list-anak'
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
import { Eye } from 'lucide-react'
import { Link } from 'react-router'

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
    return (
        <Card className="w-full shadow-none">
            <CardHeader>
                <CardTitle>5 Data Anak Terbaru</CardTitle>
                <CardDescription>
                    Data anak yang baru ditambahkan oleh PSM
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader className="bg-gray-50">
                        <TableRow>
                            <TableHead>Nama Anak</TableHead>
                            <TableHead>Nama Wali</TableHead>
                            <TableHead>Jenis Kelamin</TableHead>
                            <TableHead>Usia</TableHead>
                            <TableHead>Bersedia</TableHead>
                            <TableHead className="text-right">Status</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="font-normal">
                        {anakData?.data?.data?.data.map((anak) => (
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
                                        {anak.status
                                            ? statusAnak[+anak.status]
                                            : null}
                                    </span>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant={'outline'} asChild>
                                        <Link
                                            to={`/dashboard/anak/${anak.nik}`}
                                        >
                                            <Eye className="w-4 h-4" /> Detail
                                        </Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
