import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Drop real images into /public/images and reference them by src (e.g. "/images/mission.jpg").
 * Until a file exists, a dignified captioned placeholder shows.
 */
export function Photo({ src, alt, caption, className, rounded = "rounded-[20px]" }: {
  src?: string; alt: string; caption?: ReactNode; className?: string; rounded?: string;
}) {
  const [err, setErr] = useState(false);
  const show = src && !err;
  return (
    <figure className={cn("relative overflow-hidden border border-sage-line", rounded, className)}>
      {show ? (
        <img src={src} alt={alt} onError={() => setErr(true)} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full min-h-[220px] flex items-center justify-center text-center p-6"
             style={{ background: "linear-gradient(135deg,#EFE3D3,#E0CDB6)" }}>
          <span className="text-[13px] text-[#8a6b4f]">[ Photo: {alt} ]</span>
        </div>
      )}
      {caption && <figcaption className="absolute left-3 bottom-3 text-[12px] text-white bg-black/45 px-2.5 py-1 rounded-md backdrop-blur-sm">{caption}</figcaption>}
    </figure>
  );
}
