import { PageLayout, PageTitle } from "../../components/PageLayout";
import { AreaChartComponent } from "./components/area-chart";
import { BarChartComponent } from "./components/bar-chart";
import { LineChartComponent } from "./components/line-chart";
import { useAdventure } from "./hooks/use-adventure";

const AdventurePage = () => {
  const { states: { data } } = useAdventure()

  const lineData = data?.graph[0]
  const areaData = data?.graph[1]
  const barData = data?.graph[2]

  return (
    <PageLayout>
      <div className="w-full">
        <PageTitle title={"Métricas"} />

        <div className="flex flex-col gap-2 mb-5">
          <p>{data?.insights[0]}</p>
          <p>{data?.insights[1]}</p>
          <p>{data?.insights[2]}</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <BarChartComponent data={barData} />
            <AreaChartComponent data={areaData} />
          </div>
          <LineChartComponent data={lineData} />
        </div>
      </div>
    </PageLayout>
  );
};

export default AdventurePage;
