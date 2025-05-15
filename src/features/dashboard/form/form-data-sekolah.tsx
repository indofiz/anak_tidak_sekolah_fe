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

const items = [
    {
        id: 'tidak_mampu_biaya',
        label: 'Tidak mampu biaya sekolah',
    },
    {
        id: 'bekerja',
        label: 'Harus bekerja / membantu orang tua',
    },
    {
        id: 'kurang_minat',
        label: 'Kurang minat belajar',
    },
    {
        id: 'jarak_sekolah',
        label: 'Jarak sekolah terlalu jauh',
    },
    {
        id: 'pernikahan_dini',
        label: 'Menikah di usia dini',
    },
    {
        id: 'disabilitas',
        label: 'Disabilitas atau kebutuhan khusus',
    },
    {
        id: 'tidak_ada_sekolah',
        label: 'Tidak tersedia sekolah di daerahnya',
    },
    {
        id: 'orang_tua_tidak_izinkan',
        label: 'Orang tua tidak mengizinkan',
    },
    {
        id: 'alasan_lain',
        label: 'Alasan lainnya',
    },
] as const

const formSchema = z.object({
    nama_sekolah: z.string().min(1),
    npsn_sekolah: z.string().min(1),
    tingkat: z.string(),
    kelas: z.string().min(1),
    tahun: z.string().min(1),
    items: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: 'You have to select at least one item.',
    }),
})

export default function FormDataSekolah() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            items: ['tidak_mampu_biaya'],
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            console.log(values)
            toast(
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">
                        {JSON.stringify(values, null, 2)}
                    </code>
                </pre>,
                { style: { background: 'green', color: '#fff' } }
            )
        } catch (error) {
            console.error('Form submission error', error)
            toast.error('Failed to submit the form. Please try again.')
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
                                    <SelectItem value="SD Sederajat">
                                        SD Sederajat
                                    </SelectItem>
                                    <SelectItem value="SMP Sederajat">
                                        SMP Sederajat
                                    </SelectItem>
                                    <SelectItem value="SMA Sederajat">
                                        SMA Sederajat
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
                    name="tahun"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tahun</FormLabel>
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
                    name="items"
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
                            {items.map((item) => (
                                <FormField
                                    key={item.id}
                                    control={form.control}
                                    name="items"
                                    render={({ field }) => {
                                        return (
                                            <FormItem
                                                key={item.id}
                                                className="flex flex-row items-start space-x-3 space-y-0"
                                            >
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value?.includes(
                                                            item.id
                                                        )}
                                                        onCheckedChange={(
                                                            checked
                                                        ) => {
                                                            return checked
                                                                ? field.onChange(
                                                                      [
                                                                          ...field.value,
                                                                          item.id,
                                                                      ]
                                                                  )
                                                                : field.onChange(
                                                                      field.value?.filter(
                                                                          (
                                                                              value
                                                                          ) =>
                                                                              value !==
                                                                              item.id
                                                                      )
                                                                  )
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormLabel className="text-sm font-normal">
                                                    {item.label}
                                                </FormLabel>
                                            </FormItem>
                                        )
                                    }}
                                />
                            ))}
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
