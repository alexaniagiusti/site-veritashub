import type { CSSProperties } from "react";
import { colors, radius, spacing, typography } from "../../index";
import styles from "./blog-sidebar.module.css";
import type { BlogSidebarProps } from "./blog-sidebar.types";

type SidebarStyle = CSSProperties & Record<`--${string}`, string | number>;

const tokenStyle: SidebarStyle = {
  "--sidebar-font": typography.body14.regular.fontFamily,
  "--sidebar-radius": `${radius[16]}px`,
  "--sidebar-item-radius": `${radius[8]}px`,
  "--sidebar-gap": `${spacing[24]}px`,
  "--sidebar-bg": colors.neutral.White,
  "--sidebar-surface": colors.neutral["gray/50"],
  "--sidebar-text": colors.neutral["gray/950"],
  "--sidebar-muted": colors.neutral["gray/800"],
  "--sidebar-border": colors.neutral["gray/300"],
  "--sidebar-active": colors.green["green/100"],
  "--sidebar-accent": colors.green["green/700"],
  "--sidebar-focus": colors.green["green/300"],
};

export function BlogSidebar({
  categories,
  categoriesTitle = "Categorias",
  ariaLabel = "Navegação do blog",
  className,
  style,
  ...props
}: BlogSidebarProps) {
  return (
    <aside {...props} aria-label={ariaLabel} className={`${styles.sidebar} ${className ?? ""}`} style={{ ...tokenStyle, ...style }}>
      <section className={styles.section}>
          <h2>{categoriesTitle}</h2>
          <nav aria-label={categoriesTitle} className={styles.categories}>
            {categories.map((category) => (
              <a aria-current={category.active ? "page" : undefined} className={category.active ? styles.active : ""} href={category.href} key={`${category.href}-${category.label}`}>
                <span>{category.label}</span>
                {category.count !== undefined ? <small>{category.count}</small> : null}
              </a>
            ))}
          </nav>
      </section>
    </aside>
  );
}
