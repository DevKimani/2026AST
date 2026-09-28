import { useState } from "react";
import { Smartphone, Landmark, CreditCard, Coins, Heart } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Banner, Crumb } from "@/components/blocks/Banner";
import { Section, SectionHead } from "@/components/blocks/Section";
import { Callout } from "@/components/blocks/Callout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const tiers = [
  ["KES 5,000", "Psychosocial support and counselling for a survivor"],
  ["KES 15,000", "Skills and tools to help a young woman start a small business"],
  ["KES 30,000", "A community dialogue to prevent gender-based violence"],
];
const channels = [
  [<Smartphone size={20} strokeWidth={1.8} />, "M-Pesa (Lipa na M-Pesa)", "Paybill 400200 · Account 1201208"],
  [<Landmark size={20} strokeWidth={1.8} />, "Bank transfer", "Co-operative Bank · Arise Strong Together · A/C 01102079018001"],
] as const;


export default function Donate() {
  const [freq, setFreq] = useState<"one" | "monthly">("one");
  return (
    <>
      <Banner green crumb={<Crumb label="Donate" mid={{ to: "/get-involved", label: "Get Involved" }} />} eyebrow="Your gift helps a survivor rise" title="Donate"
        text="Every donation, one-time or monthly, directly funds the support, skills, and safety that help survivors rebuild their lives." />

      <Section>
        <div className="grid lg:grid-cols-[1fr_340px] gap-14 items-start">
          <div>
            <Reveal className="mb-[26px]">
              <h2 className="font-display text-[28px] text-forest">Choose your gift</h2>
              <div className="inline-flex bg-sage rounded-xl p-[5px] gap-1 my-[18px]">
                <button onClick={() => setFreq("one")} className={cn("font-semibold text-[15px] px-[22px] py-2.5 rounded-[9px] transition-colors", freq === "one" ? "bg-white text-forest shadow-[0_2px_8px_-3px_rgba(0,0,0,.2)]" : "text-muted")}>One-time</button>
                <button onClick={() => setFreq("monthly")} className={cn("font-semibold text-[15px] px-[22px] py-2.5 rounded-[9px] transition-colors", freq === "monthly" ? "bg-white text-forest shadow-[0_2px_8px_-3px_rgba(0,0,0,.2)]" : "text-muted")}>Monthly</button>
              </div>
              <div className="grid sm:grid-cols-3 gap-[18px]">
                {tiers.map(([a, d]) => (
                  <button key={d} className="border-[1.5px] border-sage-line rounded-[14px] p-[26px] text-center bg-white hover:border-forest hover:-translate-y-[3px] transition-[border-color,transform]">
                    <div className="font-display text-[30px] text-ochre">{a}</div>
                    <div className="text-sm text-muted mt-2">{d}</div>
                  </button>
                ))}
              </div>
              <div className="mt-[18px]"><Button href="#channels" size="lg">Continue to give</Button></div>
            </Reveal>
            <Reveal className="prose">
              <h2>Why donations matter</h2>
              <p>As a [registered non-profit], we depend on people like you. Donations let us answer the helpline, keep programmes running, and reach survivors who have nowhere else to turn. Your support is not charity, it’s solidarity.</p>
              <h2>How donations are used</h2>
              <ul>
                <li><span className="text-ochre">[X]%</span> directly to survivor support and programmes</li>
                <li><span className="text-ochre">[X]%</span> to community prevention and advocacy</li>
                <li><span className="text-ochre">[X]%</span> to running the organisation</li>
              </ul>
            </Reveal>
          </div>
          <Reveal className="bg-plum text-white rounded-[14px] p-[26px] lg:sticky lg:top-[100px]">
            <h3 className="text-xl mb-2 text-white">Your impact</h3>
            <p className="text-[14.5px] text-white/[.88]">Right now, a survivor is deciding whether to reach out. Your gift makes sure someone is there when she does.</p>
            <p className="text-white font-display text-xl leading-[1.3] mt-2">“Not charity, solidarity.”</p>
          </Reveal>
        </div>
      </Section>

      <Section variant="sage" id="channels">
        <div className="max-w-[820px] mx-auto">
          <SectionHead eyebrow="Ways to give" title="Donation channels" />
          <Reveal className="grid sm:grid-cols-2 gap-3.5">
            {channels.map(([ic, b, s]) => (
              <div key={b} className="border border-sage-line rounded-xl p-[18px] flex gap-3 items-center bg-white">
                <div className="w-10 h-10 rounded-[10px] bg-sage flex items-center justify-center text-forest flex-none">{ic}</div>
                <div><b className="block text-[15px]">{b}</b><span className="text-[13.5px] text-muted">{s}</span></div>
              </div>
            ))}
          </Reveal>
          <p className="text-[13px] text-muted text-center mt-4">Prefer to give directly? Use the M-Pesa Paybill or bank details above.</p>
        </div>
      </Section>

      <Section>
        <Reveal className="max-w-[760px] mx-auto">
          <Callout variant="calm" icon={<Heart size={22} strokeWidth={1.8} />} title="Thank you">
            Your generosity means a survivor won’t have to face tomorrow alone. We’ll put your gift to work with care, and show you the difference it makes.
          </Callout>
        </Reveal>
      </Section>
    </>
  );
}
