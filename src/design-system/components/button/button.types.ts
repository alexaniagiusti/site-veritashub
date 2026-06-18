import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "tertiary" | "ghost" | "danger";

export type ButtonSize = "xs" | "sm" | "md" | "lg";

export type ButtonType = "button" | "submit" | "reset";

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "disabled" | "onClick" | "type"> & {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  type?: ButtonType;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
};
