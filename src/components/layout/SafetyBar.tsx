import { quickExit } from "@/lib/quickExit";

export function SafetyBar() {
  return (
    <div className="bg-forest-deep text-[#e7ded4] text-[13.5px]">
      <div className="mx-auto max-w-[1180px] px-7 flex items-center justify-between gap-4 min-h-[42px] flex-wrap">
        <div className="flex gap-[22px] flex-wrap items-center">
          <span className="inline-flex items-center gap-[7px]">
            <span className="w-[7px] h-[7px] rounded-full bg-alert" style={{ animation: "pulse-dot 2.4s infinite" }} />
            In immediate danger? Call <strong className="text-white font-semibold">[EMERGENCY NO. +254....]</strong>
          </span>
          <span>Confidential helpline: <strong className="text-white font-semibold">[HELPLINE NO. +254....]</strong> · [HOURS: 8:00AM-5:00 PM]</span>
        </div>
        <button
          onClick={quickExit}
          title="Leave this site quickly"
          className="bg-alert hover:bg-alert-deep text-white text-[13px] font-bold px-[15px] py-2 rounded-lg inline-flex items-center gap-[7px] transition-colors"
        >
          Exit this site <kbd className="text-[10.5px] font-semibold bg-white/20 px-[5px] py-px rounded">Esc</kbd>
        </button>
      </div>
    </div>
  );
}
