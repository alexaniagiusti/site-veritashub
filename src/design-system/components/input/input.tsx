import { useId, type CSSProperties } from "react";
import { colors, focusState, radius, shadows, spacing, typography } from "../../index";
import styles from "./input.module.css";
import type { InputProps } from "./input.type";

type InputStyle = CSSProperties & Record<`--${string}`, string | number>;

const tokenStyle: InputStyle = {
  "--input-font-family": typography.body14.regular.fontFamily,
  "--input-radius": `${radius[8]}px`,
  "--input-gap": `${spacing[8]}px`,
  "--input-bg": colors.neutral.White,
  "--input-text": colors.neutral["gray/950"],
  "--input-placeholder": colors.neutral["gray/700"],
  "--input-border": colors.neutral["gray/500"],
  "--input-hover": colors.neutral["gray/700"],
  "--input-disabled-bg": colors.neutral["gray/100"],
  "--input-disabled-text": colors.neutral["gray/600"],
  "--input-error": colors.red["red/900"],
  "--input-success": colors.green["green/700"],
  "--input-focus": focusState.green,
  "--input-focus-error": focusState.red,
  "--input-shadow": shadows.xs,
};

export function Input({ id, label, helper, hint, error, size = "md", status = "default", iconLeft, iconRight, fullWidth = true, className, inputClassName, labelClassName, disabled, style, ...props }: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const resolvedStatus = error ? "error" : status;
  const supportingText = error ?? hint ?? helper;
  const supportingId = supportingText ? `${inputId}-supporting` : undefined;

  return (
    <div className={`${styles.field} ${fullWidth ? styles.fullWidth : ""} ${className ?? ""}`} style={{ ...tokenStyle, ...style }}>
      {label ? <label className={`${styles.label} ${labelClassName ?? ""}`} htmlFor={inputId}>{label}{helper && !hint && !error ? <small>{helper}</small> : null}</label> : null}
      <div className={`${styles.control} ${styles[size]} ${styles[resolvedStatus]} ${disabled ? styles.disabled : ""}`}>
        {iconLeft ? <span className={styles.icon}>{iconLeft}</span> : null}
        <input {...props} aria-describedby={supportingId} aria-invalid={resolvedStatus === "error" || undefined} className={`${styles.input} ${inputClassName ?? ""}`} disabled={disabled} id={inputId} />
        {iconRight ? <span className={styles.icon}>{iconRight}</span> : null}
      </div>
      {supportingText && (hint || error) ? <span className={`${styles.supporting} ${styles[resolvedStatus]}`} id={supportingId}>{supportingText}</span> : null}
    </div>
  );
}
