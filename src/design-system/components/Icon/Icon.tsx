import type { ComponentType } from "react";
import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiCloseLine,
  RiCopyrightLine,
  RiDashboardLine,
  RiDeleteBin2Line,
  RiEditLine,
  RiEyeLine,
  RiFileList2Line,
  RiFacebookFill,
  RiInstagramLine,
  RiLockLine,
  RiLogoutBoxLine,
  RiMailOpenLine,
  RiMenuLine,
  RiMore2Fill,
  RiPauseFill,
  RiPriceTag3Line,
  RiPlayFill,
  RiSearchLine,
  RiSettings3Line,
  RiAddFill,
  RiUserLine,
  RiWhatsappLine,
  RiYoutubeFill,
} from "react-icons/ri";

type IconName =
  | "instagram"
  | "facebook"
  | "whatsapp"
  | "youtube"
  | "menu"
  | "user"
  | "mail-open"
  | "lock"
  | "eye"
  | "dashboard"
  | "file-list"
  | "price-tag"
  | "settings"
  | "logout"
  | "add"
  | "search"
  | "edit"
  | "delete-bin"
  | "more"
  | "copyright"
  | "close"
  | "arrow-right"
  | "arrow-left"
  | "play"
  | "pause";

type IconProps = {
  name: IconName;
  size?: number | string;
  color?: string;
  className?: string;
};

type RemixIconProps = {
  "aria-hidden"?: boolean | "true" | "false";
  className?: string;
  color?: string;
  focusable?: boolean | "true" | "false";
  size?: number | string;
};

const icons: Record<IconName, ComponentType<RemixIconProps>> = {
  instagram: RiInstagramLine,
  facebook: RiFacebookFill,
  whatsapp: RiWhatsappLine,
  youtube: RiYoutubeFill,
  menu: RiMenuLine,
  user: RiUserLine,
  "mail-open": RiMailOpenLine,
  lock: RiLockLine,
  eye: RiEyeLine,
  dashboard: RiDashboardLine,
  "file-list": RiFileList2Line,
  "price-tag": RiPriceTag3Line,
  settings: RiSettings3Line,
  logout: RiLogoutBoxLine,
  add: RiAddFill,
  search: RiSearchLine,
  edit: RiEditLine,
  "delete-bin": RiDeleteBin2Line,
  more: RiMore2Fill,
  copyright: RiCopyrightLine,
  close: RiCloseLine,
  "arrow-right": RiArrowRightLine,
  "arrow-left": RiArrowLeftLine,
  play: RiPlayFill,
  pause: RiPauseFill,
};

export function Icon({ name, size = 24, color = "currentColor", className }: IconProps) {
  const SelectedIcon = icons[name];

  return <SelectedIcon aria-hidden="true" className={className} color={color} focusable="false" size={size} />;
}
