import * as React from "react";

import { Button } from "@/components/ui/button/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import CalendarIcon from "@/assets/icons/Calendar.icon";
import { FieldErrorMessage, FieldLabel } from "./field.component";

type CustomCalendarProps = {
  placeholder?: string;
  label?: string;
  error?: string;
  value?: Date;
  onChange?: (date: Date | undefined) => void;
};

export default function CustomCalendar({
  label = "",
  placeholder = "",
  error = "",
  value,
  onChange,
}: CustomCalendarProps) {
  const [open, setOpen] = React.useState(false);
  const [internalDate, setInternalDate] = React.useState<Date | undefined>(
    value
  );

  React.useEffect(() => {
    setInternalDate(value);
  }, [value]);

  const selectedDate = value ?? internalDate;

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-3 justify-between">
        <FieldLabel>{label ? label : "اختر تاريخ"}</FieldLabel>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date"
              className={`w-78 justify-between font-normal ${
                selectedDate ? "text-text-primary-500" : "text-text-secondary"
              }`}
            >
              {selectedDate
                ? selectedDate.toLocaleDateString()
                : placeholder
                ? placeholder
                : "اختر تاريخ"}
              <CalendarIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              captionLayout="dropdown"
              onSelect={(date) => {
                setInternalDate(date);
                onChange?.(date);
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      {error && <FieldErrorMessage error={error} />}
    </div>
  );
}
