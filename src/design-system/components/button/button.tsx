import type { CSSProperties } from "react";
import { colors, focusState, radius, shadows, spacing, typography } from "../../index";
import styles from "./button.module.css";
import type { ButtonProps, ButtonVariant } from "./button.types";

type ButtonStyle = CSSProperties & Record<`--${string}`, string | number>;

const tokenStyle: ButtonStyle = {
  "--button-font-family": typography.body16.semibold.fontFamily,
  "--button-font-weight": typography.body16.semibold.fontWeight,
  "--button-line-height": typography.body16.semibold.lineHeight,
  "--button-radius": `${radius[32]}px`,
  "--button-radius-full": `${radius.full}px`,
  "--button-gap": `${spacing[4]}px`,
  "--button-shadow-xs": shadows.xs,
  "--button-focus-green": focusState.green,
  "--button-focus-red": focusState.red,
  "--button-primary-start": colors.green["green/500"],
  "--button-primary-end": colors.green["green/700"],
  "--button-primary-hover-mid": colors.green["green/700"],
  "--button-primary-hover-end": colors.green["green/900"],
  "--button-primary-active": colors.green["green/700"],
  "--button-primary-focus-border": colors.green["green/200"],
  "--button-primary-text": colors.neutral["gray/50"],
  "--button-secondary-bg": colors.neutral["gray/50"],
  "--button-secondary-border": colors.neutral["gray/500"],
  "--button-secondary-hover": colors.neutral["gray/100"],
  "--button-secondary-active": colors.neutral["gray/200"],
  "--button-secondary-text": colors.neutral["gray/950"],
  "--button-tertiary-border": colors.green["green/400"],
  "--button-tertiary-hover": colors.green["green/50"],
  "--button-tertiary-active": colors.green["green/100"],
  "--button-tertiary-text": colors.neutral["gray/950"],
  "--button-danger-bg": colors.red["red/800"],
  "--button-danger-hover": colors.red["red/900"],
  "--button-danger-active": colors.red["red/950"],
  "--button-danger-text": colors.neutral.White,
  "--button-disabled-bg": colors.neutral["gray/100"],
  "--button-disabled-border": colors.neutral["gray/300"],
  "--button-disabled-text": colors.neutral["gray/600"],
};

const variantClassMap: Record<ButtonVariant, string> = {
  primary: styles.primary,
  secondary: styles.secondary,
  tertiary: styles.tertiary,
  ghost: styles.tertiary,
  danger: styles.danger,
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  iconLeft,
  iconRight,
  fullWidth = false,
  disabled = false,
  loading = false,
  type = "button",
  onClick,
  className,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const classNames = [
    styles.button,
    variantClassMap[variant],
    styles[size],
    fullWidth ? styles.fullWidth : "",
    loading ? styles.loading : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      {...props}
      aria-busy={loading || undefined}
      className={classNames}
      disabled={isDisabled}
      onClick={onClick}
      style={{ ...tokenStyle, ...props.style }}
      type={type}
    >
      {loading ? (
        <span className={styles.spinner} aria-hidden="true" />
      ) : (
        <>
          {iconLeft ? <span className={styles.icon}>{iconLeft}</span> : null}
          <span className={styles.label}>{children}</span>
          {iconRight ? <span className={styles.icon}>{iconRight}</span> : null}
        </>
      )}
    </button>
  );
}
