import { Button } from "@/components/ui/button/button";

const ReviewsPage = () => {
  return (
    <div className="space-y-7 mt-7 *:space-y-2 *:*:text-heading-h3 font-bold text-text-primary-500">
      <div>
        <h3>تحميل تقيمات العملاء</h3>
        <Button size={"sm"}>تحميل</Button>
      </div>
      <div>
        <h3>تحميل تقيمات المحطات</h3>
        <Button size={"sm"}>تحميل</Button>
      </div>
    </div>
  );
};

export default ReviewsPage;
