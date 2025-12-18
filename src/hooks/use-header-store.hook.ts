import type { HeaderItem } from "@/lib/constant/header-items.constant";
import { create } from "zustand";

type HeaderStore = {
  label: Pick<HeaderItem, "label" | "desc" | "editButton">;
  setLabel: (label: Pick<HeaderItem, "label" | "desc" | "editButton">) => void;
};

export const useHeaderStore = create<HeaderStore>((set) => ({
  label: { label: "" },
  setLabel: (label) => set({ label }),
}));
