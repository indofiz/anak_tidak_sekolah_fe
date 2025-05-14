import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
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

const formSchema = z.object({
    nomor_induk_kependudukan: z.string().min(1),
    nama_lengkap: z.string().min(1),
    nisn: z.string().min(1),
    tempat_lahir: z.string().min(1),
    tanggal_lahir: z.coerce.date(),
    kelamin: z.string(),
    alamat_ktp_kk: z.string(),
    domisili: z.string(),
    kategori: z.string(),
    sub_kategori: z.string(),
})

export default function FormDataAnak() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            tanggal_lahir: new Date(),
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
                </pre>
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
                    name="nomor_induk_kependudukan"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nomor Induk Kependudukan</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="contoh: 029392133213"
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
                    name="nama_lengkap"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nama Lengkap</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Nama Lengkap"
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
                    name="nisn"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>NISN</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="contoh : 120021323213"
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
                    name="tempat_lahir"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tempat Lahir</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="contoh: Gabek 1"
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
                    name="tanggal_lahir"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Tanggal Lahir</FormLabel>
                            <DatetimePicker
                                {...field}
                                format={[
                                    ['months', 'days', 'years'],
                                    ['hours', 'minutes', 'am/pm'],
                                ]}
                            />

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="kelamin"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Jenis Kelamin</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Pilih Jenis Kelamin" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="laki-laki">
                                        Laki - Laki
                                    </SelectItem>
                                    <SelectItem value="perempuan">
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
                    name="alamat_ktp_kk"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Alamat KTP/KK</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="contoh: gabek 1"
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="domisili"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Alamat Domisili</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="contoh : Gabek 1"
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="kategori"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Kategori Pendataan</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Pilih Kategori Pendataan" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="m@example.com">
                                        m@example.com
                                    </SelectItem>
                                    <SelectItem value="m@google.com">
                                        m@google.com
                                    </SelectItem>
                                    <SelectItem value="m@support.com">
                                        m@support.com
                                    </SelectItem>
                                </SelectContent>
                            </Select>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="sub_kategori"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Sub Kategori Pendataan</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Pilih Sub Kategori Pendataan" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="m@example.com">
                                        m@example.com
                                    </SelectItem>
                                    <SelectItem value="m@google.com">
                                        m@google.com
                                    </SelectItem>
                                    <SelectItem value="m@support.com">
                                        m@support.com
                                    </SelectItem>
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
