import React, { useEffect } from 'react'
import { Search, Users } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

import { format } from 'date-fns'
import { useAuthStore } from '@/store/login-store'
import { exportExcel } from '@/api/url'

// Function to convert object to query string
const objectToQueryString = (obj: Record<string, unknown>) => {
    return (
        Object.entries(obj)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .filter(([_, value]) => value !== undefined && value !== '')
            .map(
                ([key, value]) =>
                    `${encodeURIComponent(key)}=${encodeURIComponent(
                        String(value)
                    )}`
            )
            .join('&')
    )
}

//create variable to make date now to filename
const dateNow = format(new Date(), 'dd-MM-yyyy-HH:mm:ss')

// Zod validation schema
const formSchema = z
    .object({
        parameter: z.string().optional(),
        per_page: z
            .string()
            .refine((val) => val === 'all' || /^\d+$/.test(val), {
                message: 'Harus berupa angka atau "semua"',
            }),
        page: z
            .string()
            .optional()
            .refine(
                (val) => {
                    if (!val) return true
                    return /^\d+$/.test(val) && parseInt(val) > 0
                },
                {
                    message: 'Harus lebih besar dari 0',
                }
            ),
        is_old: z.boolean(),
    })
    .refine(
        (data) => {
            if (data.per_page !== 'all') {
                return !!data.page && data.page.trim() !== ''
            }
            return true
        },
        {
            message: 'Harus diisi jika per page bukan "semua"',
            path: ['page'],
        }
    )

type FilterExportData = z.infer<typeof formSchema>

const FilterExport: React.FC = () => {
    const form = useForm<FilterExportData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            parameter: '',
            per_page: '100',
            page: '1',
            is_old: false,
        },
    })

    const per_page = form.watch('per_page')
    const { user } = useAuthStore()

    const isSubmitting = form.formState.isSubmitting

    // Auto-clear page when per_page changes to 'all'
    useEffect(() => {
        if (per_page === 'all') {
            form.setValue('page', '')
            form.clearErrors('page')
        } else if (!form.getValues('page')) {
            form.setValue('page', '1')
        }
    }, [per_page, form])

    const onSubmit = async (data: FilterExportData) => {
        // Clean up data before submission
        const cleanData = {
            ...data,
            per_page: data.per_page === 'all' ? '' : parseInt(data.per_page),
            page: data.per_page === 'all' ? '' : data.page,
            is_old: data.is_old ? 1 : 0,
        }

        // Generate query string
        const queryString = objectToQueryString(cleanData)
        const apiUrl = `${exportExcel}?${queryString}`

        try {
            // Fetch the Excel file
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Token: user?.token || '',
                    // Add any required headers (e.g., Authorization)
                },
            })

            if (!response.ok) {
                throw new Error('Failed to download file')
            }

            // Get the blob from response
            const blob = await response.blob()

            // Create a URL for the blob
            const url = window.URL.createObjectURL(blob)

            // Create a temporary anchor element to trigger download
            const a = document.createElement('a')
            a.href = url
            a.download = dateNow + '-export.xlsx' // Set your desired filename
            document.body.appendChild(a)
            a.click()

            // Clean up
            window.URL.revokeObjectURL(url)
            document.body.removeChild(a)
        } catch (error) {
            console.error('Error downloading file:', error)
            // Handle error (e.g., show a toast notification)
        }
    }

    const handleReset = () => {
        form.reset()
    }

    const showPageField = per_page !== 'all'

    return (
        <div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6 mt-4"
                >
                    {/* Search Parameter */}
                    <FormField
                        control={form.control}
                        name="parameter"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex items-center gap-2">
                                    <Search className="w-4 h-4" />
                                    Cari Nama atau NIK
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="contoh: Julian"
                                        className="w-full"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Full-width Per Page Select */}
                    <FormField
                        control={form.control}
                        name="per_page"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tampilkan Berapa Anak?</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select items per page" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="5">
                                            5 anak
                                        </SelectItem>
                                        <SelectItem value="10">
                                            10 anak
                                        </SelectItem>
                                        <SelectItem value="20">
                                            20 anak
                                        </SelectItem>
                                        <SelectItem value="50">
                                            50 anak
                                        </SelectItem>
                                        <SelectItem value="100">
                                            100 anak
                                        </SelectItem>
                                        <SelectItem value="all">
                                            Semua Anak
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Conditional Page Field */}
                    {showPageField && (
                        <FormField
                            control={form.control}
                            name="page"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Halaman</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="number"
                                            min="1"
                                            placeholder="Masukan halaman..."
                                            className="w-full"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}

                    {/* Age Filter */}
                    <FormField
                        control={form.control}
                        name="is_old"
                        render={({ field }) => (
                            <FormItem className="flex flex-col pt-1">
                                <FormLabel>Umur Filter</FormLabel>
                                <div className="flex items-center space-x-2">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal cursor-pointer flex items-center gap-1">
                                        <Users className="w-4 h-4" />
                                        Tampilkan hanya anak (18+)
                                    </FormLabel>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Form Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 w-full sm:w-auto"
                        >
                            {isSubmitting ? 'Mengunduh...' : 'Unduh Excel'}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleReset}
                            disabled={isSubmitting}
                            className="flex-1 w-full sm:w-auto"
                        >
                            Reset Filter
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default FilterExport
