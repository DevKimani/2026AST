import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "urgent" | "calm" | "warn";
const styles: Record<Variant, string> = {
  urgent: "bg-plum text-white [&_h3]:text-white",
  calm: "bg-sage text-ink",
  warn: "bg-[#FBF0E4] border border-[#EAD6BC] text-[#6b4e26]",
};

export function Callout({ variant = "calm", icon, title, children, className }: { variant?: Variant; icon?: ReactNode; title?: string; children: ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-[14px] p-[22px_24px] flex gap-3.5 items-start", styles[variant], className)}>
      {icon && <span className="flex-none mt-0.5">{icon}</span>}
      <div>
        {title && <h3 className="text-[19px] mb-1">{title}</h3>}
        <div className="text-[15px] opacity-95">{children}</div>
      </div>
    </div>
  );
}
