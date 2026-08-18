import { type ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Eyebrow } from "./Section";

export function Crumb({ label, mid }: { label: string; mid?: { to: string; label: string } }) {
  return (
    <div className="text-[13.5px] text-muted flex gap-2 items-center">
      <Link to="/" className="hover:text-forest">Home</Link>
      <span className="opacity-50">/</span>
      {mid && (<><Link to={mid.to} className="hover:text-forest">{mid.label}</Link><span className="opacity-50">/</span></>)}
      <span>{label}</span>
    </div>
  );
}

export function Banner({ green, crumb, eyebrow, title, text }: { green?: boolean; crumb?: ReactNode; eyebrow?: string; title: ReactNode; text?: ReactNode }) {
  return (
    <div className={cn("relative overflow-hidden border-b", green ? "bg-forest text-[#eaf2ee] border-transparent" : "bg-sage border-sage-line")}>
      <div className={cn("mx-auto max-w-[1180px] px-7 pt-[52px] pb-14", green && "[&_a]:text-[#bfe0d3]")}>
        {crumb && <div className={cn(green && "text-[#bfe0d3] [&_.text-muted]:text-[#bfe0d3] [&_span]:text-[#bfe0d3]")}>{crumb}</div>}
        {eyebrow && <div className="mt-3.5"><Eyebrow className={green ? "text-[#bfe0d3]" : ""}>{eyebrow}</Eyebrow></div>}
        <h1 className="text-[clamp(32px,4.4vw,50px)] tracking-[-.015em] mt-3.5">{title}</h1>
        {text && <p className={cn("mt-4 text-lg max-w-[60ch]", green ? "text-[#cfe4db]" : "text-muted")}>{text}</p>}
      </div>
    </div>
  );
}
