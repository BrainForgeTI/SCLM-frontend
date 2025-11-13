"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A line chart with a label"

const chartConfig = {
  'domingo': { label: "Domingo", color: "var(--chart-1)" },
  'segunda': { label: "Segunda", color: "var(--chart-2)" },
  'terça': { label: "Terça", color: "var(--chart-3)" },
  'quarta': { label: "Quarta", color: "var(--chart-4)" },
  'quinta': { label: "Quinta", color: "var(--chart-5)" },
  'sexta': { label: "Sexta", color: "var(--chart-6)" },
  'sábado': { label: "Sábado", color: "var(--chart-7)" },
} satisfies ChartConfig

interface LineChartComponentProps {
  data?: any
}

export function LineChartComponent({ data }: LineChartComponentProps) {
  const hourlyGraph = data || {
    labels: Array.from({ length: 24 }, (_, i) => i.toString()),
    datasets: [
      { label: "Domingo", data: Array(24).fill(0) },
      { label: "Segunda", data: Array(24).fill(0) },
      { label: "Terça", data: Array(24).fill(0) },
      { label: "Quarta", data: Array(24).fill(0) },
      { label: "Quinta", data: Array(24).fill(0) },
      { label: "Sexta", data: Array(24).fill(0) },
      { label: "Sábado", data: Array(24).fill(0) },
    ],
  }

    const chartData = hourlyGraph.labels.map((hour, index) => {
    const entry: any = { hora: hour }
    hourlyGraph.datasets.forEach((d) => {
      const key = d.label.toLowerCase()
      entry[key] = d.data[index]
    })
    return entry
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Conclusão diária de missões</CardTitle>
        <CardDescription>Quantidade de missões concluídas por horário</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            data={chartData}
            margin={{
              top: 20,
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="hora"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `${value}h`}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />

            {hourlyGraph.datasets.map((d) => (
              <Line
                key={d.label}
                dataKey={d.label.toLowerCase()}
                type="monotone"
                stroke={`var(--color-${d.label.toLowerCase()})`}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 5 }}
              />
            ))}
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
