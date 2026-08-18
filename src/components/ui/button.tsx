import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

type Variant = "primary" | "help" | "ghost" | "white" | "alert";
type Size = "md" | "lg";

const base =
  "inline-flex items-center gap-2 font-semibold rounded-[10px] cursor-pointer whitespace-nowrap " +
  "transition-[transform,background-color,box-shadow,border-color] duration-150 hover:-translate-y-px";

const variants: Record<Variant, string> = {
  primary: "bg-terracotta text-white hover:bg-terracotta-deep hover:shadow-[0_8px_20px_-8px_rgba(181,75,36,.5)]",
  help: "bg-forest text-white hover:bg-forest-deep hover:shadow-[0_8px_20px_-8px_rgba(35,78,66,.5)]",
  ghost: "bg-transparent text-forest border-[1.5px] border-sage-line hover:border-forest hover:bg-sage",
  white: "bg-white text-terracotta font-bold hover:bg-[#fbeee6]",
  alert: "bg-alert text-white hover:bg-alert-deep",
};
const sizes: Record<Size, string> = { md: "text-[15px] px-5 py-[11px]", lg: "text-base px-6 py-[14px]" };

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant; size?: Size; to?: string; href?: string; children: ReactNode;
}

export function Button({ variant = "primary", size = "md", to, href, className, children, ...rest }: Props) {
  const cls = cn(base, variants[variant], sizes[size], className);
  if (to) return <Link to={to} className={cls}>{children}</Link>;
  if (href) return <a href={href} className={cls}>{children}</a>;
  return <button className={cls} {...rest}>{children}</button>;
}
