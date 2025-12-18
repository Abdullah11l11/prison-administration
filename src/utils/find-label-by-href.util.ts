import type { HeaderItem } from "@/lib/constant/header-items.constant";

export const findLabelByHref = (
  items: HeaderItem[],
  href: string
): Pick<HeaderItem, "label" | "desc" | "editButton"> | null => {
  const normalizePath = (path: string) =>
    path.split("?")[0].replace(/\/+$/, "") || "/";

  const sanitizedHref = normalizePath(href);

  const findMatch = (path: string) => {
    const match = items.find((item) => item.href === path);
    return match ? { label: match.label, desc: match.desc } : null;
  };

  const matchesDynamicHref = (itemHref: string, path: string) => {
    const normalizedItem = normalizePath(itemHref);
    if (normalizedItem === "/") return path === "/";

    const escapeRegex = (value: string) =>
      value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const pattern = normalizedItem
      .split("/")
      .filter(Boolean)
      .map((segment) =>
        segment.startsWith("[") && segment.endsWith("]")
          ? "[^/]+"
          : escapeRegex(segment)
      )
      .join("/");

    const regex = new RegExp(`^/${pattern}$`);
    return regex.test(path);
  };

  const findDynamicMatch = (path: string) => {
    const match = items.find((item) => matchesDynamicHref(item.href, path));
    return match
      ? { label: match.label, desc: match.desc, editButton: match.editButton }
      : null;
  };

  let currentPath = sanitizedHref;
  while (true) {
    const match = findMatch(currentPath) ?? findDynamicMatch(currentPath);
    if (match) return match;

    const lastSlashIndex = currentPath.lastIndexOf("/");
    if (lastSlashIndex <= 0) break;

    currentPath = currentPath.slice(0, lastSlashIndex);
  }

  return null;
};
