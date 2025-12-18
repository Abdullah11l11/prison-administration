import {
  sidebarItems,
  sittingsItem,
} from "@/lib/constant/sidebar-items.constant";
import { cn } from "@/lib/utils";
import { LuX } from "react-icons/lu";
import SidebarDropdown from "./sidebar-dropdown.component";
import SidebarLink from "./sidebar-link.component";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  isCollapsed?: boolean;
};

const Sidebar = ({ isOpen, onClose, isCollapsed = false }: SidebarProps) => {
  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-30 bg-black/25 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden",
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      <div
        className={cn(
          "lg:max-w-57.5 p-0! lg:min-w-57.5 shrink-0 h-screen",
          isCollapsed && "lg:max-w-20 lg:min-w-20"
        )}
      >
        <nav
          className={cn(
            "fixed inset-y-0 right-0 z-40 h-screen w-[18rem] max-w-[85vw] bg-background-50 shadow-lg transition-transform duration-300 ease-in-out",
            " lg:h-screen lg:min-w-57.5 lg:max-w-57.5 lg:w-57.5 lg:translate-x-0 lg:shadow-none",
            isOpen ? "translate-x-0" : "translate-x-full",
            isCollapsed && "lg:min-w-20 lg:max-w-20 lg:w-20"
          )}
          aria-label="Sidebar"
        >
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between px-4 pt-6 pb-2 lg:hidden">
              <p className="text-text-primary-800 text-lg font-bold">القائمة</p>
              <button
                type="button"
                onClick={onClose}
                className="text-text-primary-800 hover:text-primary-500 transition-colors"
                aria-label="إغلاق القائمة"
              >
                <LuX size={24} />
              </button>
            </div>

            <ul
              className={cn(
                "space-y-2 py-4 px-4 flex-1 overflow-y-auto no-scrollbar lg:py-8",
                isCollapsed && "lg:px-2"
              )}
            >
              {sidebarItems.map((item) =>
                item.children?.length ? (
                  <SidebarDropdown
                    key={item.href}
                    item={item}
                    isCollapsed={isCollapsed}
                  />
                ) : (
                  <SidebarLink
                    key={item.href}
                    href={item.href}
                    icon={item.icon}
                    isCollapsed={isCollapsed}
                  >
                    {item.label}
                  </SidebarLink>
                )
              )}
            </ul>

            <ul
              className={cn(
                "space-y-4 px-4 pb-8 pt-4 border-t border-card-border/30",
                isCollapsed && "lg:px-2"
              )}
            >
              <SidebarLink {...sittingsItem} isCollapsed={isCollapsed}>
                {sittingsItem.label}
              </SidebarLink>
              {!isCollapsed ? (
                <li className="text-text-primary-500 text-sm font-bold text-center">
                  Powered by <span className="text-primary-500">Kawarem</span>
                </li>
              ) : null}
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
