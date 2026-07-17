import type { CSSProperties } from "react";
import { colors, radius, shadows, spacing, typography } from "../../index";
import { Icon } from "../Icon/Icon";
import { Tag } from "../tag";
import styles from "./article-card.module.css";
import type { ArticleCardProps } from "./article-card.types";

type CardStyle = CSSProperties & Record<`--${string}`, string | number>;
const tokenStyle: CardStyle = {
  "--card-font": typography.body14.regular.fontFamily,
  "--card-radius": `${radius[16]}px`,
  "--card-gap": `${spacing[16]}px`,
  "--card-bg": colors.neutral.White,
  "--card-title": colors.neutral["gray/950"],
  "--card-copy": colors.neutral["gray/800"],
  "--card-border": colors.neutral["gray/300"],
  "--card-focus": colors.green["green/300"],
  "--card-shadow": shadows.md,
};

export function ArticleCard({ title, excerpt, category, categoryTone = "green", date, imageSrc, imageAlt, variant = "default", readingTime, highlightLabel = "EM DESTAQUE", author, className, style, ...props }: ArticleCardProps) {
  if (variant === "featured") {
    return (
      <a {...props} className={`${styles.card} ${styles.featured} ${className ?? ""}`} style={{ ...tokenStyle, ...style }}>
        <div className={`${styles.featuredMedia} ${imageSrc ? "" : styles.placeholder}`}>
          {imageSrc ? <img alt={imageAlt ?? ""} src={imageSrc} /> : <span aria-hidden="true"><span className={styles.placeholderIcon}>▧</span>Imagem da matéria</span>}
        </div>
        <span className={styles.featuredOverlay} aria-hidden="true" />
        <div className={styles.featuredContent}>
          <span className={styles.featuredCategory}>{category}</span>
          <p className={styles.featuredMeta}>{date}{readingTime ? ` - ${readingTime}` : ""}</p>
          <h3>{title}</h3>
          {excerpt ? <p className={styles.featuredDescription}>{excerpt}</p> : null}
          {author ? <div className={styles.author}><span aria-hidden="true" className={styles.avatar}>{author.initials}</span><span><strong>{author.name}</strong><small>{author.role}</small></span></div> : null}
        </div>
        <span className={styles.highlightBadge}>{highlightLabel}</span>
      </a>
    );
  }

  return (
    <a {...props} className={`${styles.card} ${styles.default} ${className ?? ""}`} style={{ ...tokenStyle, ...style }}>
      <div className={`${styles.media} ${imageSrc ? "" : styles.placeholder}`}>
        {imageSrc ? <img alt={imageAlt ?? ""} src={imageSrc} /> : <span aria-hidden="true"><span className={styles.placeholderIcon}>▧</span>Imagem da matéria</span>}
      </div>
      <div className={styles.content}>
        <div className={styles.meta}><Tag tone={categoryTone}>{category}</Tag><time>{date}</time></div>
        <h3>{title}</h3>
        {excerpt ? <p>{excerpt}</p> : null}
        <span className={styles.action}>Ler matéria <Icon name="arrow-right" size={18} /></span>
      </div>
    </a>
  );
}
