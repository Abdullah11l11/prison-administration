import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { DialogProps } from "@/types";
import { X } from "lucide-react";

export interface DeleteAlertProps extends DialogProps {
  onDelete: () => void;
}

const DeleteAlert = ({
  button,
  title,
  description,
  onDelete,
}: DeleteAlertProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{button}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center justify-between">
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogCancel className="p-1 border-none shadow-none hover:bg-accent/50">
              <X size={24} className="text-text-primary-500" />
            </AlertDialogCancel>
          </div>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>إلغاء</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete}>حذف</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAlert;
