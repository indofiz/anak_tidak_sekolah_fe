import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { cn } from '@/lib/utils'
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
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useSaveWaliData, WaliData } from '@/api/data-wali'
import { useNavigate } from 'react-router'
import { useQueryClient } from '@tanstack/react-query'

interface FormDataWaliProps {
    initialData?: WaliData | null
    nik: string
}

const formSchema = z.object({
    nama_wali: z.string().min(1, 'Nama Wali tidak boleh kosong'),
    no_hp: z.string().min(1, 'No. HP Wali tidak boleh kosong'),
    pekerjaan: z.string().min(1, 'Pekerjaan tidak boleh kosong'),
})

export default function FormDataWali({ initialData, nik }: FormDataWaliProps) {
    const navigate = useNavigate()

    const pekerjaan = [
        { label: 'Dokter', value: 'dokter' },
        { label: 'Guru', value: 'guru' },
        { label: 'Petani', value: 'petani' },
        { label: 'Nelayan', value: 'nelayan' },
        { label: 'Programmer', value: 'programmer' },
        { label: 'Desainer', value: 'desainer' },
        { label: 'Pengusaha', value: 'pengusaha' },
        { label: 'Karyawan Swasta', value: 'karyawan_swasta' },
        { label: 'Pegawai Negeri', value: 'pegawai_negeri' },
        { label: 'Mahasiswa', value: 'mahasiswa' },
        { label: 'Pelajar', value: 'pelajar' },
        { label: 'Ibu Rumah Tangga', value: 'ibu_rumah_tangga' },
        { label: 'Wiraswasta', value: 'wiraswasta' },
        { label: 'Buruh', value: 'buruh' },
        { label: 'Pengangguran', value: 'pengangguran' },
    ] as const

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nama_wali: initialData?.nama_wali || '',
            no_hp: initialData?.no_hp || '',
            pekerjaan: initialData?.pekerjaan || '',
        },
    })

    const mutation = useSaveWaliData()
    const queryClient = useQueryClient()

    function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const formData = new FormData()

            // Append all fields
            formData.append('nik_anak', nik)
            formData.append('nama_wali', values.nama_wali || '')
            formData.append('no_hp', values.no_hp || '')
            formData.append('pekerjaan', values.pekerjaan || '')

            // Execute mutation
            mutation.mutate(formData, {
                onSuccess: () => {
                    toast.success('Data berhasil disimpan')
                    queryClient.invalidateQueries({ queryKey: ['anakList'] })
                    queryClient.invalidateQueries({
                        queryKey: ['wali-data', nik],
                    })
                    navigate(`/dashboard/anak/${nik}/data-sekolah`)
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
                    name="nama_wali"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nama Wali</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="contoh : Juliansyah"
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
                    name="no_hp"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>No. HP Wali</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="contoh: 083175087XXX"
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
                    name="pekerjaan"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Pekerjaan :</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            className={cn(
                                                'w-full justify-between',
                                                !field.value &&
                                                    'text-muted-foreground'
                                            )}
                                        >
                                            {field.value
                                                ? pekerjaan.find(
                                                      (kerja) =>
                                                          kerja.value ===
                                                          field.value
                                                  )?.label
                                                : 'Pilih Pekerjaan'}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0">
                                    <Command>
                                        <CommandInput placeholder="Cari Pekerjaan..." />
                                        <CommandList>
                                            <CommandEmpty>
                                                Pekerjaan Tidak Ditemukan.
                                            </CommandEmpty>
                                            <CommandGroup>
                                                {pekerjaan.map((kerja) => (
                                                    <CommandItem
                                                        value={kerja.label}
                                                        key={kerja.value}
                                                        onSelect={() => {
                                                            form.setValue(
                                                                'pekerjaan',
                                                                kerja.value
                                                            )
                                                        }}
                                                    >
                                                        <Check
                                                            className={cn(
                                                                'mr-2 h-4 w-4',
                                                                kerja.value ===
                                                                    field.value
                                                                    ? 'opacity-100'
                                                                    : 'opacity-0'
                                                            )}
                                                        />
                                                        {kerja.label}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-center md:justify-end">
                    <Button type="submit" className="w-full md:w-fit">
                        Simpan Data
                    </Button>
                </div>
            </form>
        </Form>
    )
}
