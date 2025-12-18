import { useLocation, Link as RouterLink } from "react-router";
import type { IconType } from "react-icons";

import { cn } from "@/lib/utils";
import type { UIProps } from "@/types";

type SidebarLinkProps = UIProps & {
  href: string;
  icon?: IconType;
  isSubItem?: boolean;
  isCollapsed?: boolean;
};

const SidebarLink = ({
  href,
  className,
  children,
  icon: Icon,
  isSubItem = false,
  isCollapsed = false,
}: SidebarLinkProps) => {
  const location = useLocation();
  const pathname = location.pathname;

  const isActive = pathname === href;
  const labelText = typeof children === "string" ? children : undefined;

  return (
    <li>
      <RouterLink
        to={href}
        className={cn(
          "flex items-center gap-3 py-2 px-3 rounded",
          isSubItem && "ms-12 text-text-secondary text-body-small",
          isCollapsed && "lg:justify-center lg:gap-0 lg:px-2 lg:ms-0",
          isActive
            ? "bg-primary-100 text-primary-500"
            : isSubItem
            ? "text-text-secondary text-sm hover:bg-gray-100"
            : "text-text-primary-800 hover:bg-gray-100",
          className
        )}
        title={isCollapsed ? labelText : undefined}
      >
        {!!Icon && (
          <Icon
            className={cn(
              isSubItem ? "shrink-0 w-5 h-5 text-text-secondary!" : "shrink-0",
              isCollapsed && "text-inherit"
            )}
          />
        )}
        <span className={cn(isCollapsed && "lg:hidden")}>{children}</span>
      </RouterLink>
    </li>
  );
};

export default SidebarLink;
