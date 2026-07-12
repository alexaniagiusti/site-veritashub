import type { HTMLAttributes, ReactNode } from "react";

export type TagTone = "green" | "yellow" | "blue" | "neutral";

export type TagProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  tone?: TagTone;
};
