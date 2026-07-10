import type { HTMLAttributes } from "react";

export type BlogSidebarCategory = {
  label: string;
  href: string;
  count?: number;
  active?: boolean;
};

export type BlogSidebarProps = Omit<HTMLAttributes<HTMLElement>, "children"> & {
  categories: readonly BlogSidebarCategory[];
  categoriesTitle?: string;
  ariaLabel?: string;
};
