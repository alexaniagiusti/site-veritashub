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
  RiAlignCenter,
  RiAlignJustify,
  RiAlignLeft,
  RiAlignRight,
  RiArrowGoBackLine,
  RiArrowGoForwardLine,
  RiBold,
  RiCheckFill,
  RiCalendarLine,
  RiTimeLine,
  RiUserLine,
  RiH1,
  RiH2,
  RiImageAddLine,
  RiItalic,
  RiLink,
  RiListOrdered,
  RiListUnordered,
  RiParagraph,
  RiStrikethrough,
  RiUnderline,
  RiUpload2Line,
  RiWhatsappLine,
  RiYoutubeFill,
} from "react-icons/ri";

export type IconName =
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
  | "check"
  | "calendar"
  | "clock"
  | "search"
  | "edit"
  | "delete-bin"
  | "more"
  | "copyright"
  | "undo"
  | "redo"
  | "bold"
  | "italic"
  | "underline"
  | "strikethrough"
  | "list-unordered"
  | "list-ordered"
  | "align-left"
  | "align-center"
  | "align-right"
  | "align-justify"
  | "link"
  | "image-add"
  | "upload"
  | "paragraph"
  | "heading-one"
  | "heading-two"
  | "close"
  | "arrow-right"
  | "arrow-left"
  | "play"
  | "pause";

export type IconProps = {
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
  check: RiCheckFill,
  calendar: RiCalendarLine,
  clock: RiTimeLine,
  search: RiSearchLine,
  edit: RiEditLine,
  "delete-bin": RiDeleteBin2Line,
  more: RiMore2Fill,
  copyright: RiCopyrightLine,
  undo: RiArrowGoBackLine,
  redo: RiArrowGoForwardLine,
  bold: RiBold,
  italic: RiItalic,
  underline: RiUnderline,
  strikethrough: RiStrikethrough,
  "list-unordered": RiListUnordered,
  "list-ordered": RiListOrdered,
  "align-left": RiAlignLeft,
  "align-center": RiAlignCenter,
  "align-right": RiAlignRight,
  "align-justify": RiAlignJustify,
  link: RiLink,
  "image-add": RiImageAddLine,
  upload: RiUpload2Line,
  paragraph: RiParagraph,
  "heading-one": RiH1,
  "heading-two": RiH2,
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
