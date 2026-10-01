import {
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Heart,
  Smartphone,
  CreditCard,
  CheckCircle2,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";

import { cn } from "@/lib/utils";
import {
  startDonation,
  getDonationStatus,
  paymentsEnabled,
} from "@/lib/donations";

type Status =
  | "idle"
  | "checking"
  | "sending"
  | "success"
  | "failed"
  | "error";

const cleanAmount = (value: string) =>
  value.replace(/[^0-9.]/g, "");

const formatAmount = (
  symbol: string,
  value: string
) =>
  symbol.length > 1
    ? `${symbol} ${value}`
    : `${symbol}${value}`;

const inputClass =
  "w-full text-[15px] px-3.5 py-3 border-[1.5px] border-sage-line rounded-[10px] bg-white text-ink focus:border-terracotta focus:outline-none";

const labelClass =
  "text-[13px] font-semibold text-ink mb-1.5 block";

function normaliseKenyanPhone(value: string) {
  const digits = value.replace(/\D/g, "");

  if (digits.startsWith("254") && digits.length === 12) {
    return digits;
  }

  if (digits.startsWith("0") && digits.length === 10) {
    return `254${digits.slice(1)}`;
  }

  if (digits.length === 9 && digits.startsWith("7")) {
    return `254${digits}`;
  }

  return "";
}

export function DonateWidget() {
  const [searchParams] = useSearchParams();
  const returnedRef = searchParams.get("ref");

  const [method, setMethod] =
    useState<"mpesa" | "card">("mpesa");

  const [amount, setAmount] =
    useState("1,000");

  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [status, setStatus] =
    useState<Status>(returnedRef ? "checking" : "idle");

  const [message, setMessage] = useState("");

  const currency = "KES" as const;
  const presets = ["500", "1,000", "2,500", "5,000"];

  const amountNumber = useMemo(
    () => Number(cleanAmount(amount)),
    [amount]
  );

  useEffect(() => {
    if (!returnedRef) return;

    let cancelled = false;
    let attempts = 0;
    let timer: number | undefined;

    async function check() {
      if (cancelled) return;

      const result = await getDonationStatus(returnedRef!);

      if (cancelled) return;

      if (result.status === "paid") {
        setStatus("success");
        setMessage("");
        return;
      }

      if (
        result.status === "failed" ||
        result.status === "cancelled"
      ) {
        setStatus("failed");
        setMessage(
          "The payment was not completed. You can try again below."
        );
        return;
      }

      attempts += 1;

      if (attempts >= 6) {
        setStatus("idle");
        setMessage(
          "We have not received payment confirmation yet. If you completed the payment, please allow a little time for the status to update."
        );
        return;
      }

      timer = window.setTimeout(check, 3000);
    }

    check();

    return () => {
      cancelled = true;
      if (timer) window.clearTimeout(timer);
    };
  }, [returnedRef]);

  async function onProceed() {
    if (!paymentsEnabled()) {
      setStatus("error");
      setMessage(
        "Online payments are not configured yet. Please use the direct M-Pesa or bank details on the Donate page."
      );
      return;
    }

    if (!Number.isFinite(amountNumber) || amountNumber <= 0) {
      setStatus("error");
      setMessage("Please enter a valid donation amount.");
      return;
    }

    if (method === "mpesa") {
      const normalised = normaliseKenyanPhone(phone);

      if (!normalised) {
        setStatus("error");
        setMessage(
          "Enter a valid Kenyan M-Pesa number, for example 0712 345 678."
        );
        return;
      }
    }

    setStatus("sending");
    setMessage("");

    try {
      const result = await startDonation({
        amount: cleanAmount(amount),
        currency,
        method,
        name: name.trim() || undefined,
        email: email.trim() || undefined,
        phone:
          method === "mpesa"
            ? normaliseKenyanPhone(phone)
            : undefined,
      });

      window.location.assign(result.checkout_url);
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong starting the payment."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="bg-cream rounded-[18px] p-7 shadow-[0_30px_60px_-30px_rgba(0,0,0,.5)] border border-sage-line text-center">
        <CheckCircle2
          className="mx-auto text-forest mb-3"
          size={40}
          strokeWidth={1.8}
        />

        <h3 className="text-[22px] text-forest">
          Thank you for your donation
        </h3>

        <p className="text-muted text-[15px] mt-2">
          Your payment has been confirmed. If you provided an email address, a receipt may also be sent to you.
        </p>
      </div>
    );
  }

  const busy =
    status === "sending" || status === "checking";

  return (
    <div className="bg-cream rounded-[18px] p-7 shadow-[0_30px_60px_-30px_rgba(0,0,0,.5)] border border-sage-line">
      <div className="flex items-center gap-2.5 mb-4">
        <span className="w-9 h-9 rounded-full bg-terracotta flex items-center justify-center text-white">
          <Heart size={18} />
        </span>

        <div>
          <h3 className="text-[22px] text-forest">
            Make a Donation
          </h3>
          <p className="text-xs text-muted mt-0.5">
            One-time giving
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5 mb-4">
        {(
          [
            ["mpesa", "M-Pesa", Smartphone],
            ["card", "Card", CreditCard],
          ] as const
        ).map(([value, label, Icon]) => (
          <button
            key={value}
            type="button"
            onClick={() => setMethod(value)}
            className={cn(
              "py-2.5 rounded-[10px] border-[1.5px] font-semibold text-[14px] inline-flex items-center justify-center gap-2 transition-colors",
              method === value
                ? "border-terracotta bg-terracotta/10 text-terracotta"
                : "border-sage-line bg-white text-ink hover:border-terracotta"
            )}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between mb-2">
        <p className="text-[12px] uppercase tracking-[.1em] text-muted">
          Select amount
        </p>

        <span className="text-[12px] text-muted">
          Charged in KES
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2.5 mb-3">
        {presets.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => setAmount(preset)}
            className={cn(
              "py-3 rounded-[10px] border-[1.5px] font-semibold text-[15px] transition-colors",
              amount === preset
                ? "border-terracotta bg-terracotta/10 text-terracotta"
                : "border-sage-line bg-white text-ink hover:border-terracotta"
            )}
          >
            {formatAmount("KES", preset)}
          </button>
        ))}
      </div>

      <div className="mb-3">
        <label htmlFor="donation-amount" className={labelClass}>
          Other amount
        </label>
        <input
          id="donation-amount"
          inputMode="decimal"
          value={
            presets.includes(amount)
              ? ""
              : amount
          }
          onChange={(event) => setAmount(event.target.value)}
          placeholder="KES"
          className={inputClass}
        />
      </div>

      {method === "mpesa" && (
        <div className="mb-3">
          <label htmlFor="donation-phone" className={labelClass}>
            M-Pesa phone number
          </label>
          <input
            id="donation-phone"
            type="tel"
            autoComplete="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="0712 345 678"
            className={inputClass}
          />
        </div>
      )}

      <div className="mb-3">
        <label htmlFor="donation-name" className={labelClass}>
          Name <span className="font-normal text-muted">(optional)</span>
        </label>
        <input
          id="donation-name"
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className={inputClass}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="donation-email" className={labelClass}>
          Email for receipt <span className="font-normal text-muted">(optional)</span>
        </label>
        <input
          id="donation-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className={inputClass}
        />
      </div>

      <button
        type="button"
        onClick={onProceed}
        disabled={busy}
        className="w-full justify-center inline-flex items-center gap-2 font-semibold text-base px-6 py-[14px] rounded-[10px] bg-terracotta text-white hover:bg-terracotta-deep transition-colors disabled:opacity-70"
      >
        {busy && (
          <Loader2 size={18} className="animate-spin" />
        )}

        {status === "checking"
          ? "Checking payment..."
          : status === "sending"
            ? "Opening secure checkout..."
            : `Continue securely${amountNumber > 0 ? ` · ${formatAmount("KES", amount)}` : ""}`}
      </button>

      {message && (
        <p
          role={status === "error" || status === "failed" ? "alert" : undefined}
          aria-live="polite"
          className={cn(
            "text-[13px] text-center mt-3",
            status === "error" || status === "failed"
              ? "text-alert"
              : "text-muted"
          )}
        >
          {message}
        </p>
      )}

      <div className="flex items-start gap-2 text-[12px] text-muted mt-3">
        <ShieldCheck size={15} className="shrink-0 mt-0.5" />
        <p>
          Payment is completed on IntaSend's secure checkout. AST does not collect or store your card details or M-Pesa PIN.
        </p>
      </div>
    </div>
  );
}
