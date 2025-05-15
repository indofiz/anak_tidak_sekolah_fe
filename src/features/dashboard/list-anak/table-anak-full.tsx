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
        namaAnak: 'Dian Kusuma',
        namaWali: 'Agus Prabowo',
        jenisKelamin: 'Perempuan',
        usia: 4,
        bersedia: 'Ya',
        status: 'Menunggu',
    },
    {
        namaAnak: 'Fajar Nugraha',
        namaWali: 'Sri Lestari',
        jenisKelamin: 'Laki-laki',
        usia: 9,
        bersedia: 'Tidak',
        status: 'Menunggu',
    },
    {
        namaAnak: 'Citra Dewi',
        namaWali: 'Eko Prasetyo',
        jenisKelamin: 'Perempuan',
        usia: 5,
        bersedia: 'Ya',
        status: 'Selesai',
    },
    {
        namaAnak: 'Hendra Putra',
        namaWali: 'Linda Suryani',
        jenisKelamin: 'Laki-laki',
        usia: 7,
        bersedia: 'Ya',
        status: 'Menunggu',
    },
    {
        namaAnak: 'Nur Hasanah',
        namaWali: 'Rudi Hermawan',
        jenisKelamin: 'Perempuan',
        usia: 6,
        bersedia: 'Tidak',
        status: 'Menunggu',
    },
    {
        namaAnak: 'Aditya Saputra',
        namaWali: 'Yuni Kartika',
        jenisKelamin: 'Laki-laki',
        usia: 8,
        bersedia: 'Ya',
        status: 'Selesai',
    },
    {
        namaAnak: 'Rina Marlina',
        namaWali: 'Ahmad Yani',
        jenisKelamin: 'Perempuan',
        usia: 4,
        bersedia: 'Ya',
        status: 'Menunggu',
    },
    {
        namaAnak: 'Bayu Anggara',
        namaWali: 'Dwi Rahayu',
        jenisKelamin: 'Laki-laki',
        usia: 10,
        bersedia: 'Tidak',
        status: 'Selesai',
    },
    {
        namaAnak: 'Laras Putri',
        namaWali: 'Hadi Susanto',
        jenisKelamin: 'Perempuan',
        usia: 5,
        bersedia: 'Ya',
        status: 'Menunggu',
    },
    {
        namaAnak: 'Dimas Aditya',
        namaWali: 'Siska Permata',
        jenisKelamin: 'Laki-laki',
        usia: 6,
        bersedia: 'Ya',
        status: 'Selesai',
    },
    {
        namaAnak: 'Wulan Sari',
        namaWali: 'Joko Widodo',
        jenisKelamin: 'Perempuan',
        usia: 7,
        bersedia: 'Tidak',
        status: 'Menunggu',
    },
    {
        namaAnak: 'Irfan Maulana',
        namaWali: 'Ani Rismaya',
        jenisKelamin: 'Laki-laki',
        usia: 9,
        bersedia: 'Ya',
        status: 'Menunggu',
    },
    {
        namaAnak: 'Salsa Bella',
        namaWali: 'Dodi Prakoso',
        jenisKelamin: 'Perempuan',
        usia: 5,
        bersedia: 'Ya',
        status: 'Selesai',
    },
    {
        namaAnak: 'Rangga Pratama',
        namaWali: 'Eva Marlina',
        jenisKelamin: 'Laki-laki',
        usia: 8,
        bersedia: 'Tidak',
        status: 'Menunggu',
    },
    {
        namaAnak: 'Dinda Kirana',
        namaWali: 'Firman Syah',
        jenisKelamin: 'Perempuan',
        usia: 6,
        bersedia: 'Ya',
        status: 'Selesai',
    },
    {
        namaAnak: 'Ardi Nugroho',
        namaWali: 'Gita Wulandari',
        jenisKelamin: 'Laki-laki',
        usia: 7,
        bersedia: 'Ya',
        status: 'Menunggu',
    },
]

export function TableAnakFull() {
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
                        {childrenData.map((anak) => (
                            <TableRow key={anak.namaAnak}>
                                <TableCell className="font-medium">
                                    {anak.namaAnak}
                                </TableCell>
                                <TableCell className="font-light">
                                    {anak.namaWali}
                                </TableCell>
                                <TableCell className="font-light">
                                    {anak.jenisKelamin}
                                </TableCell>
                                <TableCell className="font-light">
                                    {anak.usia} Tahun
                                </TableCell>
                                <TableCell className="font-light">
                                    {anak.bersedia}
                                </TableCell>
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
                                <TableCell className="text-right space-x-1">
                                    <Button variant="outline" size={'icon'}>
                                        <Eye size={16} />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="text-xs font-normal"
                                    >
                                        <Pencil size={16} />
                                        Edit
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
                                                <AlertDialogAction>
                                                    Ya, Hapus
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
