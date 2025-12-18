import OrdersTable from "@/components/sections/control-page/orders-table.component";
import StatsSummary from "@/components/sections/control-page/stats-summary.component";
import ChartBarActive from "@/components/shared/chart-bar-active.component";
import ChartPieDonut from "@/components/shared/chart-pie-donut.component";

const chartData = [
  { status: "inProgress", label: "قيد الإنجاز", value: 80, fill: "#7A7A7A" }, // medium gray
  { status: "pending", label: "معلقة", value: 150, fill: "#4A4A4A" }, // darker gray
  { status: "completed", label: "مكتملة", value: 230, fill: "#111111" }, // near black
];

const chartConfig = {
  value: { label: "عدد الطلبات" },
  inProgress: { label: "قيد الإنجاز", color: "#7A7A7A" }, // medium gray
  pending: { label: "معلقة", color: "#4A4A4A" }, // dark gray
  completed: { label: "مكتملة", color: "#111111" }, // near black
};

const ControlPage = () => {
  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-x-3 gap-y-6">
      <StatsSummary />
      <div className="sm:col-span-2">
        <ChartBarActive
          title="إحصائيات الطلبات"
          data={chartData}
          config={chartConfig}
        />
      </div>
      <div className="sm:col-span-2">
        <ChartPieDonut
          data={[
            {
              browser: "external",
              label: "غسيل خارجي",
              visitors: 52.1,
              fill: "#4A4A4A", // dark gray
            },
            {
              browser: "interior",
              label: "غسيل داخلي",
              visitors: 22.8,
              fill: "#111111", // near black
            },
            {
              browser: "deep",
              label: "غسيل عميق",
              visitors: 13.9,
              fill: "#7A7A7A", // medium gray
            },
            {
              browser: "other",
              label: "أخرى",
              visitors: 11.2,
              fill: "#9A9A9A", // light gray
            },
          ]}
        />
      </div>
      <OrdersTable />
    </div>
  );
};

export default ControlPage;
