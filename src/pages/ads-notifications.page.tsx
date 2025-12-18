import NotificationsAddDialog from "@/components/sections/notifications/notifications-add-dialog.component";
import NotificationsTable from "@/components/sections/notifications/notifications-table.component";
import SearchInput from "@/components/shared/search-input.component";

const NotificationsPage = () => {
  return (
    <>
      <div className="mb-6 flex-between my-4 gap-4">
        <SearchInput className="mb-0" placeholder="ابحث عن الاعلانات ..." />
        <NotificationsAddDialog />
      </div>
      <NotificationsTable />
    </>
  );
};

export default NotificationsPage;
