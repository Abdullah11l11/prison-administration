import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell } from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { CardContent } from "./card.component";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type DynamicBarChartProps = {
  title?: string;
  data: {
    status: string;
    label: string;
    value: number;
    fill: string;
  }[];
  config: ChartConfig;
  ranges?: { label: string; value: string }[];
  defaultRange?: string;
};

const ChartBarActive = ({
  title = "إحصائيات",
  data,
  config,
  ranges = [
    { label: "آخر أسبوع", value: "week" },
    { label: "آخر شهر", value: "month" },
    { label: "آخر سنة", value: "year" },
  ],
  defaultRange = "month",
}: DynamicBarChartProps) => {
  return (
    <CardContent className="space-y-6" dir="rtl">
      <div className="flex items-center justify-between">
        <h3 className="text-caption-small font-bold text-text-primary-500">
          {title}
        </h3>

        <Select defaultValue={defaultRange}>
          <SelectTrigger className="sm:min-w-7">
            <SelectValue placeholder="اختر المدة" />
          </SelectTrigger>
          <SelectContent>
            {ranges.map((r) => (
              <SelectItem key={r.value} value={r.value}>
                {r.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <ChartContainer config={config} className="sm:h-50 w-full">
        <BarChart data={data} barSize={30}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tickMargin={16}
          />
          <YAxis
            orientation="right"
            tickLine={false}
            axisLine={false}
            tickMargin={16}
          />
          <ChartTooltip
            cursor={{ fillOpacity: 0.1 }}
            content={<ChartTooltipContent />}
          />
          <Bar dataKey="value" radius={12}>
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ChartContainer>
    </CardContent>
  );
};

export default ChartBarActive;
