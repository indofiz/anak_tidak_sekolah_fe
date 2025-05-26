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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
    TindakLanjutData,
    useSaveTindakLanjutData,
} from '@/api/data-tindak-lanjut'
import { useNavigate } from 'react-router'
import { useQueryClient } from '@tanstack/react-query'

interface FormDataTindakLanjutProps {
    initialData?: TindakLanjutData | null
    nik: string
}
const formSchema = z.object({
    bersedia: z.string().min(1, {
        message: 'Pilih salah satu opsi',
    }),
    program: z.string().optional(),
    catatan: z.string().optional(),
})

export default function FormDataTindakLanjut({
    initialData,
    nik,
}: FormDataTindakLanjutProps) {
    const navigate = useNavigate()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            bersedia: initialData?.bersedia || '',
            program: initialData?.program || '',
            catatan: initialData?.catatan || '',
        },
    })

    const mutation = useSaveTindakLanjutData()
    const queryClient = useQueryClient()
    const watchBersedia = form.watch('bersedia')

    function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const formData = new FormData()

            // Append all fields
            formData.append('nik_anak', nik)
            formData.append('bersedia', values.bersedia || '')
            formData.append('program', values.program || '')
            formData.append('catatan', values.catatan || '')

            // Execute mutation
            mutation.mutate(formData, {
                onSuccess: () => {
                    toast.success('Data berhasil disimpan')
                    queryClient.invalidateQueries({ queryKey: ['anakList'] })
                    queryClient.invalidateQueries({
                        queryKey: ['tindak-lanjut-data', nik],
                    })
                    navigate(`/dashboard/anak/${nik}/data-anak`)
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
                className="space-y-8 py-2 max-w-md"
            >
                <FormField
                    control={form.control}
                    name="bersedia"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormLabel>
                                Bersedia mengikuti pendidikan nonformal
                            </FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    className="flex flex-col space-y-1"
                                    defaultValue={field.value}
                                >
                                    {[
                                        ['Ya', '1'],
                                        ['Tidak', '0'],
                                    ].map((option, index) => (
                                        <FormItem
                                            className="flex items-center space-x-3 space-y-0"
                                            key={index}
                                        >
                                            <FormControl>
                                                <RadioGroupItem
                                                    value={option[1]}
                                                />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                {option[0]}
                                            </FormLabel>
                                        </FormItem>
                                    ))}
                                </RadioGroup>
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                {watchBersedia === '1' ? (
                    <FormField
                        control={form.control}
                        name="program"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel>Program yang diikuti</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        className="flex flex-col space-y-1"
                                        defaultValue={field.value}
                                    >
                                        {[
                                            ['Paud', 'PAUD'],
                                            ['Paket A', 'A'],
                                            ['Paket B', 'B'],
                                            ['Paket C', 'C'],
                                        ].map((option, index) => (
                                            <FormItem
                                                className="flex items-center space-x-3 space-y-0"
                                                key={index}
                                            >
                                                <FormControl>
                                                    <RadioGroupItem
                                                        value={option[1]}
                                                    />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    {option[0]}
                                                </FormLabel>
                                            </FormItem>
                                        ))}
                                    </RadioGroup>
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                ) : null}

                <FormField
                    control={form.control}
                    name="catatan"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormLabel>Catatan</FormLabel>
                            <FormControl>
                                <textarea
                                    {...field}
                                    placeholder="Masukkan catatan jika ada"
                                    className="w-full p-2 border rounded-md"
                                />
                            </FormControl>

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
