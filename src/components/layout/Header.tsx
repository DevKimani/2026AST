import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { to: "/about", key: "about" },
  { to: "/get-help", key: "help", help: true },
  { to: "/programs", key: "programs" },
  { to: "/get-involved", key: "getInvolved" },
  { to: "/blog", key: "blog" },
  { to: "/contact", key: "contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  return (
    <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur-[10px] border-b border-sage-line">
      <div className="mx-auto max-w-[1180px] px-7 flex items-center justify-between min-h-[74px] gap-5">
        <Link to="/" className="flex items-center gap-[11px] font-display font-semibold text-xl text-forest">
          <Logo size={42} /> Arise Strong Together
        </Link>

        <nav className="hidden md:flex items-center gap-[26px]">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                cn(
                  "text-[15px] font-medium py-1.5 relative hover:text-forest",
                  l.help ? "text-plum font-semibold" : "text-ink",
                  isActive && "after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-0.5 after:rounded",
                  isActive && (l.help ? "after:bg-plum" : "after:bg-forest")
                )
              }
            >
              {t(`nav.${l.key}`)}
            </NavLink>
          ))}
        </nav>

        <Button to="/donate" className="hidden md:inline-flex">{t("nav.donate")}</Button>

        <button className="md:hidden text-forest" aria-label="Open menu" onClick={() => setOpen(true)}>
          <Menu size={26} />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-[60] md:hidden bg-cream flex flex-col">
          <div className="flex items-center justify-between px-7 min-h-[74px] border-b border-sage-line">
            <span className="flex items-center gap-[11px] font-display font-semibold text-xl text-forest"><Logo size={38} /> Arise Strong Together</span>
            <button className="text-forest" aria-label="Close menu" onClick={() => setOpen(false)}><X size={28} /></button>
          </div>
          <nav className="flex-1 overflow-y-auto px-7 py-4 flex flex-col">
            {[...links, { to: "/volunteer", key: "volunteer" }].map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)}
                className={cn("py-[15px] text-[18px] font-medium border-b border-sage-line", (l as any).help && "text-terracotta font-semibold")}>
                {t(`nav.${l.key}`)}
              </Link>
            ))}
            <div className="flex gap-3 mt-6">
              <Button to="/get-help" variant="help" className="flex-1 justify-center" onClick={() => setOpen(false)}>{t("nav.help")}</Button>
              <Button to="/donate" className="flex-1 justify-center" onClick={() => setOpen(false)}>{t("nav.donate")}</Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
