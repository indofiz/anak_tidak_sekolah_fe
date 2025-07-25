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
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

interface FormDataSekolahProps {
    initialData?: SekolahData | null
    nik: string
    kategori?: number
    isBelumSekolah?: boolean
}

const formSchema = z.object({
    nama_sekolah: z.string().min(1, 'Nama sekolah tidak boleh kosong'),
    npsn_sekolah: z.string().optional(),
    tingkat: z.string().min(1, 'Tingkat sekolah tidak boleh kosong'),
    kelas: z
        .string()
        .min(1, 'Kelas tidak boleh kosong')
        .regex(/^[0-9]+$/, 'Kelas harus berupa angka'), // Only allow digits
    tahun_terakhir: z.string().min(1, 'Tahun tidak boleh kosong'),
    alasan_tidak_sekolah: z.array(z.string()),
    lainnya: z.string().optional(),
})

export default function FormDataSekolah({
    initialData,
    nik,
    kategori,
    isBelumSekolah,
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

    const tingkat = form.watch('tingkat') // Watch tingkat field

    // Automatically set kelas to "0" when TK is selected
    useEffect(() => {
        if (tingkat === 'TK') {
            form.setValue('kelas', '0')
        }
    }, [tingkat, form])

    const mutation = useSaveSekolahData()
    const queryClient = useQueryClient()

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
                    queryClient.invalidateQueries({ queryKey: ['anakList'] })
                    queryClient.invalidateQueries({
                        queryKey: ['sekolah-data', nik],
                    })
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
                            <FormLabel>
                                Nama Sekolah :{' '}
                                <span className="text-red-500 text-xs">*</span>
                            </FormLabel>
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
                            <FormLabel>NPSN Sekolah :</FormLabel>
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
                            <FormLabel>
                                Tingkat :{' '}
                                <span className="text-red-500 text-xs">*</span>
                            </FormLabel>
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
                                    <SelectItem value="TK">
                                        TK / Sederajat (5-6 Tahun)
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
                            <FormLabel>
                                Kelas :{' '}
                                <span className="text-red-500 text-xs">*</span>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="contoh : 12"
                                    type="number"
                                    min="0"
                                    step="1"
                                    disabled={tingkat === 'TK'} // Disable when TK selected
                                    onKeyDown={(e) => {
                                        // Prevent negative numbers
                                        if (e.key === '-' || e.key === '+') {
                                            e.preventDefault()
                                        }
                                    }}
                                    {...field}
                                    onChange={(e) => {
                                        // Handle empty input
                                        const value = e.target.value
                                        if (value === '') {
                                            field.onChange('')
                                            return
                                        }

                                        // Convert to number and back to string
                                        const numValue = parseInt(value, 10)
                                        if (!isNaN(numValue)) {
                                            field.onChange(numValue.toString())
                                        }
                                    }}
                                />
                            </FormControl>
                            <FormDescription className="text-xs">
                                {tingkat === 'TK'
                                    ? 'Kelas otomatis 0 untuk tingkat TK'
                                    : 'Gunakan angka (0-9) saja, jika tidak ada kelas, isi dengan 0'}
                            </FormDescription>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="tahun_terakhir"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Tahun Terakhir :{' '}
                                <span className="text-red-500 text-xs">*</span>
                            </FormLabel>
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

                {kategori != 2 ? (
                    <FormField
                        control={form.control}
                        name="alasan_tidak_sekolah"
                        render={() => (
                            <FormItem>
                                <div className="mb-4">
                                    <FormLabel className="text-base">
                                        Alasan{' '}
                                        {isBelumSekolah
                                            ? 'Belum Sekolah'
                                            : 'Tidak Sekolah'}
                                    </FormLabel>
                                    <FormDescription>
                                        Apa saja sih alasan anak yang didata
                                        tidak sekolah
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
                ) : null}

                {isLainnyaSelected ? (
                    <FormField
                        control={form.control}
                        name="lainnya"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Alasan Lain :{' '}
                                    <span className="text-gray-500 text-xs">
                                        (Opsional)
                                    </span>
                                </FormLabel>
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
                <div className="flex justify-center md:justify-end">
                    <Button type="submit" className="w-full md:w-fit">
                        Simpan Data
                    </Button>
                </div>
            </form>
        </Form>
    )
}
