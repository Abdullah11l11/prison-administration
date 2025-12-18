import { Button } from "@/components/ui/button/button";
import { LuPanelLeft, LuPanelRight } from "react-icons/lu";
import { LuMenu } from "react-icons/lu";
import HeaderLabel from "./header-label.component";

type HeaderProps = {
  onToggleSidebar?: () => void;
  onToggleCollapse?: () => void;
  isSidebarCollapsed?: boolean;
};

const Header = ({
  onToggleSidebar,
  onToggleCollapse,
  isSidebarCollapsed,
}: HeaderProps) => {
  return (
    <header className="space-y-6.5 mb-2 pt-8 z-10 bg-background">
      <div className="flex gap-4 px-2 items-center">
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={onToggleSidebar}
          className="lg:hidden"
          aria-label="Toggle navigation"
        >
          <LuMenu size={24} />
        </Button>
        {/* collapse */}
        <Button
          variant={"outline"}
          size={"icon"}
          className="hidden lg:inline-flex"
          onClick={onToggleCollapse}
          aria-label={
            isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
          }
        >
          {isSidebarCollapsed ? (
            <LuPanelLeft size={24} />
          ) : (
            <LuPanelRight size={24} />
          )}
        </Button>
        <div className="h-6.5 w-px bg-card-border" />
      </div>
      <HeaderLabel />
    </header>
  );
};

export default Header;
