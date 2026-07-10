import type { AnchorHTMLAttributes } from "react";
import type { TagTone } from "../tag";

export type ArticleCardProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children"> & {
  title: string;
  excerpt?: string;
  category: string;
  categoryTone?: TagTone;
  date: string;
  imageSrc?: string;
  imageAlt?: string;
  variant?: "default" | "featured";
};
