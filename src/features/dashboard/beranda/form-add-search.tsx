import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

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
import { useNavigate } from 'react-router'

const FormSchema = z.object({
    nama: z.string(),
    nik: z.string().min(2, {
        message: 'NIK must be at least 2 characters.',
    }),
})

export function FormCariAnak() {
    const navigate = useNavigate()
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            nama: '',
            nik: '',
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data)
        navigate(`/dashboard/anak/${data.nik}/data-anak`)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="nama"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nama Anak</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="contoh: Juliansyah"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="nik"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>NIK</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="contoh: 123456789"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div>
                    <Button type="submit" className="w-full">
                        Cari Data Anak
                    </Button>
                </div>
            </form>
        </Form>
    )
}
