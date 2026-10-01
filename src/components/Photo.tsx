import {
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

export function Photo({
  src,
  alt,
  caption,
  className,
  rounded = "rounded-[20px]",
}: {
  src?: string;
  alt: string;
  caption?: ReactNode;
  className?: string;
  rounded?: string;
}) {
  const [err, setErr] = useState(false);
  const show = src && !err;

  return (
    <figure
      className={cn(
        "relative overflow-hidden border border-sage-line",
        rounded,
        className
      )}
    >
      {show ? (
        <img
          src={src}
          alt={alt}
          onError={() => setErr(true)}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
        />
      ) : (
        <div
          className="w-full h-full min-h-[220px] flex items-center justify-center text-center p-6"
          style={{
            background:
              "linear-gradient(135deg,#EFE3D3,#E0CDB6)",
          }}
          role="img"
          aria-label={alt}
        >
          <span className="font-display text-forest/70 text-lg">
            Arise Strong Together
          </span>
        </div>
      )}

      {caption && (
        <figcaption className="absolute left-3 bottom-3 text-[12px] text-white bg-black/45 px-2.5 py-1 rounded-md backdrop-blur-sm">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}