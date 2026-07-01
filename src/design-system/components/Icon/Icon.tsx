import type { ComponentType } from "react";
import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiCloseLine,
  RiEyeLine,
  RiFacebookFill,
  RiInstagramLine,
  RiLockLine,
  RiMailOpenLine,
  RiMenuLine,
  RiPauseFill,
  RiPlayFill,
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
