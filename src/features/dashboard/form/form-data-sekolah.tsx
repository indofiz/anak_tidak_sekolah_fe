import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { SekolahData, useSaveSekolahData } from '@/api/data-sekolah'
import { useNavigate } from 'react-router'
import { Textarea } from '@/components/ui/textarea'
import { useAlasan } from '@/api/master-data/alasan'
import { useAuthStore } from '@/store/login-store'

const items = [
    {
        id: '1',
        label: 'Tidak mampu biaya sekolah',
    },
    {
        id: '2',
        label: 'Harus bekerja/membantu orang tua',
    },
    {
        id: '3',
        label: 'Kurang minat belajar',
    },
    {
        id: '4',
        label: 'Jarak sekolah terlalu jauh',
    },
    {
        id: '5',
        label: 'Menikah diusia dini',
    },
    {
        id: '6',
        label: 'Disabilitas atau kebutuhan khusus',
    },
    {
        id: '7',
        label: 'Tidak bersedia sekolah di daerahnya',
    },
    {
        id: '8',
        label: 'Orang tua tidak mengizinkan',
    },
    {
        id: '999',
        label: 'Alasan Lainnya',
    },
] as const

interface FormDataSekolahProps {
    initialData?: SekolahData | null
    nik: string
}

const formSchema = z.object({
    nama_sekolah: z.string().min(1, 'Nama sekolah tidak boleh kosong'),
    npsn_sekolah: z.string().min(1, 'NPSN sekolah tidak boleh kosong'),
    tingkat: z.string().min(1, 'Tingkat sekolah tidak boleh kosong'),
    kelas: z.string().min(1, 'Kelas tidak boleh kosong'),
    tahun_terakhir: z.string().min(1, 'Tahun tidak boleh kosong'),
    alasan_tidak_sekolah: z
        .array(z.string())
        .refine((value) => value.some((item) => item), {
            message: 'You have to select at least one item.',
        }),
    lainnya: z.string().optional(),
})

export default function FormDataSekolah({
    initialData,
    nik,
}: FormDataSekolahProps) {
    const navigate = useNavigate()
    const { user } = useAuthStore()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nama_sekolah: initialData?.nama_sekolah || '',
            npsn_sekolah: initialData?.npsn_sekolah || '',
            tingkat: initialData?.tingkat || '',
            kelas: initialData?.kelas || '',
            tahun_terakhir: initialData?.tahun_terakhir?.toString() || '',
            alasan_tidak_sekolah: initialData?.alasan_tidak_sekolah || [],
            lainnya: initialData?.lainnya || '',
        },
    })
    const mutation = useSaveSekolahData()

    const { data: alasanData, isLoading: alasanIsLoading } = useAlasan({
        token: user?.token || '',
    })

    const watchAlasan = form.watch('alasan_tidak_sekolah')
    const isLainnyaSelected = watchAlasan.includes('999')

    function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const formData = new FormData()

            // Append all fields
            formData.append('nik_anak', nik)
            formData.append('nama_sekolah', values.nama_sekolah || '')
            formData.append('npsn_sekolah', values.npsn_sekolah || '')
            formData.append('tingkat', values.tingkat || '')
            formData.append('kelas', values.kelas || '')
            formData.append('tahun_terakhir', values.tahun_terakhir || '')
            if (values.alasan_tidak_sekolah.length > 0) {
                values.alasan_tidak_sekolah.forEach((item) => {
                    formData.append('alasan_tidak_sekolah[]', item)
                })
            }
            if (isLainnyaSelected && values.lainnya) {
                formData.append('lainnya', values.lainnya)
            }

            // Execute mutation
            mutation.mutate(formData, {
                onSuccess: () => {
                    toast.success('Data berhasil disimpan')
                    navigate(`/dashboard/anak/${nik}/data-tindak-lanjut`)
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
                    name="nama_sekolah"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nama Sekolah</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="contoh : SD N 12 Pangkalpinang"
                                    type="text"
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="npsn_sekolah"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>NPSN Sekolah</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="contoh : 12345678"
                                    type="text"
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="tingkat"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tingkat :</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Pilih tingkat sekolah terakhir" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="PAUD">
                                        PAUD / Sederajat
                                    </SelectItem>
                                    <SelectItem value="TK">
                                        TK / Sederajat
                                    </SelectItem>
                                    <SelectItem value="SD">
                                        SD / Sederajat
                                    </SelectItem>
                                    <SelectItem value="SMP">
                                        SMP / Sederajat
                                    </SelectItem>
                                    <SelectItem value="SMA">
                                        SMA / Sederajat
                                    </SelectItem>
                                </SelectContent>
                            </Select>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="kelas"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Kelas :</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="contoh : Kelas 12"
                                    type="text"
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="tahun_terakhir"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tahun Terakhir</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="contoh : 2015"
                                    type="text"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="alasan_tidak_sekolah"
                    render={() => (
                        <FormItem>
                            <div className="mb-4">
                                <FormLabel className="text-base">
                                    Alasan Tidak Sekolah
                                </FormLabel>
                                <FormDescription>
                                    Apa saja sih alasan anak yang didata tidak
                                    sekolah
                                </FormDescription>
                            </div>
                            {alasanData?.data.map((item) => {
                                const itemId = item.id.toString()
                                return (
                                    <FormField
                                        key={itemId}
                                        control={form.control}
                                        name="alasan_tidak_sekolah"
                                        render={({ field }) => {
                                            return (
                                                <FormItem
                                                    key={itemId}
                                                    className="flex flex-row items-start space-x-3 space-y-0"
                                                >
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value?.includes(
                                                                itemId
                                                            )}
                                                            disabled={
                                                                alasanIsLoading
                                                            }
                                                            onCheckedChange={(
                                                                checked
                                                            ) => {
                                                                return checked
                                                                    ? field.onChange(
                                                                          [
                                                                              ...field.value,
                                                                              itemId,
                                                                          ]
                                                                      )
                                                                    : field.onChange(
                                                                          field.value?.filter(
                                                                              (
                                                                                  value
                                                                              ) =>
                                                                                  value !==
                                                                                  itemId
                                                                          )
                                                                      )
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <FormLabel className="text-sm font-normal">
                                                        {item.alasan}
                                                    </FormLabel>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                )
                            })}
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {isLainnyaSelected ? (
                    <FormField
                        control={form.control}
                        name="lainnya"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Alasan Lain</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="contoh : Sakit keras, tidak mampu bayar biaya sekolah, dll."
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                ) : null}
                <div className="flex justify-end">
                    <Button type="submit">Simpan Data</Button>
                </div>
            </form>
        </Form>
    )
}
