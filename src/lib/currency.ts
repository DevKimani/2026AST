export type Currency = "KES" | "USD" | "GBP" | "EUR";

export const CURRENCIES: Record<Currency, { label: string; symbol: string; presets: string[] }> = {
  KES: { label: "KES", symbol: "KES", presets: ["500", "1,000", "2,500", "5,000"] },
  USD: { label: "USD", symbol: "$", presets: ["5", "10", "25", "50"] },
  GBP: { label: "GBP", symbol: "£", presets: ["5", "10", "20", "50"] },
  EUR: { label: "EUR", symbol: "€", presets: ["5", "10", "25", "50"] },
};

const EUROZONE = ["AT","BE","CY","EE","FI","FR","DE","GR","IE","IT","LV","LT","LU","MT","NL","PT","SK","SI","ES","HR"];

export function currencyForCountry(cc?: string): Currency {
  const c = (cc || "").toUpperCase();
  if (c === "KE") return "KES";
  if (c === "US") return "USD";
  if (c === "GB") return "GBP";
  if (EUROZONE.includes(c)) return "EUR";
  return "KES"; // local-first default when unknown
}

const KEY = "ast_currency";
export function savedCurrency(): Currency | null {
  try { const v = localStorage.getItem(KEY); return v && v in CURRENCIES ? (v as Currency) : null; } catch { return null; }
}
export function saveCurrency(c: Currency) { try { localStorage.setItem(KEY, c); } catch { /* ignore */ } }

export async function detectCurrency(): Promise<Currency> {
  const manual = savedCurrency();
  if (manual) return manual;
  try {
    const r = await fetch("/api/geo");
    if (r.ok) {
      const j = await r.json();
      if (j.country) return currencyForCountry(j.country);
    }
  } catch { /* fall through */ }
  const region = (navigator.language.split("-")[1] || "").toUpperCase();
  return currencyForCountry(region);
}
