import LinkIcon from "@/assets/icons/link.icon";
import { type ChangeEvent, useState } from "react";

type FileInputProps = {
  id?: string;
  label?: string;
  accept?: string;
  onFileChange?: (file: File | null) => void;
  className?: string;
};

export default function ImageFileInput({
  id = "image-input",
  label = "اختر صورة",
  accept = "image/*",
  onFileChange,
  className = "",
}: FileInputProps) {
  const [fileName, setFileName] = useState(label);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setFileName(file?.name ?? label);
    onFileChange?.(file);
  };

  return (
    <div className={`w-full ${className}`}>
      <input
        id={id}
        type="file"
        accept={accept}
        className="hidden"
        onChange={handleChange}
      />

      <label
        htmlFor={id}
        dir="rtl"
        className="inline-flex w-full h-10 items-center justify-between flex-row
                  rounded-md border border-card-border/20 px-3
                  text-caption-small text-text-secondary cursor-pointer
                hover:bg-card-border/20 focus:outline-none"
      >
        <span className="truncate">{fileName}</span>
        <LinkIcon />
      </label>
    </div>
  );
}
