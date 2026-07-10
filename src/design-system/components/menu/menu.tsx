import type { CSSProperties } from "react";
import { colors, radius, spacing, typography } from "../../index";
import styles from "./menu.module.css";
import type { MenuProps } from "./menu.types";

type MenuStyle = CSSProperties & Record<`--${string}`, string | number>;

const tokenStyle: MenuStyle = {
  "--menu-font-family": typography.body12.bold.fontFamily,
  "--menu-font-size": typography.body12.bold.fontSize,
  "--menu-font-weight": typography.body12.bold.fontWeight,
  "--menu-gap": `${spacing[32]}px`,
  "--menu-radius": `${radius[8]}px`,
  "--menu-accent": colors.green["green/500"],
  "--menu-light-text": colors.neutral["gray/950"],
  "--menu-dark-text": colors.neutral.White,
  "--menu-focus": colors.green["green/200"],
};

export function Menu({
  items,
  activeHref,
  tone = "light",
  ariaLabel = "Navegação",
  className,
  style,
  ...props
}: MenuProps) {
  return (
    <nav
      {...props}
      aria-label={ariaLabel}
      className={`${styles.menu} ${styles[tone]} ${className ?? ""}`}
      style={{ ...tokenStyle, ...style }}
    >
      {items.map((item) => {
        const isActive = item.href === activeHref;
        return (
          <a
            aria-current={isActive ? "page" : undefined}
            aria-disabled={item.disabled || undefined}
            className={`${styles.item} ${isActive ? styles.active : ""} ${item.disabled ? styles.disabled : ""}`}
            href={item.disabled ? undefined : item.href}
            key={`${item.href}-${item.label}`}
            onClick={item.disabled ? (event) => event.preventDefault() : undefined}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
