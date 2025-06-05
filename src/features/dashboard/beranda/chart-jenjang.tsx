'use client'

import { TrendingUp } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart'
import {
    AnakTidakSekolahResponse,
    fetchDataDashboard,
} from '@/api/dashboard-all'
import { useQuery } from '@tanstack/react-query'
import { useAuthStore } from '@/store/login-store'
import Loading from '@/components/other/loading'

// Define type for chart data
type ChartDataItem = {
    jenjang: string
    anak: number
}

const chartConfig = {
    anak: {
        label: 'Anak',
        color: 'var(--yellow-primary)',
    },
} satisfies ChartConfig

export function ChartJenjang() {
    const { user } = useAuthStore()

    const { data, isFetching, isLoading, isError } = useQuery<
        AnakTidakSekolahResponse,
        Error
    >({
        queryKey: ['data-anak-kelurahan'],
        queryFn: () => {
            if (!user?.token) {
                throw new Error('Token tidak tersedia')
            }
            return fetchDataDashboard({
                token: user?.token || '',
            })
        },
        retry: false,
    })

    // Transform API data to chart format
    const chartData: ChartDataItem[] = data?.data.total_tingkat
        ? data.data.total_tingkat.map((item) => ({
              jenjang: item.label,
              anak: parseInt(item.total, 10) || 0,
          }))
        : []

    // Handle loading and empty states
    if (isLoading || isFetching) {
        return (
            <div className="w-full border rounded-lg text-center p-8">
                <Loading text="Memuat Data ..." size="sm" color="gray" />
            </div>
        )
    }

    if (isError) {
        return (
            <div className="text-center p-8 text-red-500">
                Gagal memuat data
            </div>
        )
    }

    if (chartData.length === 0) {
        return (
            <div className="text-center p-8">Tidak ada data yang tersedia</div>
        )
    }

    return (
        <Card className="w-full shadow-none">
            <CardHeader>
                <CardTitle>Grafik Berdasarkan Jenjang Pendidikan</CardTitle>
                <CardDescription>
                    Semua data anak berdasarkan jenjang pendidikan terakhir
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="jenjang"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            // Removed label truncation to show full names
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar
                            dataKey="anak"
                            fill="var(--yellow-primary)"
                            radius={[8, 8, 0, 0]}
                        >
                            <LabelList
                                position="top"
                                offset={12}
                                className="fill-foreground"
                                fontSize={12}
                                formatter={(value: number) =>
                                    value > 0 ? value : ''
                                }
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Data Chart Berdasarkan Rentang Jenjang{' '}
                    <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Menampilkan semua data anak berdasarkan jenjang pada
                    kelurahan anda.
                </div>
            </CardFooter>
        </Card>
    )
}
