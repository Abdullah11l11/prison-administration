import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";

import Header from "../base/header/header.component";
import Sidebar from "../base/sidebar/sidebar.component";

const DashboardLayout = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const toggleSidebarCollapse = () => setIsSidebarCollapsed((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="flex">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
        isCollapsed={isSidebarCollapsed}
      />
      <div className="pb-8 px-4 flex-1">
        <Header
          onToggleSidebar={toggleSidebar}
          onToggleCollapse={toggleSidebarCollapse}
          isSidebarCollapsed={isSidebarCollapsed}
        />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
