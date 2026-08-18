import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "default" | "sage" | "green";
const bg: Record<Variant, string> = {
  default: "",
  sage: "bg-sage",
  green: "bg-forest text-[#eaf2ee]",
};

export function Section({ variant = "default", className, children, id }: { variant?: Variant; className?: string; children: ReactNode; id?: string }) {
  return (
    <section id={id} className={cn("py-[78px] max-[600px]:py-14", bg[variant], className)}>
      <div className="mx-auto max-w-[1180px] px-7">{children}</div>
    </section>
  );
}

export function Eyebrow({ children, center, className }: { children: ReactNode; center?: boolean; className?: string }) {
  return (
    <span className={cn(
      "inline-flex items-center gap-[9px] text-[12.5px] tracking-[.16em] uppercase font-semibold text-forest",
      "before:content-[''] before:w-5 before:h-[1.5px] before:bg-ochre",
      center && "justify-center", className
    )}>{children}</span>
  );
}

export function SectionHead({ eyebrow, title, className }: { eyebrow: string; title: ReactNode; className?: string }) {
  return (
    <div className={cn("max-w-[840px] mx-auto text-center mb-11", className)}>
      <Eyebrow center>{eyebrow}</Eyebrow>
      <h2 className="text-[clamp(26px,3.2vw,38px)] mt-3.5 tracking-[-.01em]">{title}</h2>
    </div>
  );
}
