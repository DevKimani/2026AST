import { useState } from "react";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const AMOUNTS = ["500", "1,000", "2,500", "5,000"];

export function DonateWidget() {
  const [freq, setFreq] = useState<"once" | "monthly">("once");
  const [amount, setAmount] = useState<string>("1,000");

  return (
    <div className="bg-cream rounded-[18px] p-7 shadow-[0_30px_60px_-30px_rgba(0,0,0,.5)] border border-sage-line">
      <div className="flex items-center gap-2.5 mb-4">
        <span className="w-9 h-9 rounded-full bg-terracotta flex items-center justify-center text-white"><Heart size={18} /></span>
        <h3 className="text-[22px] text-forest">Make a Donation</h3>
      </div>

      <div className="inline-flex w-full bg-sage rounded-xl p-[5px] gap-1 mb-4">
        {(["once", "monthly"] as const).map((f) => (
          <button key={f} onClick={() => setFreq(f)}
            className={cn("flex-1 font-semibold text-[14px] py-2.5 rounded-[9px] transition-colors capitalize",
              freq === f ? "bg-terracotta text-white" : "text-muted")}>
            {f === "once" ? "One-time" : "Monthly"}
          </button>
        ))}
      </div>

      <p className="text-[12px] uppercase tracking-[.1em] text-muted mb-2">Select amount (KES)</p>
      <div className="grid grid-cols-2 gap-2.5 mb-3">
        {AMOUNTS.map((a) => (
          <button key={a} onClick={() => setAmount(a)}
            className={cn("py-3 rounded-[10px] border-[1.5px] font-semibold text-[15px] transition-colors",
              amount === a ? "border-terracotta bg-terracotta/10 text-terracotta" : "border-sage-line bg-white text-ink hover:border-terracotta")}>
            KES {a}
          </button>
        ))}
      </div>
      <input inputMode="numeric" placeholder="Other amount" onChange={(e) => setAmount(e.target.value)}
        className="w-full text-[15px] px-3.5 py-3 border-[1.5px] border-sage-line rounded-[10px] bg-white mb-4 focus:border-terracotta focus:outline-none" />

      <Link to="/donate"
        className="w-full justify-center inline-flex items-center gap-2 font-semibold text-base px-6 py-[14px] rounded-[10px] bg-terracotta text-white hover:bg-terracotta-deep transition-colors">
        Proceed to donate{amount ? ` · KES ${amount}` : ""}
      </Link>
      <p className="text-[12px] text-muted text-center mt-3">Secure giving via M-Pesa, card, or bank. Card details are never entered here.</p>
    </div>
  );
}
