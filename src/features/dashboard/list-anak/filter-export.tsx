import React from 'react'
import { Users } from 'lucide-react'
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
import { Checkbox } from '@/components/ui/checkbox'

import { format } from 'date-fns'
import { useAuthStore } from '@/store/login-store'
import { exportExcel } from '@/api/url'
import useFilterAnak from '@/store/filter-anak-store'

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
const formSchema = z.object({
    is_old: z.boolean(),
})

type FilterExportData = z.infer<typeof formSchema>

const FilterExport: React.FC = () => {
    const { is_old } = useFilterAnak()
    const form = useForm<FilterExportData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            is_old: is_old === 1,
        },
    })

    const { user } = useAuthStore()

    const isSubmitting = form.formState.isSubmitting

    const onSubmit = async (data: FilterExportData) => {
        // Clean up data before submission
        const cleanData = {
            ...data,
            per_page: '',
            page: '',
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

    return (
        <div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6 mt-4"
                >
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
