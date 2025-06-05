import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
    User,
    School,
    Users,
    ClipboardList,
    Calendar,
    MapPin,
    Phone,
    Briefcase,
    Pencil,
    Trash2,
} from 'lucide-react'
import { Link, useParams } from 'react-router'
import {
    AnakDetailParams,
    ErrorResponse,
    fetchDetailAllAnak,
    SuccessResponse,
} from '@/api/detail-all-anak'
import { useQuery } from '@tanstack/react-query'
import { useAuthStore } from '@/store/login-store'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useDeleteDialogStore } from '@/store/dialog-delete'
import { useDeleteAnak } from '@/api/list-anak'
import Loading from '@/components/other/loading'

const useDetailAllAnak = (params: AnakDetailParams) => {
    return useQuery<SuccessResponse, ErrorResponse>({
        queryKey: ['detail-anak', params.nik],
        queryFn: () => {
            if (!params.token) throw new Error('Token tidak tersedia')
            return fetchDetailAllAnak(params)
        },
        enabled: !!params.nik,
        retry: false,
    })
}

const ChildrenDetailPage: React.FC = () => {
    const { nik } = useParams()
    const { user } = useAuthStore()
    //fetch data using react query
    const {
        data: anakData,
        isLoading,
        isRefetching,
    } = useDetailAllAnak({
        nik: nik || '',
        token: user?.token || '',
    })

    const { data } = anakData || {}

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

    if (isLoading || isRefetching) {
        return (
            <div className="col-span-12 text-center py-8 md:py-12 ">
                <Loading text="Memuat Data ..." size="sm" color="gray" />
            </div>
        )
    }

    const formatDate = (dateString: string): string => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
    }

    const getStatusBadge = (status: string) => {
        return status === '1' ? (
            <Badge variant="default" className="bg-green-100 text-green-800">
                Aktif
            </Badge>
        ) : (
            <Badge variant="secondary" className="bg-red-100 text-red-800">
                Tidak Aktif
            </Badge>
        )
    }

    const getBersediaBadge = (bersedia: string) => {
        return bersedia === '1' ? (
            <Badge variant="default" className="bg-blue-100 text-blue-800">
                Bersedia
            </Badge>
        ) : (
            <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                Tidak Bersedia
            </Badge>
        )
    }

    return (
        <div className="min-h-screen md:bg-gray-50 mt-6 md:mt-0 rounded-lg p-0 md:p-6 col-span-12">
            <div className="max-w-6xl mx-auto space-y-6">
                {/* Header */}
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Detail Data Anak
                    </h1>
                    <p className="text-gray-600">
                        Informasi lengkap data anak, sekolah terakhir dan
                        keluarga
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Data Anak */}
                    <Card className="col-span-1 lg:col-span-2">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5" />
                                Data Anak
                            </CardTitle>
                            <CardDescription>
                                Informasi identitas dan data pribadi anak
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {data && data.anak ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-500">
                                            NIK
                                        </label>
                                        <p className="text-sm font-mono bg-gray-100 p-2 rounded">
                                            {data.anak.nik}
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-500">
                                            Nama Anak
                                        </label>
                                        <p className="text-sm font-semibold">
                                            {data.anak.nama_anak ||
                                                'Tidak tersedia'}
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-500">
                                            NISN
                                        </label>
                                        <p className="text-sm">
                                            {data.anak.nisn || 'Tidak tersedia'}
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-500">
                                            Jenis Kelamin
                                        </label>
                                        <p className="text-sm">
                                            {data.anak.jenis_kelamin ||
                                                'Tidak tersedia'}
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-500">
                                            Tempat Lahir
                                        </label>
                                        <p className="text-sm flex items-center gap-1">
                                            <MapPin className="h-4 w-4" />
                                            {data.anak.tempat_lahir ||
                                                'Tidak tersedia'}
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-500">
                                            Tanggal Lahir
                                        </label>
                                        <p className="text-sm flex items-center gap-1">
                                            <Calendar className="h-4 w-4" />
                                            {data.anak.tgl_lahir
                                                ? formatDate(
                                                      data.anak.tgl_lahir
                                                  )
                                                : 'Tidak tersedia'}
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-500">
                                            Alamat KK
                                        </label>
                                        <p className="text-sm">
                                            {data.anak.alamat_kk ||
                                                'Tidak tersedia'}
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-500">
                                            Alamat Domisili
                                        </label>
                                        <p className="text-sm">
                                            {data.anak.alamat_domisili ||
                                                'Tidak tersedia'}
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-500">
                                            Kelurahan
                                        </label>
                                        <p className="text-sm">
                                            {data.anak.kelurahan}
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-500">
                                            Status
                                        </label>
                                        <div>
                                            {data.anak.status ? (
                                                getStatusBadge(data.anak.status)
                                            ) : (
                                                <span className="text-sm text-gray-500">
                                                    Tidak tersedia
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="md:col-span-2 flex justify-end">
                                        <Button
                                            variant="outline"
                                            className="font-medium"
                                            asChild
                                        >
                                            <Link
                                                to={`/dashboard/anak/${nik}/data-anak`}
                                            >
                                                <Pencil size={16} />
                                                Edit Anak
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    <User className="h-12 w-12 mx-auto mb-2 opacity-50" />
                                    <p>Data anak tidak tersedia</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Data Sekolah */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <School className="h-5 w-5" />
                                Data Sekolah
                            </CardTitle>
                            <CardDescription>
                                Informasi pendidikan dan sekolah
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {data && data.sekolah ? (
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-500">
                                            Nama Sekolah
                                        </label>
                                        <p className="text-sm font-semibold capitalize">
                                            {data.sekolah.nama_sekolah}
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-500">
                                                NPSN
                                            </label>
                                            <p className="text-sm">
                                                {data.sekolah.npsn_sekolah}
                                            </p>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-500">
                                                Tingkat
                                            </label>
                                            <Badge variant="outline">
                                                {data.sekolah.tingkat}
                                            </Badge>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-500">
                                                Kelas
                                            </label>
                                            <p className="text-sm">
                                                {data.sekolah.kelas}
                                            </p>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-500">
                                                Tahun Terakhir
                                            </label>
                                            <p className="text-sm">
                                                {data.sekolah.tahun_terakhir}
                                            </p>
                                        </div>
                                    </div>
                                    {data.sekolah.alasan_tidak_sekolah?.length >
                                        0 && (
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-500">
                                                Alasan Tidak Sekolah
                                            </label>
                                            <div className="flex flex-wrap gap-1">
                                                {data.sekolah.alasan_tidak_sekolah.map(
                                                    (alasan, index) => (
                                                        <Badge
                                                            key={index}
                                                            variant="secondary"
                                                            className="text-xs"
                                                        >
                                                            {alasan}
                                                        </Badge>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    )}
                                    {data.sekolah.lainnya && (
                                        <div className="space-y-3">
                                            <label className="text-sm font-medium text-gray-500">
                                                Keterangan Lainnya
                                            </label>
                                            <p className="text-sm bg-yellow-50 p-2 rounded border border-yellow-200">
                                                {data.sekolah.lainnya}
                                            </p>
                                        </div>
                                    )}
                                    <div className="flex justify-end">
                                        <Button
                                            variant="outline"
                                            className="font-medium"
                                            asChild
                                        >
                                            <Link
                                                to={`/dashboard/anak/${nik}/data-sekolah`}
                                            >
                                                <Pencil size={16} />
                                                Edit Sekolah
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    <School className="h-12 w-12 mx-auto mb-2 opacity-50" />
                                    <p>Data sekolah tidak tersedia</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Data Wali */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="h-5 w-5" />
                                Data Wali
                            </CardTitle>
                            <CardDescription>
                                Informasi wali atau orang tua
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {data && data.wali ? (
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-500">
                                            Nama Wali
                                        </label>
                                        <p className="text-sm font-semibold">
                                            {data.wali.nama_wali}
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-500">
                                            No. HP
                                        </label>
                                        <p className="text-sm flex items-center gap-1">
                                            <Phone className="h-4 w-4" />
                                            {data.wali.no_hp ||
                                                'Tidak tersedia'}
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-500">
                                            Pekerjaan
                                        </label>
                                        <p className="text-sm flex items-center gap-1 capitalize">
                                            <Briefcase className="h-4 w-4" />
                                            {data.wali.pekerjaan}
                                        </p>
                                    </div>
                                    <div className="flex justify-end">
                                        <Button
                                            variant="outline"
                                            className="font-medium"
                                            asChild
                                        >
                                            <Link
                                                to={`/dashboard/anak/${nik}/data-wali`}
                                            >
                                                <Pencil size={16} />
                                                Edit Wali
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    <Users className="h-12 w-12 mx-auto mb-2 opacity-50" />
                                    <p>Data wali tidak tersedia</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Data Tindak Lanjut */}
                    <Card className="col-span-1 lg:col-span-2">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <ClipboardList className="h-5 w-5" />
                                Tindak Lanjut
                            </CardTitle>
                            <CardDescription>
                                Informasi program dan tindak lanjut yang akan
                                dilakukan
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {data && data.tindak_lanjut ? (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-500">
                                            Status Kesediaan
                                        </label>
                                        <div>
                                            {getBersediaBadge(
                                                data.tindak_lanjut.bersedia
                                            )}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-500">
                                            Program
                                        </label>
                                        <Badge
                                            variant="outline"
                                            className="w-fit"
                                        >
                                            Program {data.tindak_lanjut.program}
                                        </Badge>
                                    </div>
                                    <div className="space-y-2 md:col-span-1">
                                        <label className="text-sm font-medium text-gray-500">
                                            Catatan
                                        </label>
                                        <p className="text-sm">
                                            {data.tindak_lanjut.catatan ||
                                                'Tidak ada catatan'}
                                        </p>
                                    </div>
                                    <div className="md:col-span-3 flex justify-end">
                                        <Button
                                            variant="outline"
                                            className="font-medium"
                                            asChild
                                        >
                                            <Link
                                                to={`/dashboard/anak/${nik}/data-tindak-lanjut`}
                                            >
                                                <Pencil size={16} />
                                                Edit Tindak Lanjut
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    <ClipboardList className="h-12 w-12 mx-auto mb-2 opacity-50" />
                                    <p>Data tindak lanjut tidak tersedia</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Metadata */}
                {data &&
                    data.anak &&
                    data.anak.created_at &&
                    data.anak.updated_at && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-sm">
                                    Informasi Sistem
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs items-center text-gray-600">
                                    <div>
                                        <p>
                                            <span className="font-medium">
                                                Dibuat:
                                            </span>{' '}
                                            {formatDate(data.anak.created_at)}{' '}
                                            {data.anak.created_by
                                                ? `oleh ${data.anak.created_by}`
                                                : ''}
                                        </p>
                                    </div>
                                    <div>
                                        <p>
                                            <span className="font-medium">
                                                Diperbarui:
                                            </span>{' '}
                                            {formatDate(data.anak.updated_at)}{' '}
                                            {data.anak.updated_by
                                                ? `oleh ${data.anak.updated_by}`
                                                : ''}
                                        </p>
                                    </div>
                                    <div className="flex gap-2 justify-end">
                                        <Button
                                            variant="outline"
                                            className="font-medium"
                                            asChild
                                        >
                                            <Link
                                                to={`/dashboard/anak/${nik}/data-anak`}
                                            >
                                                <Pencil size={16} />
                                                Edit
                                            </Link>
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="font-medium bg-red-100 text-red-500 border-red-200"
                                            size={'icon'}
                                            onClick={() => {
                                                openDeleteDialog(nik as string)
                                            }}
                                        >
                                            <Trash2 size={16} />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}
            </div>
        </div>
    )
}

export default ChildrenDetailPage
