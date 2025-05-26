import { useAnakList } from '@/api/list-anak'
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

export function TableAnak() {
    const { user } = useAuthStore()
    const { data: anakData, isLoading } = useAnakList({
        token: user?.token || '',
    })
    if (isLoading) {
        return <div className="text-center">Loading...</div>
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
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
