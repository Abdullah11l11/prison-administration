import { Pie, PieChart } from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CardContent } from "./card.component";

export const description = "Donut chart - most requested services";

export interface DonutItem extends Record<string, unknown> {
  browser: string;
  label: string;
  visitors: number;
  fill: string;
}

interface ChartPieDonutProps {
  data: DonutItem[];
}
const ChartPieDonut = ({ data }: ChartPieDonutProps) => {
  const chartConfig = data.reduce(
    (acc, item) => {
      acc[item.browser] = {
        label: item.label,
        color: item.fill,
      };
      return acc;
    },
    {
      visitors: { label: "النسبة" },
    } as ChartConfig
  );

  return (
    <CardContent className="h-full flex flex-col gap-4">
      <h3 className="text-caption-small font-bold text-text-primary-500">
        الخدمات الأكثر طلبًا
      </h3>

      <div className="flex-1 flex-between flex-col sm:flex-row px-5 gap-6">
        {/* Pie Chart */}
        <div className="size-30 flex justify-center relative">
          <ChartContainer
            config={chartConfig}
            className="flex items-center justify-center gap-10"
          >
            <PieChart width={120} height={120}>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={data}
                dataKey="visitors"
                nameKey="label"
                innerRadius={25}
                outerRadius={60}
                strokeWidth={1}
                cornerRadius={10}
                paddingAngle={3}
              />
            </PieChart>
          </ChartContainer>
        </div>

        {/* Legend */}
        <div className="flex w-full flex-col flex-1 gap-4 text-right">
          {data.map((item) => (
            <div
              key={item.browser}
              className="flex flex-row text-sm text-text-primary-500 justify-between items-center gap-2"
            >
              <div className="flex items-center">
                <div className="flex justify-center size-4 items-center ">
                  <span
                    className="h-1.5 w-1.5 shrink-0 inline-block rounded-full"
                    style={{ backgroundColor: item.fill }}
                  />
                </div>
                <p>{item.label}</p>
              </div>
              <div>{item.visitors}%</div>
            </div>
          ))}
        </div>
      </div>
    </CardContent>
  );
};

export default ChartPieDonut;
