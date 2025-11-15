"use client"

import { useMemo } from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { ChartDataType } from "@/types/metrics/chart-data-type"

export const description = "Bar Chart adaptado para ChartDataType"

interface BarChartComponentProps {
  data?: ChartDataType
}

export const BarChartComponent = ({ data }: BarChartComponentProps) => {
  const formattedData = useMemo(() => {
    if (!data) return []

    const { labels, datasets } = data
    return labels.map((label, i) => {
      const point: Record<string, any> = { label }
      datasets.forEach((dataset) => {
        point[dataset.label] = dataset.data[i]
      })
      return point
    })
  }, [data])

  const chartConfig: ChartConfig = useMemo(() => {
    if (!data?.datasets) return {}
    const palette = [
      "var(--chart-1)",
      "var(--chart-2)",
      "var(--chart-3)",
      "var(--chart-4)",
      "var(--chart-5)",
    ]
    return data.datasets.reduce((acc, dataset, i) => {
      acc[dataset.label] = {
        label: dataset.label,
        color: palette[i % palette.length],
      }
      return acc
    }, {} as ChartConfig)
  }, [data])

  return (
    <Card className="pt-0">
      <CardHeader className="border-b py-5">
        <div className="grid gap-1">
          <CardTitle>Missões</CardTitle>
          <CardDescription>
            Comparativo semanal das missões concluídas
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart data={formattedData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              padding={{ left: 20, right: 20 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => `${value}`}
                  indicator="dot"
                />
              }
            />

            {data?.datasets?.map((dataset) => (
              <Bar
                key={dataset.label}
                dataKey={dataset.label}
                fill={`var(--chart-7)`}
                radius={4}
              />
            ))}

            <ChartLegend content={<ChartLegendContent />} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
