import { CardContent, CardHeader } from "@/components/shared/card.component";

const StatsSummaryCard = ({
  label,
  value,
}: {
  label: string;
  value: number;
}) => {
  return (
    <CardContent>
      <CardHeader className="text-heading-h3 text-text-secondary">
        {label}
      </CardHeader>
      <p className="text-text-primary-500 text-heading-h3 font-bold">{value}</p>
    </CardContent>
  );
};

export default StatsSummaryCard;
