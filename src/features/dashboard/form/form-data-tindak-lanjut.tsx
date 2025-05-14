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

const formSchema = z.object({
    bersedia: z.string(),
    program_diikuti: z.string(),
})

export default function FormDataTindakLanjut() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
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
                className="space-y-8 py-2 max-w-md"
            >
                <FormField
                    control={form.control}
                    name="bersedia"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormLabel>
                                Bersedia mengikuti pendidikan informal
                            </FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    className="flex flex-col space-y-1"
                                >
                                    {[
                                        ['Ya', 'ya'],
                                        ['Tidak', 'tidak'],
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

                <FormField
                    control={form.control}
                    name="program_diikuti"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormLabel>Program yang diikuti</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    className="flex flex-col space-y-1"
                                >
                                    {[
                                        ['Paud', 'paud'],
                                        ['Paket A', 'paket_a'],
                                        ['Paket B', 'paket_b'],
                                        ['Paket C', 'paket_c'],
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

                <div className="flex justify-end">
                    <Button type="submit">Simpan Data</Button>
                </div>
            </form>
        </Form>
    )
}
