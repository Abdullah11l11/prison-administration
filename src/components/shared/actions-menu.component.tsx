import { DeleteIcon, DocumentTickIcon } from "@/assets";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { EyeIcon, MoreHorizontal } from "lucide-react";
import DeleteAlert, { type DeleteAlertProps } from "./delete-alert.component";
import { Button } from "../ui/button/button";

interface ActionMenuProps
  extends Pick<DeleteAlertProps, "title" | "description"> {
  viewHref?: string;
  onEdit?: () => void;
  onDelete?: DeleteAlertProps["onDelete"];
  showView?: boolean;
  showEdit?: boolean;
  showDelete?: boolean;
}

const ActionsMenu = ({
  viewHref,
  onEdit,
  onDelete,
  title,
  description,
  showView = true,
  showEdit = true,
  showDelete = true,
}: ActionMenuProps) => {
  const hasAnyAction =
    (showView && viewHref) || (showEdit && onEdit) || (showDelete && onDelete);

  if (!hasAnyAction) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <MoreHorizontal className="w-5 h-5 cursor-pointer" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start">
        {showView && viewHref && (
          <DropdownMenuItem asChild>
            <Button
              to={viewHref}
              onClick={(e) => {
                e.stopPropagation();
              }}
              variant={"ghost"}
            >
              <span>عرض</span>
              <EyeIcon />
            </Button>
          </DropdownMenuItem>
        )}

        {showEdit && onEdit && (
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onEdit();
            }}
          >
            <div className="flex items-center justify-between w-full">
              <DocumentTickIcon />
              <span>تعديل</span>
            </div>
          </DropdownMenuItem>
        )}

        {showDelete && onDelete && (
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
            className="text-red-600"
          >
            <DeleteAlert
              onDelete={onDelete}
              description={description}
              title={title}
              button={
                <div className="flex items-center justify-between w-full">
                  <DeleteIcon />
                  <span>حذف</span>
                </div>
              }
            />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionsMenu;
