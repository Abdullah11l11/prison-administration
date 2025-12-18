import { Badge } from "@/components/ui/badge";

const doneStatuses = ["تم التسليم", "مدفوع", "متوفر"];
const canceledStatuses = ["ملغي", "غير مدفوع", "غير متوفر"];
const pendingStatuses = ["قيد الانتظار"];
const pendingDeliveryStatuses = ["قيد التسليم"];
const inProgressStatuses = ["تتم الآن"];

export const GetStatusBadge = ({ status }: { status: string }) => {
  if (doneStatuses.includes(status)) {
    return <Badge variant="done">{status}</Badge>;
  } else if (canceledStatuses.includes(status)) {
    return <Badge variant="canceled">{status}</Badge>;
  } else if (pendingStatuses.includes(status)) {
    return <Badge variant="pending">{status}</Badge>;
  } else if (pendingDeliveryStatuses.includes(status)) {
    return <Badge variant="pending-delivery">{status}</Badge>;
  } else if (inProgressStatuses.includes(status)) {
    return <Badge variant="done-now">{status}</Badge>;
  }

  return (
    <Badge variant="pending" className="bg-gray-100 text-gray-800">
      {status}
    </Badge>
  );
};
