import { useMemo } from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
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

export const description = "Area Chart adaptado para ChartDataType"

interface AreaChartComponentProps {
  data?: ChartDataType
}

export const AreaChartComponent = ({ data }: AreaChartComponentProps) => {
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
          <CardTitle>Desempenho semanal</CardTitle>
          <CardDescription>
            Comparativo da semana anterior com a atual
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={formattedData} margin={{ left: 12, right: 12 }}><defs>
              <linearGradient id="fillLastWeek" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--chart-2)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--chart-2)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillThisWeek" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--chart-1)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--chart-1)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              padding={{ left: 20, right: 20 }}
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

              <Area
                key={data?.datasets?.[1].label}
                type="monotone"
                dataKey={data?.datasets?.[1].label ?? ''}
                stroke={`var(--chart-2)`}
                fill={`url(#fillLastWeek`}
                fillOpacity={1}
                strokeWidth={2}
                dot={false}
                isAnimationActive={true}
              />

              <Area
                key={data?.datasets?.[0].label}
                type="monotone"
                dataKey={data?.datasets?.[0].label ?? ''}
                stroke={`var(--chart-1)`}
                fill={`url(#fillThisWeek`}
                fillOpacity={1}
                strokeWidth={2}
                dot={false}
                isAnimationActive={true}
              />

            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
