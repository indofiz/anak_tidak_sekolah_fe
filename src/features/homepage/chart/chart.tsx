'use client'

import {
    Bar,
    BarChart,
    CartesianGrid,
    LabelList,
    Rectangle,
    ResponsiveContainer,
    XAxis,
} from 'recharts'

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart'
import { useQuery } from '@tanstack/react-query'
import {
    AnakTidakSekolahKecamatanResponse,
    fetchDataKecamatan,
} from '@/api/kecamatan-data'
import { useMemo } from 'react'
import Loading from '@/components/other/loading'
import { useMediaQuery } from 'react-responsive'

// Simplified chart configuration
const chartConfig = {
    anakTS: {
        label: 'Jumlah Anak',
        color: 'var(--blue-primary)',
    },
} satisfies ChartConfig

// Map kecamatan names to slug format
const kecamatanToSlug = (name: string): string => {
    return name
        .toLowerCase()
        .replace(/\s+/g, '-')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
}

export default function ChartContent() {
    const { data, isFetching, isLoading, isError } = useQuery<
        AnakTidakSekolahKecamatanResponse,
        Error
    >({
        queryKey: ['data-anak-kecamatan'],
        queryFn: () => fetchDataKecamatan(),
        retry: false,
    })

    const isDesktop = useMediaQuery({
        query: '(min-width: 768px)',
    })

    // Transform API data to chart format
    const chartData = useMemo(() => {
        if (!data?.data) return []

        return data.data.map((item) => ({
            district: kecamatanToSlug(item.kecamatan),
            kecamatan: item.kecamatan,
            anakTS: item.total,
            fill: 'var(--blue-primary)',
        }))
    }, [data])

    // Find the maximum value for highlighting
    const maxValue = useMemo(() => {
        if (!chartData.length) return 0
        return Math.max(...chartData.map((item) => item.anakTS))
    }, [chartData])

    if (isLoading || isFetching) {
        return (
            <div className="flex h-full items-center justify-center">
                <div className="text-center p-8">
                    <Loading text="Memuat Data ..." size="sm" color="gray" />
                </div>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="flex h-full items-center justify-center">
                <div className="text-center text-red-500">
                    Gagal memuat data
                </div>
            </div>
        )
    }

    if (!chartData.length) {
        return (
            <div className="flex h-full items-center justify-center">
                <div className="text-center">Tidak ada data yang tersedia</div>
            </div>
        )
    }

    return (
        <ChartContainer config={chartConfig} className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    accessibilityLayer
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
                >
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="district"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        interval={0}
                        angle={isDesktop ? 0 : -90}
                        textAnchor={isDesktop ? 'middle' : 'end'}
                        height={60}
                        tickFormatter={(value, index) => {
                            return chartData[index]?.kecamatan || value
                        }}
                    />
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                    />
                    <Bar
                        dataKey="anakTS"
                        strokeWidth={2}
                        radius={[8, 8, 0, 0]}
                        activeBar={({ ...props }) => (
                            <Rectangle
                                {...props}
                                fillOpacity={0.8}
                                stroke={props.fill}
                                strokeDasharray={4}
                                strokeDashoffset={4}
                            />
                        )}
                        // Custom bar shape for highlighting max value
                        shape={({ ...props }) => {
                            const { fill, x, y, width, height, anakTS } = props
                            const isMax = anakTS === maxValue && maxValue > 0

                            return (
                                <g>
                                    <Rectangle
                                        x={x}
                                        y={y}
                                        width={width}
                                        height={height}
                                        fill={fill}
                                        radius={[8, 8, 0, 0]}
                                    />
                                    {isMax && (
                                        <Rectangle
                                            x={x}
                                            y={y}
                                            width={width}
                                            height={height}
                                            fill="none"
                                            stroke={fill}
                                            strokeDasharray="4 4"
                                            strokeWidth={2}
                                            radius={[8, 8, 0, 0]}
                                        />
                                    )}
                                </g>
                            )
                        }}
                    >
                        <LabelList
                            dataKey="anakTS"
                            position="top"
                            className="fill-foreground text-xs"
                            formatter={(value: number) =>
                                value > 0 ? value : ''
                            }
                        />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </ChartContainer>
    )
}
