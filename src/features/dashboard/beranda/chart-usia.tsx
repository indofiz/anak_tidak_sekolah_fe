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
const chartData = [
    { usia: '5-6 Tahun', anak: 186 },
    { usia: '7-18 Tahun', anak: 305 },
    { usia: '≥ 18 Tahun', anak: 237 },
]

const chartConfig = {
    anak: {
        label: 'Anak',
        color: 'var(--blue-primary)',
    },
} satisfies ChartConfig

export function ChartUsia() {
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
                        margin={{
                            top: 20,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="usia"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="anak" fill="var(--color-anak)" radius={8}>
                            <LabelList
                                position="top"
                                offset={12}
                                className="fill-foreground"
                                fontSize={12}
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
