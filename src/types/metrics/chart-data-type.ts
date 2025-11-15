export interface ChartDataType {
    labels: string[],
    datasets: {
      label: string,
      data: number[]
    }[]
}
