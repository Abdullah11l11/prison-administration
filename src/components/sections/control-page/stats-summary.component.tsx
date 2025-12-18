import StatsSummaryCard from "./stats-summary-card.component";

const StatsSummary = () => {
  return (
    <>
      <StatsSummaryCard label="عدد الزبائن" value={2300} />
      <StatsSummaryCard label="عدد الطلبات" value={2300} />
      <StatsSummaryCard label="عدد الخدمات" value={2300} />
      <StatsSummaryCard label="عدد الإكسسوارات" value={2300} />
    </>
  );
};

export default StatsSummary;
