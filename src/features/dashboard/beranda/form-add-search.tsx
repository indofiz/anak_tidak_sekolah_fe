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
import { toast } from 'sonner'
import { cekNikAnak } from '@/api/url'
import {
    createNik,
    CreateNikError,
    CreateNikParams,
    CreateNikSuccess,
    SearchResponse,
} from '@/api/cari-tambah-anak'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useAuthStore } from '@/store/login-store'
import { UserPen, UserRoundPlus } from 'lucide-react'
import { useState } from 'react'

const searchSchema = z.object({
    nik: z
        .string()
        .min(1, 'NIK harus diisi')
        .regex(/^\d+$/, 'NIK harus berupa angka'),
})

type SearchFormValues = z.infer<typeof searchSchema>

export function FormCariAnak() {
    const [nik, setNik] = useState<string>('')

    const navigate = useNavigate()
    const { user } = useAuthStore()

    if (!user) {
        toast.error('Anda harus login terlebih dahulu')
        navigate('/login')
        return null
    }

    const form = useForm<SearchFormValues>({
        resolver: zodResolver(searchSchema),
        mode: 'onChange',
    })

    const nikValue = form.watch('nik')

    const { data, isFetching, isError, error, refetch } = useQuery<
        SearchResponse,
        Error
    >({
        queryKey: ['search-anak', nikValue],
        queryFn: async () => {
            const response = await fetch(`${cekNikAnak}?nik=${nikValue}`, {
                method: 'GET',
                headers: {
                    Token: user?.token || '',
                },
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || 'Terjadi kesalahan')
            }

            return response.json()
        },
        enabled: false, // Only run when submittedNik has value
        retry: false,
    })

    const mutation = useMutation<
        CreateNikSuccess,
        CreateNikError,
        CreateNikParams
    >({
        mutationFn: createNik,
        onSuccess: (data) => {
            toast.success(data.message)
            navigate(`/dashboard/anak/${nik}/data-anak`)

            form.reset() // Reset the form after successful creation
        },
        onError: (error) => {
            if (error.data?.nik) {
                toast.error(error.data.nik[0])
            } else {
                toast.error(error.message || 'Terjadi kesalahan')
            }
        },
    })

    const onSaveNewAnak = () => {
        if (!nik) {
            toast.error('NIK harus diisi')
            return
        }
        mutation.mutate({
            nik,
            token: user?.token || '',
        })
    }

    const onSubmit = async (data: SearchFormValues) => {
        try {
            setNik(data.nik) // Set the NIK value to state
            await form.trigger() // Manually trigger validation
            // Query will be manually refetched after validation
            await refetch()
        } catch (error) {
            console.error('Validation failed:', error)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isFetching || !!form.formState.errors.nik}
                    >
                        {isFetching ? 'Mencari...' : 'Periksa NIK'}
                    </Button>
                    {isError && (
                        <div className="text-red-600 text-sm text-center mt-2">
                            {error.message}
                        </div>
                    )}
                </div>
                {isError && (
                    <div>
                        {error.message == 'Nik tidak ditemukan' && (
                            <Button
                                className="w-full mt-2"
                                onClick={() => onSaveNewAnak()}
                                disabled={mutation.isPending}
                                variant={'outline'}
                            >
                                <UserRoundPlus className="mr-2 h-4 w-4" />{' '}
                                Tambah Data Anak Baru
                            </Button>
                        )}
                    </div>
                )}
                {data?.status === 200 && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <h3 className="text-base font-semibold mb-4">
                            Hasil Pencarian
                        </h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600">NIK:</span>
                                <span className="text-gray-900">
                                    {data.data?.nik}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Status:</span>
                                <span className="text-gray-900">
                                    {data.data?.status === '0'
                                        ? 'Tidak Aktif'
                                        : 'Aktif'}
                                </span>
                            </div>
                            {/* Add more fields as needed */}
                        </div>
                        <div>
                            <Button
                                className="mt-4 w-full"
                                onClick={() =>
                                    navigate(
                                        `/dashboard/anak/${data.data?.nik}/data-anak`
                                    )
                                }
                                variant={'outline'}
                            >
                                <UserPen className="mr-2 h-4 w-4" />
                                Lihat Detail Anak
                            </Button>
                        </div>
                    </div>
                )}
            </form>
        </Form>
    )
}
