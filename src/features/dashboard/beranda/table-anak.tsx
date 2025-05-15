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

const childrenData = [
    {
        namaAnak: 'Ahmad Dani',
        namaWali: 'Budi Santoso',
        jenisKelamin: 'Laki-laki',
        usia: 5,
        bersedia: 'Ya',
        status: 'Menunggu',
    },
    {
        namaAnak: 'Siti Aminah',
        namaWali: 'Rina Wijaya',
        jenisKelamin: 'Perempuan',
        usia: 7,
        bersedia: 'Tidak',
        status: 'Selesai',
    },
    {
        namaAnak: 'Maya Indah',
        namaWali: 'Dewi Kusuma',
        jenisKelamin: 'Perempuan',
        usia: 6,
        bersedia: 'Ya',
        status: 'Menunggu',
    },
    {
        namaAnak: 'Rizky Pratama',
        namaWali: 'Andi Setiawan',
        jenisKelamin: 'Laki-laki',
        usia: 8,
        bersedia: 'Ya',
        status: 'Selesai',
    },
    {
        namaAnak: 'Rizky Pratama',
        namaWali: 'Andi Setiawan',
        jenisKelamin: 'Laki-laki',
        usia: 8,
        bersedia: 'Ya',
        status: 'Selesai',
    },
]

export function TableAnak() {
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
                        {childrenData.map((anak) => (
                            <TableRow key={anak.namaAnak}>
                                <TableCell className="font-medium">
                                    {anak.namaAnak}
                                </TableCell>
                                <TableCell>{anak.namaWali}</TableCell>
                                <TableCell>{anak.jenisKelamin}</TableCell>
                                <TableCell>{anak.usia} Tahun</TableCell>
                                <TableCell>{anak.bersedia}</TableCell>
                                <TableCell className="text-right">
                                    <span
                                        className={`px-2 text-xs py-1 rounded ${
                                            anak.status === 'Selesai'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-yellow-100 text-yellow-800'
                                        }`}
                                    >
                                        {anak.status}
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
