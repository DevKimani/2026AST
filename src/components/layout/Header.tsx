import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { to: "/about", label: "About" },
  { to: "/get-help", label: "Get Help", help: true },
  { to: "/programs", label: "Programs" },
  { to: "/get-involved", label: "Get Involved" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
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
              {l.label}
            </NavLink>
          ))}
        </nav>

        <Button to="/donate" className="hidden md:inline-flex">Donate</Button>

        <button className="md:hidden text-forest" aria-label="Open menu" onClick={() => setOpen(true)}>
          <Menu size={26} />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div className="absolute inset-0 bg-forest-deep/40" onClick={() => setOpen(false)} />
          <div className="absolute top-0 right-0 bottom-0 w-[min(320px,84vw)] bg-paper p-6 shadow-[-10px_0_40px_rgba(0,0,0,.2)] flex flex-col gap-1.5">
            <button className="self-end text-forest mb-2" aria-label="Close menu" onClick={() => setOpen(false)}><X size={26} /></button>
            {[...links, { to: "/volunteer", label: "Volunteer" }].map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)}
                className={cn("py-[13px] px-1 text-[17px] font-medium border-b border-sage-line", (l as any).help && "text-plum font-semibold")}>
                {l.label}
              </Link>
            ))}
            <Button to="/donate" className="mt-4 justify-center" onClick={() => setOpen(false)}>Donate</Button>
          </div>
        </div>
      )}
    </header>
  );
}
