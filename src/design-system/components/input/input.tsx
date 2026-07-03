import type { CSSProperties } from "react";
import { colors, focusState, radius, shadows, typography } from "../../index";
import styles from "./input.module.css";
import type { InputProps } from "./input.type";

type InputStyle = CSSProperties & Record<`--${string}`, string | number>;

const tokenStyle: InputStyle = {
  "--input-bg": colors.neutral.White,
  "--input-disabled-bg": colors.neutral["gray/50"],
  "--input-border": colors.neutral["gray/400"],
  "--input-border-focus": colors.green["green/700"],
  "--input-text": colors.neutral["gray/900"],
  "--input-disabled-text": colors.neutral["gray/600"],
  "--input-label": colors.neutral["gray/950"],
  "--input-helper": colors.neutral["gray/900"],
  "--input-radius": `${radius[6]}px`,
  "--input-shadow": shadows.xs,
  "--input-focus": focusState.green,
  "--input-font-family": typography.body14.semibold.fontFamily,
  "--input-font-size": typography.body14.semibold.fontSize,
  "--input-font-weight": typography.body14.semibold.fontWeight,
  "--input-line-height": typography.body14.semibold.lineHeight,
};

export function Input({
  className,
  disabled = false,
  helper,
  id,
  inputClassName,
  label,
  labelClassName,
  style,
  type = "text",
  ...props
}: InputProps) {
  const inputId = id ?? (typeof label === "string" ? `input-${label.toLowerCase().replace(/\s+/g, "-")}` : undefined);
  const classNames = [styles.field, disabled ? styles.disabled : "", className ?? ""].filter(Boolean).join(" ");
  const labelClassNames = [styles.label, labelClassName ?? ""].filter(Boolean).join(" ");
  const inputClassNames = [styles.input, inputClassName ?? ""].filter(Boolean).join(" ");

  return (
    <label className={classNames} style={{ ...tokenStyle, ...style }}>
      {label || helper ? (
        <span className={labelClassNames}>
          {label ? <span>{label}</span> : null}
          {helper ? <small>{helper}</small> : null}
        </span>
      ) : null}
      <input {...props} className={inputClassNames} disabled={disabled} id={inputId} type={type} />
    </label>
  );
}
