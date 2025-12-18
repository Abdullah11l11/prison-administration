import { useState } from "react";

import { useLocation } from "react-router";

import type { SidebarItem } from "@/lib/constant/sidebar-items.constant";
import { cn } from "@/lib/utils";
import SidebarLink from "./sidebar-link.component";

type SidebarDropdownProps = {
  item: SidebarItem;
  isCollapsed?: boolean;
};

const SidebarDropdown = ({
  item,
  isCollapsed = false,
}: SidebarDropdownProps) => {
  const location = useLocation();
  const pathname = location.pathname;

  const hasActiveChild = item.children?.some(({ href }) => pathname === href);
  const isActiveParent = pathname === item.href || hasActiveChild;
  const [isOpen, setIsOpen] = useState(isActiveParent);

  return (
    <li>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "w-full flex items-center gap-2 rounded px-3 py-2 justify-between",
          isCollapsed && "lg:justify-center lg:px-2",
          isActiveParent
            ? "bg-primary-100 text-primary-500"
            : "text-text-primary-800 hover:bg-gray-100"
        )}
        title={isCollapsed ? item.label : undefined}
      >
        <span className="flex items-center gap-3">
          <item.icon size={24} />
          <span className={cn(isCollapsed && "lg:hidden")}>{item.label}</span>
        </span>
      </button>

      {isOpen && item.children?.length ? (
        <ul className={cn("mt-1 w-full space-y-1", isCollapsed && "lg:hidden")}>
          {item.children.map((child) => (
            <SidebarLink
              key={child.href}
              href={child.href}
              icon={child.icon}
              isCollapsed={isCollapsed}
              isSubItem
            >
              {child.label}
            </SidebarLink>
          ))}
        </ul>
      ) : null}
    </li>
  );
};

export default SidebarDropdown;
