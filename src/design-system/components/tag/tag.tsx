import type { CSSProperties } from "react";
import { colors, radius, spacing, typography } from "../../index";
import styles from "./tag.module.css";
import type { TagProps } from "./tag.types";

type TagStyle = CSSProperties & Record<`--${string}`, string | number>;

const tokenStyle: TagStyle = {
  "--tag-font": typography.overline10.bold.fontFamily,
  "--tag-weight": typography.overline10.bold.fontWeight,
  "--tag-radius": `${radius.full}px`,
  "--tag-padding-x": `${spacing[10]}px`,
  "--tag-green-bg": colors.green["green/100"],
  "--tag-green-text": colors.green["green/900"],
  "--tag-yellow-bg": colors.yellow["amarelo/100"],
  "--tag-yellow-text": colors.yellow["amarelo/900"],
  "--tag-blue-bg": colors.blue["blue/100"],
  "--tag-blue-text": colors.blue["blue/900"],
  "--tag-neutral-bg": colors.neutral["gray/200"],
  "--tag-neutral-text": colors.neutral["gray/900"],
};

export function Tag({ children, tone = "green", className, style, ...props }: TagProps) {
  return <span {...props} className={`${styles.tag} ${styles[tone]} ${className ?? ""}`} style={{ ...tokenStyle, ...style }}>{children}</span>;
}
