import type { HTMLAttributes } from "react";
import type { IconName } from "../Icon/Icon";

export type AdminSidebarItem = { label: string; icon: IconName; href: string };
export type AdminSidebarGroup = { title: string; items: readonly AdminSidebarItem[] };
export type AdminSidebarUser = { initials: string; name: string; role: string };

export type AdminSidebarProps = HTMLAttributes<HTMLElement> & {
  activeItems?: readonly string[];
  groups?: readonly AdminSidebarGroup[];
  user?: AdminSidebarUser;
  embedded?: boolean;
  onLogout?: () => void
};
