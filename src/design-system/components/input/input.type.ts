import type { InputHTMLAttributes, ReactNode } from "react";

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  helper?: ReactNode;
  inputClassName?: string;
  label?: ReactNode;
  labelClassName?: string;
};
