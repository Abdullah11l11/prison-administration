import { clsx, type ClassValue } from "clsx"
import { format as formatDateFns, isValid, parseISO } from "date-fns"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type DateInput = string | number | Date | null | undefined

const toDate = (value: DateInput) => {
  if (value === null || value === undefined) return null
  if (value instanceof Date) return value
  if (typeof value === "string") {
    const parsed = parseISO(value)
    return isValid(parsed) ? parsed : null
  }
  const date = new Date(value)
  return isValid(date) ? date : null
}

export function formatDate(value: DateInput, fallback = "-") {
  const date = toDate(value)
  if (!date) return fallback
  return formatDateFns(date, "MMM d, yyyy")
}

export function formatDateTime(value: DateInput, fallback = "-") {
  const date = toDate(value)
  if (!date) return fallback
  return formatDateFns(date, "MMM d, yyyy, h:mm a")
}
