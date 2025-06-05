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
    usia: string
    anak: number
}

const chartConfig = {
    anak: {
        label: 'Anak',
        color: 'var(--blue-primary)',
    },
} satisfies ChartConfig

// Map API labels to chart labels
const mapApiLabelToChartLabel = (apiLabel: string): string => {
    if (apiLabel.includes('Usia 5 <= 6')) return '5-6 Tahun'
    if (apiLabel.includes('Usia 7 <= 17')) return '7-18 Tahun'
    if (apiLabel.includes('Usia >=18')) return '≥ 18 Tahun'
    return apiLabel
}

export function ChartUsia() {
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
    const chartData: ChartDataItem[] = data?.data.total_usia
        ? data.data.total_usia.map((item) => ({
              usia: mapApiLabelToChartLabel(item.label),
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
                <CardTitle>Grafik Berdasarkan Usia</CardTitle>
                <CardDescription>
                    Semua data anak berdasarkan usia
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
                            dataKey="usia"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar
                            dataKey="anak"
                            fill="var(--blue-primary)"
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
                    Data Chart Berdasarkan Rentang Usia{' '}
                    <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Menampilkan semua data anak berdasarkan usia pada kelurahan
                    anda.
                </div>
            </CardFooter>
        </Card>
    )
}
