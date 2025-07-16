import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { AlertCircle, User, Mail, Phone, MapPin, Users } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Link } from 'react-router'
import { useSaveProfil } from '@/api/profile'
import { toast } from 'sonner'

// Zod schema for validation
const userSchema = z.object({
    nama_lengkap: z.string().min(2, 'Nama lengkap minimal 2 karakter'),
    jenis_kelamin: z.string().min(1, 'Jenis kelamin harus dipilih'),
    alamat: z.string().min(10, 'Alamat minimal 10 karakter'),
    mobile: z
        .string()
        .regex(/^(\+62|62|0)[0-9]{9,13}$/, 'Format nomor handphone tidak valid')
        .min(10, 'Nomor handphone minimal 10 digit'),
    email: z.string().email('Format email tidak valid'),
})

type UserFormData = z.infer<typeof userSchema>

interface UserFormCardProps {
    initialData?: Partial<UserFormData>
}

export default function UserFormCard({ initialData }: UserFormCardProps) {
    const queryClient = useQueryClient()

    const form = useForm<UserFormData>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            nama_lengkap: '',
            jenis_kelamin: undefined,
            alamat: '',
            mobile: '',
            email: '',
            ...initialData,
        },
    })

    const mutation = useSaveProfil()

    const onSubmit = (data: UserFormData) => {
        const formData = new FormData()
        formData.append('nama_lengkap', data.nama_lengkap)
        formData.append('jenis_kelamin', data.jenis_kelamin)
        formData.append('alamat', data.alamat)
        formData.append('mobile', data.mobile)
        formData.append('email', data.email)
        mutation.mutate(formData, {
            onSuccess: () => {
                toast.success('Data berhasil disimpan')
                queryClient.invalidateQueries({ queryKey: ['profile'] })
            },
            onError: (error) => {
                toast.error(error.message)
            },
        })
    }

    return (
        <div className="max-w-2xl mx-auto p-6">
            <Card className="shadow-lg">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
                        <User className="w-6 h-6" />
                        Form Data Pengguna
                    </CardTitle>
                    <CardDescription className="text-center">
                        Lengkapi informasi pribadi Anda dengan benar
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            {/* Two Column Layout for Nama Lengkap and Jenis Kelamin */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Nama Lengkap */}
                                <FormField
                                    control={form.control}
                                    name="nama_lengkap"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm font-medium flex items-center gap-2">
                                                <User className="w-4 h-4" />
                                                Nama Lengkap
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Masukkan nama lengkap"
                                                    className={cn(
                                                        form.formState.errors
                                                            .nama_lengkap &&
                                                            'border-red-500'
                                                    )}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className="flex items-center gap-1 text-red-500 text-sm">
                                                {form.formState.errors
                                                    .nama_lengkap && (
                                                    <>
                                                        <AlertCircle className="w-4 h-4" />
                                                        {
                                                            form.formState
                                                                .errors
                                                                .nama_lengkap
                                                                .message
                                                        }
                                                    </>
                                                )}
                                            </FormMessage>
                                        </FormItem>
                                    )}
                                />

                                {/* Jenis Kelamin */}
                                <FormField
                                    control={form.control}
                                    name="jenis_kelamin"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm font-medium flex items-center gap-2">
                                                <Users className="w-4 h-4" />
                                                Jenis Kelamin
                                            </FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger
                                                        className={cn(
                                                            'w-full',
                                                            form.formState
                                                                .errors
                                                                .jenis_kelamin &&
                                                                'border-red-500'
                                                        )}
                                                    >
                                                        <SelectValue placeholder="Pilih jenis kelamin" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="Laki-Laki">
                                                        Laki-laki
                                                    </SelectItem>
                                                    <SelectItem value="Perempuan">
                                                        Perempuan
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage className="flex items-center gap-1 text-red-500 text-sm">
                                                {form.formState.errors
                                                    .jenis_kelamin && (
                                                    <>
                                                        <AlertCircle className="w-4 h-4" />
                                                        {
                                                            form.formState
                                                                .errors
                                                                .jenis_kelamin
                                                                .message
                                                        }
                                                    </>
                                                )}
                                            </FormMessage>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Alamat - Full Width */}
                            <FormField
                                control={form.control}
                                name="alamat"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium flex items-center gap-2">
                                            <MapPin className="w-4 h-4" />
                                            Alamat
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Masukkan alamat lengkap"
                                                className={cn(
                                                    'resize-none',
                                                    form.formState.errors
                                                        .alamat &&
                                                        'border-red-500'
                                                )}
                                                rows={3}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="flex items-center gap-1 text-red-500 text-sm">
                                            {form.formState.errors.alamat && (
                                                <>
                                                    <AlertCircle className="w-4 h-4" />
                                                    {
                                                        form.formState.errors
                                                            .alamat.message
                                                    }
                                                </>
                                            )}
                                        </FormMessage>
                                    </FormItem>
                                )}
                            />

                            {/* Two Column Layout for Mobile and Email */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Mobile */}
                                <FormField
                                    control={form.control}
                                    name="mobile"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm font-medium flex items-center gap-2">
                                                <Phone className="w-4 h-4" />
                                                Nomor Handphone
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Contoh: 08123456789"
                                                    className={cn(
                                                        form.formState.errors
                                                            .mobile &&
                                                            'border-red-500'
                                                    )}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className="flex items-center gap-1 text-red-500 text-sm">
                                                {form.formState.errors
                                                    .mobile && (
                                                    <>
                                                        <AlertCircle className="w-4 h-4" />
                                                        {
                                                            form.formState
                                                                .errors.mobile
                                                                .message
                                                        }
                                                    </>
                                                )}
                                            </FormMessage>
                                        </FormItem>
                                    )}
                                />

                                {/* Email */}
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm font-medium flex items-center gap-2">
                                                <Mail className="w-4 h-4" />
                                                Email
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="email"
                                                    placeholder="contoh@email.com"
                                                    className={cn(
                                                        form.formState.errors
                                                            .email &&
                                                            'border-red-500'
                                                    )}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className="flex items-center gap-1 text-red-500 text-sm">
                                                {form.formState.errors
                                                    .email && (
                                                    <>
                                                        <AlertCircle className="w-4 h-4" />
                                                        {
                                                            form.formState
                                                                .errors.email
                                                                .message
                                                        }
                                                    </>
                                                )}
                                            </FormMessage>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="mt-4 flex gap-2">
                                <Button type="button" variant="outline" asChild>
                                    <Link to="/dashboard/profil">Kembali</Link>
                                </Button>
                                <Button
                                    type="submit"
                                    className="flex-1"
                                    disabled={mutation.isPending}
                                >
                                    {mutation.isPending
                                        ? 'Menyimpan...'
                                        : 'Simpan Data'}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
