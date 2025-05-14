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
    { jenjang: 'SD Sederajat', anak: 300 },
    { jenjang: 'SMP Sederajat', anak: 140 },
    { jenjang: 'SMA Sederajat', anak: 237 },
]

const chartConfig = {
    anak: {
        label: 'Anak',
        color: 'var(--yellow-primary)',
    },
} satisfies ChartConfig

export function ChartJenjang() {
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
                        margin={{
                            top: 20,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="jenjang"
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
