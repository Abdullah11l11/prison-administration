import { CardContent, CardHeader } from "@/components/shared/card.component";

const StatsBox = ({
  title,
  count,
}: {
  title: string;
  count: string | number;
}) => {
  return (
    <CardContent>
      <CardHeader>{title}</CardHeader>
      <p className="text-heading-h3 text-text-primary-500 font-bold">{count}</p>
    </CardContent>
  );
};

const BannersStatsSummary = () => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
      <StatsBox count={1111} title="إجمالي الإعلانات" />
      <StatsBox count={111} title="الإعلانات المنتهية" />
      <StatsBox count={11} title="الإعلانات النشطة" />
    </div>
  );
};

export default BannersStatsSummary;
