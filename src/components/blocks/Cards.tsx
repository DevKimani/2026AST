import { type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Card({ icon, title, children, className }: { icon?: ReactNode; title?: string; children: ReactNode; className?: string }) {
  return (
    <div className={cn("border border-sage-line rounded-[14px] p-[30px] bg-white", className)}>
      {icon && <div className="w-[46px] h-[46px] rounded-xl bg-sage flex items-center justify-center text-forest mb-[18px]">{icon}</div>}
      {title && <h3 className="text-[21px] text-forest mb-2">{title}</h3>}
      <div className="text-muted text-[15px]">{children}</div>
    </div>
  );
}

export function ProgramCard({ to, icon, title, children }: { to: string; icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <Link to={to} className="group block border border-sage-line rounded-[14px] p-[30px] bg-white transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:shadow-[0_22px_44px_-26px_rgba(26,59,50,.45)] hover:border-forest">
      <div className="w-[46px] h-[46px] rounded-xl bg-sage flex items-center justify-center text-forest mb-[18px]">{icon}</div>
      <h3 className="text-[21px] text-forest mb-2">{title}</h3>
      <p className="text-muted text-[15px]">{children}</p>
      <span className="mt-4 font-semibold text-[14.5px] text-plum inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-[gap]">Learn more <ArrowRight size={16} /></span>
    </Link>
  );
}

export function Stat({ n, label, onGreen }: { n: string; label: string; onGreen?: boolean }) {
  return (
    <div className={cn("rounded-[14px] p-[30px_24px] text-center border", onGreen ? "bg-white/[.06] border-white/[.16]" : "bg-paper border-sage-line")}>
      <div className={cn("font-display text-[44px] font-medium leading-none", onGreen ? "text-white" : "text-ochre")}>{n}</div>
      <div className={cn("text-sm mt-3", onGreen ? "text-[#cfe4db]" : "text-muted")}>{label}</div>
    </div>
  );
}
