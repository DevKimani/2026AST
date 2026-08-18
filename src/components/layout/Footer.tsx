import { Link } from "react-router-dom";
import { Lock } from "lucide-react";
import { Logo } from "@/components/Logo";

const fa = "block text-[#c9ded4] text-[15px] mb-2.5 hover:text-white";

export function Footer() {
  return (
    <footer className="bg-forest-deep text-[#c9ded4] pt-16 pb-[30px]">
      <div className="mx-auto max-w-[1180px] px-7">
        <div className="grid gap-[38px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <div className="font-display text-[22px] text-white font-semibold mb-3.5 flex items-center gap-2.5">
              <Logo size={30} badge /> Arise Strong Together
            </div>
            <p className="text-[14.5px] max-w-[34ch] text-[#a9ccbe]">Walking with survivors of gender-based violence — from surviving to thriving.</p>
          </div>
          <div>
            <h4 className="text-[13px] tracking-[.12em] uppercase text-[#8fb6a7] mb-4 font-semibold font-sans">Explore</h4>
            <Link className={fa} to="/about">About Us</Link>
            <Link className={fa} to="/programs">Programs</Link>
            <Link className={fa} to="/get-involved">Get Involved</Link>
            <Link className={fa} to="/blog">Blog / News</Link>
          </div>
          <div>
            <h4 className="text-[13px] tracking-[.12em] uppercase text-[#8fb6a7] mb-4 font-semibold font-sans">Support</h4>
            <Link className="block text-[#f0c8d3] font-semibold text-[15px] mb-2.5 hover:text-white" to="/get-help">Get Help</Link>
            <Link className={fa} to="/donate">Donate</Link>
            <Link className={fa} to="/volunteer">Volunteer</Link>
            <Link className={fa} to="/contact">Contact</Link>
          </div>
          <div>
            <h4 className="text-[13px] tracking-[.12em] uppercase text-[#8fb6a7] mb-4 font-semibold font-sans">Your safety</h4>
            <div className="bg-plum/15 border border-plum/40 rounded-xl p-4 text-[13.5px] text-[#e7cdd5]">
              <strong className="text-white block mb-1 text-sm">Cover your tracks</strong>
              Worried someone is watching? Learn how to browse safely. Leaving this site does not fully erase the visit.
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 mt-11 pt-[22px] flex justify-between gap-4 flex-wrap items-center text-[13px] text-[#8fb6a7]">
          <span className="inline-flex items-center gap-1.5"><Lock size={14} /> Secure site · © [YEAR] Arise Strong Together · Reg. No. [XXXX]</span>
          <span className="inline-flex border border-white/20 rounded-lg overflow-hidden">
            <button className="bg-white/15 text-white text-[13px] px-3 py-1.5">English</button>
            <button className="text-[#c9ded4] text-[13px] px-3 py-1.5">Kiswahili</button>
          </span>
        </div>
      </div>
    </footer>
  );
}
