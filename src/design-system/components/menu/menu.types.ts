import type { HTMLAttributes, MouseEvent } from "react";

export type MenuItem = {
  label: string;
  href: string;
  disabled?: boolean;
};

export type MenuProps = Omit<HTMLAttributes<HTMLElement>, "children"> & {
  items: readonly MenuItem[];
  activeHref?: string;
  tone?: "light" | "dark";
  ariaLabel?: string;
  onItemClick?: (event: MouseEvent<HTMLAnchorElement>, item: MenuItem) => void;
};
