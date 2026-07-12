import type { InputHTMLAttributes, ReactNode } from "react";

export type InputSize = "sm" | "md" | "lg";
export type InputStatus = "default" | "error" | "success";

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  label?: ReactNode;
  helper?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  size?: InputSize;
  status?: InputStatus;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  fullWidth?: boolean;
  inputClassName?: string;
  labelClassName?: string;
};
