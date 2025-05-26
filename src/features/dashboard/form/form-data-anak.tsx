import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { format } from 'date-fns'

import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { DatetimePicker } from '@/components/ui/datetime'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { AnakData, useSaveAnakData } from '@/api/data-anak'
import { useNavigate } from 'react-router'
import { useKategori } from '@/api/master-data/kategori'
import { useAuthStore } from '@/store/login-store'
import { useSubKategori } from '@/api/master-data/sub-kategori'
import { useQueryClient } from '@tanstack/react-query'

interface FormDataAnakProps {
    initialData?: AnakData | null
}

const formSchema = z.object({
    nik: z
        .string()
        .min(16, 'NIK harus 16 digit')
        .regex(/^\d+$/, 'Harus berupa angka'),
    nama_anak: z.string().min(3, 'Nama anak minimal 3 karakter'),
    nisn: z.string().regex(/^\d*$/, 'Harus berupa angka').optional(),
    jenis_kelamin: z.string().min(1, 'Jenis kelamin harus dipilih'),
    tempat_lahir: z.string().min(3, 'Tempat lahir minimal 3 karakter'),
    tgl_lahir: z.coerce
        .date()
        .refine((date) => date instanceof Date && !isNaN(date.getTime()), {
            message: 'Tanggal lahir harus berupa tanggal yang valid',
        }),
    alamat_kk: z.string().min(3, 'Alamat KTP/KK minimal 3 karakter'),
    alamat_domisili: z.string().min(3, 'Alamat Domisili minimal 3 karakter'),
    id_kategori: z.string().nullable().optional(),
    id_sub_kategori: z.string().min(1, ' Sub Kategori harus dipilih'),
})

export default function FormDataAnak({ initialData }: FormDataAnakProps) {
    const navigate = useNavigate()
    const { user } = useAuthStore()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nik: initialData?.nik || '',
            nama_anak: initialData?.nama_anak || '',
            nisn: initialData?.nisn || '',
            jenis_kelamin: initialData?.jenis_kelamin || '',
            tempat_lahir: initialData?.tempat_lahir || '',
            tgl_lahir: initialData?.tgl_lahir
                ? new Date(initialData.tgl_lahir)
                : new Date(),
            alamat_kk: initialData?.alamat_kk || '',
            alamat_domisili: initialData?.alamat_domisili || '',
            id_kategori: initialData?.id_kategori || '',
            id_sub_kategori: initialData?.id_sub_kategori || '',
        },
    })

    const mutation = useSaveAnakData()
    const queryClient = useQueryClient()

    const watchKategori = form.watch('id_kategori')
    const { data: kategoriData, isLoading: isLoadingKategori } = useKategori({
        token: user?.token || '',
    })
    const { data: subKategoriData, isLoading: isLoadingSubKategori } =
        useSubKategori({
            token: user?.token || '',
            kategori: watchKategori || '',
        })

    function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const formData = new FormData()

            // Append all fields
            formData.append('nik', values.nik)
            formData.append('nama_anak', values.nama_anak || '')
            formData.append('nisn', values.nisn || '')
            formData.append('jenis_kelamin', values.jenis_kelamin || '')
            formData.append('tempat_lahir', values.tempat_lahir || '')

            // Format date properly
            if (values.tgl_lahir) {
                formData.append(
                    'tgl_lahir',
                    format(values.tgl_lahir, 'yyyy-MM-dd')
                )
            }

            formData.append('alamat_kk', values.alamat_kk || '')
            formData.append('alamat_domisili', values.alamat_domisili || '')
            formData.append('id_kategori', values.id_kategori?.toString() || '')
            formData.append(
                'id_sub_kategori',
                values.id_sub_kategori?.toString() || ''
            )

            // Execute mutation
            mutation.mutate(formData, {
                onSuccess: () => {
                    toast.success('Data berhasil disimpan')
                    // Invalidate queries to refresh data
                    queryClient.invalidateQueries({ queryKey: ['anakList'] })
                    queryClient.invalidateQueries({
                        queryKey: ['anak-data', values.nik],
                    })
                    navigate(`/dashboard/anak/${values.nik}/data-wali`)
                },
                onError: (error) => {
                    toast.error(error.message)
                },
            })
        } catch (error) {
            console.error('Form submission error', error)
            toast.error('Gagal menyimpan data. Silakan coba lagi.')
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 py-2 max-w-md"
            >
                <FormField
                    control={form.control}
                    name="nik"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nomor Induk Kependudukan</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="contoh: 029392133213"
                                    type="text"
                                    {...field}
                                    disabled
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="nama_anak"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nama Lengkap</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Nama Lengkap Anak"
                                    type="text"
                                    {...field}
                                    value={field.value || ''}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="nisn"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>NISN</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="contoh : 120021323213"
                                    type="text"
                                    {...field}
                                    value={field.value || ''}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="tempat_lahir"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tempat Lahir</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="contoh: Gabek 1"
                                    type="text"
                                    {...field}
                                    value={field.value || ''}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="tgl_lahir"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Tanggal Lahir</FormLabel>
                            <DatetimePicker
                                {...field}
                                value={field.value || new Date()}
                                format={[['months', 'days', 'years']]}
                            />

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="jenis_kelamin"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Jenis Kelamin</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value || ''}
                            >
                                <FormControl>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Pilih Jenis Kelamin" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Laki-Laki">
                                        Laki - Laki
                                    </SelectItem>
                                    <SelectItem value="Perempuan">
                                        Perempuan
                                    </SelectItem>
                                </SelectContent>
                            </Select>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="alamat_kk"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Alamat KTP/KK</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="contoh: gabek 1"
                                    className="resize-none"
                                    {...field}
                                    value={field.value || ''}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="alamat_domisili"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Alamat Domisili</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="contoh : Gabek 1"
                                    className="resize-none"
                                    {...field}
                                    value={field.value || ''}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="id_kategori"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Kategori Pendataan</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value?.toString() || ''}
                                disabled={isLoadingKategori}
                            >
                                <FormControl>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Pilih Kategori Pendataan" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {kategoriData?.data.map((kategori) => (
                                        <SelectItem
                                            key={kategori.id}
                                            value={kategori.id.toString()}
                                        >
                                            {kategori.kategori}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="id_sub_kategori"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Sub Kategori Pendataan</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value.toString() || ''}
                                disabled={isLoadingSubKategori}
                            >
                                <FormControl>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Pilih Sub Kategori Pendataan" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {subKategoriData?.data.map(
                                        (subkategori) => (
                                            <SelectItem
                                                key={subkategori.id}
                                                value={subkategori.id.toString()}
                                            >
                                                {subkategori.sub_kategori}
                                            </SelectItem>
                                        )
                                    )}
                                </SelectContent>
                            </Select>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-end">
                    <Button type="submit">Simpan Data</Button>
                </div>
            </form>
        </Form>
    )
}
