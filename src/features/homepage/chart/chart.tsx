import {
    Bar,
    BarChart,
    CartesianGrid,
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

const chartData = [
    { district: 'bukit-intan', visitors: 187, fill: 'var(--blue-primary)' },
    { district: 'gabek', visitors: 200, fill: 'var(--blue-primary)' },
    { district: 'gerunggang', visitors: 275, fill: 'var(--blue-primary)' },
    { district: 'girimaya', visitors: 173, fill: 'var(--blue-primary)' },
    { district: 'pangkal-balam', visitors: 90, fill: 'var(--blue-primary)' },
    { district: 'rangkui', visitors: 150, fill: 'var(--blue-primary)' },
    { district: 'taman-sari', visitors: 220, fill: 'var(--blue-primary)' },
]

const chartConfig = {
    visitors: {
        label: 'Visitors',
    },
    'bukit-intan': {
        label: 'Bukit Intan',
        color: 'var(--blue-primary)',
    },
    gabek: {
        label: 'Gabek',
        color: 'var(--blue-primary)',
    },
    gerunggang: {
        label: 'Gerunggang',
        color: 'var(--blue-primary)',
    },
    girimaya: {
        label: 'Girimaya',
        color: 'var(--blue-primary)',
    },
    'pangkal-balam': {
        label: 'Pangkal Balam',
        color: 'var(--blue-primary)',
    },
    rangkui: {
        label: 'Rangkui',
        color: 'var(--blue-primary)',
    },
    'taman-sari': {
        label: 'Taman Sari',
        color: 'var(--blue-primary)',
    },
} satisfies ChartConfig

export function ChartContent() {
    return (
        <ChartContainer config={chartConfig} className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart accessibilityLayer data={chartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="district"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) =>
                            chartConfig[value as keyof typeof chartConfig]
                                ?.label
                        }
                    />
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                    />
                    <Bar
                        dataKey="visitors"
                        strokeWidth={2}
                        radius={8}
                        activeIndex={2}
                        activeBar={({ ...props }) => {
                            return (
                                <Rectangle
                                    {...props}
                                    fillOpacity={0.8}
                                    stroke={props.payload.fill}
                                    strokeDasharray={4}
                                    strokeDashoffset={4}
                                />
                            )
                        }}
                    />
                </BarChart>
            </ResponsiveContainer>
        </ChartContainer>
    )
}
