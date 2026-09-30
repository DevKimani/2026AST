import { useTranslation } from "react-i18next";
import { quickExit } from "@/lib/quickExit";

const HELPLINE = "0180 740 140";
const numClass = "text-white font-semibold underline underline-offset-2 whitespace-nowrap";

export function SafetyBar() {
  const { t } = useTranslation();
  return (
    <div className="bg-forest-deep text-[#e7ded4] text-[12px] sm:text-[13.5px]">
      <div className="mx-auto max-w-[1180px] px-4 sm:px-7 flex items-center justify-between gap-3 py-2">
        <div className="flex gap-x-5 gap-y-0.5 flex-wrap items-center min-w-0">
          <span className="inline-flex items-center gap-[6px]">
            <span className="w-[7px] h-[7px] rounded-full bg-alert shrink-0" style={{ animation: "pulse-dot 2.4s infinite" }} />
            {t("safety.dangerPre")} <a href="tel:999" className={numClass}>999</a>
          </span>
          <span className="hidden sm:inline">
            {t("safety.helpline")} <a href="tel:0180740140" className={numClass}>{HELPLINE}</a>
          </span>
        </div>
        <button
          onClick={quickExit}
          title={t("safety.exit")}
          className="shrink-0 bg-alert hover:bg-alert-deep text-white text-[12px] sm:text-[13px] font-bold px-3 sm:px-[15px] py-1.5 rounded-lg inline-flex items-center gap-1.5 sm:gap-[7px] transition-colors"
        >
          {t("safety.exit")} <kbd className="hidden sm:inline text-[10.5px] font-semibold bg-white/20 px-[5px] py-px rounded">Esc</kbd>
        </button>
      </div>
    </div>
  );
}