import { useState, useRef, useEffect } from "react";
import { Heart, Smartphone, CreditCard, CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { startDonation, getDonationStatus, paymentsEnabled } from "@/lib/donations";
import { CURRENCIES, type Currency, detectCurrency, saveCurrency } from "@/lib/currency";

type Status = "idle" | "sending" | "stk_sent" | "success" | "failed" | "error";
const clean = (a: string) => a.replace(/[^0-9.]/g, "");
const fmt = (sym: string, a: string) => (sym.length > 1 ? `${sym} ${a}` : `${sym}${a}`);

export function DonateWidget() {
  const [freq, setFreq] = useState<"once" | "monthly">("once");
  const [method, setMethod] = useState<"mpesa" | "card">("mpesa");
  const [selCurrency, setSelCurrency] = useState<Currency>("KES");
  const [amount, setAmount] = useState("1,000");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [msg, setMsg] = useState("");
  const timer = useRef<number | null>(null);

  // M-Pesa is always KES; card uses the visitor's (or chosen) currency.
  const currency: Currency = method === "mpesa" ? "KES" : selCurrency;
  const cfg = CURRENCIES[currency];

  // Detect location-based currency once; steer international visitors to card.
  useEffect(() => {
    let live = true;
    detectCurrency().then((c) => {
      if (!live) return;
      setSelCurrency(c);
      if (c !== "KES") setMethod("card");
    });
    return () => { live = false; };
  }, []);

  // Reset the amount to a sensible preset whenever the effective currency changes.
  useEffect(() => { setAmount(CURRENCIES[currency].presets[1]); }, [currency]);
  useEffect(() => () => { if (timer.current) window.clearTimeout(timer.current); }, []);

  async function poll(ref: string, tries = 0) {
    if (tries > 8) { setStatus("failed"); setMsg("We didn’t get confirmation in time. If you completed the payment, we’ll still receive it."); return; }
    const { status: s } = await getDonationStatus(ref);
    if (s === "paid") { setStatus("success"); return; }
    if (s === "failed" || s === "cancelled") { setStatus("failed"); setMsg("The payment didn’t go through. Please try again."); return; }
    timer.current = window.setTimeout(() => poll(ref, tries + 1), 4000);
  }

  async function onProceed() {
    if (!paymentsEnabled()) { setStatus("error"); setMsg("Payments aren’t configured yet. Add your gateway keys to enable giving."); return; }
    if (!clean(amount)) { setStatus("error"); setMsg("Please enter an amount."); return; }
    if (method === "mpesa" && !phone) { setStatus("error"); setMsg("Enter the M-Pesa phone number to receive the prompt."); return; }
    setStatus("sending"); setMsg("");
    try {
      const r = await startDonation({ amount: clean(amount), currency, frequency: freq, method, name, email, phone });
      if (r.mode === "redirect" && r.checkout_url) { window.location.href = r.checkout_url; return; }
      setStatus("stk_sent"); setMsg("Check your phone and enter your M-Pesa PIN to complete the gift.");
      poll(r.reference);
    } catch (e) { setStatus("error"); setMsg(e instanceof Error ? e.message : "Something went wrong."); }
  }

  if (status === "success") {
    return (
      <div className="bg-cream rounded-[18px] p-7 shadow-[0_30px_60px_-30px_rgba(0,0,0,.5)] border border-sage-line text-center">
        <CheckCircle2 className="mx-auto text-forest mb-3" size={40} />
        <h3 className="text-[22px] text-forest">Thank you</h3>
        <p className="text-muted text-[15px] mt-2">Your gift means a survivor won’t face tomorrow alone. A receipt is on its way if you gave an email.</p>
      </div>
    );
  }

  const inputCls = "w-full text-[15px] px-3.5 py-3 border-[1.5px] border-sage-line rounded-[10px] bg-white focus:border-terracotta focus:outline-none";
  const busy = status === "sending" || status === "stk_sent";

  return (
    <div className="bg-cream rounded-[18px] p-7 shadow-[0_30px_60px_-30px_rgba(0,0,0,.5)] border border-sage-line">
      <div className="flex items-center gap-2.5 mb-4">
        <span className="w-9 h-9 rounded-full bg-terracotta flex items-center justify-center text-white"><Heart size={18} /></span>
        <h3 className="text-[22px] text-forest">Make a Donation</h3>
      </div>

      <div className="inline-flex w-full bg-sage rounded-xl p-[5px] gap-1 mb-3">
        {(["once", "monthly"] as const).map((f) => (
          <button key={f} onClick={() => setFreq(f)} className={cn("flex-1 font-semibold text-[14px] py-2.5 rounded-[9px] transition-colors", freq === f ? "bg-terracotta text-white" : "text-muted")}>
            {f === "once" ? "One-time" : "Monthly"}
          </button>
        ))}
      </div>

      {/* payment method */}
      <div className="grid grid-cols-2 gap-2.5 mb-3">
        {([["mpesa", "M-Pesa", Smartphone], ["card", "Card", CreditCard]] as const).map(([m, label, Ic]) => (
          <button key={m} onClick={() => setMethod(m)} className={cn("py-2.5 rounded-[10px] border-[1.5px] font-semibold text-[14px] inline-flex items-center justify-center gap-2 transition-colors", method === m ? "border-terracotta bg-terracotta/10 text-terracotta" : "border-sage-line bg-white text-ink hover:border-terracotta")}>
            <Ic size={16} /> {label}
          </button>
        ))}
      </div>

      {/* amount + currency */}
      <div className="flex items-center justify-between mb-2">
        <p className="text-[12px] uppercase tracking-[.1em] text-muted">Select amount</p>
        {method === "card" ? (
          <select value={selCurrency} onChange={(e) => { const c = e.target.value as Currency; setSelCurrency(c); saveCurrency(c); }}
            className="text-[13px] font-semibold text-forest bg-white border border-sage-line rounded-md px-2 py-1 focus:border-terracotta focus:outline-none">
            {(Object.keys(CURRENCIES) as Currency[]).map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        ) : (
          <span className="text-[12px] text-muted">Charged in KES</span>
        )}
      </div>
      <div className="grid grid-cols-2 gap-2.5 mb-2.5">
        {cfg.presets.map((a) => (
          <button key={a} onClick={() => setAmount(a)} className={cn("py-3 rounded-[10px] border-[1.5px] font-semibold text-[15px] transition-colors", amount === a ? "border-terracotta bg-terracotta/10 text-terracotta" : "border-sage-line bg-white text-ink hover:border-terracotta")}>
            {fmt(cfg.symbol, a)}
          </button>
        ))}
      </div>
      <input inputMode="numeric" placeholder={`Other amount (${cfg.label})`} value={cfg.presets.includes(amount) ? "" : amount} onChange={(e) => setAmount(e.target.value)} className={cn(inputCls, "mb-3")} />

      {method === "mpesa" && <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="M-Pesa phone (07…)" className={cn(inputCls, "mb-2.5")} />}
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name (optional)" className={cn(inputCls, "mb-2.5")} />
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email for receipt (optional)" className={cn(inputCls, "mb-4")} />

      <button onClick={onProceed} disabled={busy}
        className="w-full justify-center inline-flex items-center gap-2 font-semibold text-base px-6 py-[14px] rounded-[10px] bg-terracotta text-white hover:bg-terracotta-deep transition-colors disabled:opacity-70">
        {busy && <Loader2 size={18} className="animate-spin" />}
        {status === "stk_sent" ? "Waiting for M-Pesa…" : status === "sending" ? "Starting…" : `Proceed to donate${amount ? ` · ${fmt(cfg.symbol, amount)}` : ""}`}
      </button>

      {msg && <p className={cn("text-[13px] text-center mt-3", status === "error" || status === "failed" ? "text-alert" : "text-muted")}>{msg}</p>}
      {status === "idle" && <p className="text-[12px] text-muted text-center mt-3">Secure giving via M-Pesa or card. Card details are never entered here.</p>}
    </div>
  );
}
