import { useState } from "react";
import { Shield, MessageCircle, Heart, BookOpen, Users, Coins, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "@/components/Reveal";
import { Section, Eyebrow, SectionHead } from "@/components/blocks/Section";
import { ProgramCard, Stat } from "@/components/blocks/Cards";
import { CtaBand } from "@/components/blocks/CtaBand";
import { DonateWidget } from "@/components/blocks/DonateWidget";
import { Photo } from "@/components/Photo";

export default function Home() {
  const [heroErr, setHeroErr] = useState(false);
  return (
    <>
      {/* HERO — full-bleed photo, survivor CTA (left) + donation widget (right) */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10" style={{ background: "linear-gradient(135deg,#2E5E4E,#163227)" }}>
          {!heroErr && (
            <img src="/images/hero.jpg" alt="" onError={() => setHeroErr(true)} className="w-full h-full object-cover" />
          )}
          <div className="absolute inset-0" style={{ background: "linear-gradient(90deg,rgba(22,50,39,.92) 0%,rgba(22,50,39,.72) 45%,rgba(22,50,39,.45) 100%)" }} />
        </div>

        <div className="mx-auto max-w-[1180px] px-7 grid lg:grid-cols-[1.05fr_.9fr] gap-12 items-center pt-14 pb-20 min-h-[560px]">
          <div className="text-white reveal in">
            <span className="inline-flex items-center gap-[9px] text-[12.5px] tracking-[.16em] uppercase font-semibold text-[#f0d9b0] before:content-[''] before:w-5 before:h-[1.5px] before:bg-ochre">
              Samburu County, Kenya
            </span>
            <h1 className="text-[clamp(40px,5.4vw,62px)] tracking-[-.015em] mt-5 text-white">
              From Surviving to{" "}
              <span className="relative text-[#e8b877] whitespace-nowrap">
                Thriving
                <svg className="absolute left-0 -right-1 -bottom-3 h-[20px] w-full" viewBox="0 0 300 24" fill="none" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M4 20 C 80 20, 150 20, 296 8" stroke="#C98A3B" strokeWidth="3" strokeLinecap="round" />
                  <path d="M255 12 C 258 4, 266 2, 273 3 C 272 10, 264 13, 257 12" fill="#C98A3B" />
                </svg>
              </span>
            </h1>
            <p className="text-[19px] text-white/85 max-w-[38ch] mt-6">
              Arise Strong Together supports adolescent girls, young mothers, and women affected by gender-based violence — through holistic care, psychosocial support, and economic empowerment.
            </p>
            <div className="flex gap-3.5 mt-8 flex-wrap">
              <Link to="/get-help" className="inline-flex items-center gap-2 font-semibold text-base px-6 py-[14px] rounded-[10px] bg-white text-forest hover:bg-[#f2ede4] transition-colors">
                I need help <ArrowRight size={17} />
              </Link>
              <Link to="/programs" className="inline-flex items-center gap-2 font-semibold text-base px-6 py-[14px] rounded-[10px] border-[1.5px] border-white/55 text-white bg-white/10 hover:bg-white/20 transition-colors">
                Our Programs
              </Link>
            </div>
            <div className="mt-6 text-[14.5px] text-white/80 flex items-center gap-2.5">
              <Shield size={18} className="flex-none text-[#e8b877]" /> Confidential · Free · At your own pace
            </div>
          </div>

          <div className="reveal in"><DonateWidget /></div>
        </div>
      </section>

      {/* HELP STRIP */}
      <div className="bg-terracotta text-white">
        <div className="mx-auto max-w-[1180px] px-7 flex items-center justify-between gap-6 py-[22px] flex-wrap max-[600px]:flex-col max-[600px]:items-start">
          <div className="flex items-center gap-4">
            <MessageCircle size={30} strokeWidth={1.8} className="flex-none" />
            <div>
              <h3 className="text-[22px]">You are not alone.</h3>
              <p className="text-[14.5px] text-white/85 mt-0.5">If you’re experiencing gender-based violence, confidential support is one message away.</p>
            </div>
          </div>
          <Link to="/get-help" className="inline-flex items-center gap-2 font-bold text-[15px] px-5 py-[11px] rounded-[10px] bg-white text-terracotta hover:bg-[#fbeee6] transition-colors">Get help now</Link>
        </div>
      </div>

      {/* MISSION — text + photo */}
      <Section>
        <div className="grid lg:grid-cols-[1fr_1fr] gap-14 items-center">
          <Reveal>
            <Eyebrow>Our mission</Eyebrow>
            <h2 className="text-[clamp(26px,3.2vw,38px)] mt-3.5 tracking-[-.01em]">Standing with women &amp; girls when they need it most</h2>
            <p className="text-lg text-muted mt-5">Arise Strong Together is a survivor-founded community-based organisation in Samburu County, registered in June 2025. We combine professional counselling with lived experience — walking with survivors through healing while working alongside women, youth, and the wider community to prevent violence.</p>
            <Link to="/about" className="inline-flex items-center gap-2 font-semibold text-terracotta mt-6 hover:gap-3 transition-[gap]">Learn our story <ArrowRight size={17} /></Link>
          </Reveal>
          <Reveal><Photo src="/images/mission.jpg" alt="a woman at her shoe business, supported through economic empowerment" caption="Economic empowerment in Samburu" className="aspect-[5/4]" /></Reveal>
        </div>
      </Section>

      {/* STATS */}
      <Section variant="sage">
        <SectionHead eyebrow="Our impact" title="Change we can measure" />
        <div className="grid gap-[22px] grid-cols-1 sm:grid-cols-3">
          <Reveal><Stat n="200" label="young women given free psychosocial support" /></Reveal>
          <Reveal><Stat n="100" label="girls given free psychosocial support" /></Reveal>
          <Reveal><Stat n="2025" label="registered as a community-based organisation" /></Reveal>
        </div>
        <p className="text-center mt-6 text-[15px] text-muted max-w-[70ch] mx-auto">Beyond the numbers: the community is challenging harmful cultural norms, GBV cases are increasingly reported and handled in a survivor-centred way, and referral pathways are widely understood — with perpetrators more often held to account.</p>
      </Section>

      {/* PROGRAMS */}
      <Section>
        <Reveal className="flex justify-between items-end gap-5 mb-[42px] flex-wrap">
          <div>
            <Eyebrow>What we do</Eyebrow>
            <h2 className="text-[clamp(26px,3.2vw,38px)] mt-3.5 max-w-[16ch]">Holistic programs for lasting change</h2>
          </div>
          <Link to="/programs" className="inline-flex items-center gap-2 font-semibold text-base px-6 py-[14px] rounded-[10px] bg-transparent text-forest border-[1.5px] border-sage-line hover:border-forest hover:bg-sage transition-colors">All programs</Link>
        </Reveal>
        <div className="grid gap-[22px] md:grid-cols-2">
          <Reveal><ProgramCard to="/programs/gbv" icon={<Heart size={24} strokeWidth={1.8} />} title="Gender-Based Violence Response">Safe spaces, free psychosocial support, and accompaniment for survivors seeking safety and healing.</ProgramCard></Reveal>
          <Reveal><ProgramCard to="/programs/capacity-building" icon={<BookOpen size={24} strokeWidth={1.8} />} title="Capacity Building">Workshops that build confidence and leadership for women and youth.</ProgramCard></Reveal>
          <Reveal><ProgramCard to="/programs/community-advocacy" icon={<Users size={24} strokeWidth={1.8} />} title="Community Advocacy">Grassroots campaigns challenging the norms that allow violence to continue.</ProgramCard></Reveal>
          <Reveal><ProgramCard to="/programs/economic-empowerment" icon={<Coins size={24} strokeWidth={1.8} />} title="Economic Empowerment">Sustainable micro-enterprises so survivors can build independent futures.</ProgramCard></Reveal>
        </div>
      </Section>

      {/* STORY */}
      <Section variant="green">
        <div className="grid lg:grid-cols-[1.1fr_.9fr] gap-12 items-center">
          <Reveal>
            <Eyebrow className="text-[#e8c9a6]">Turning pain into purpose</Eyebrow>
            <blockquote className="font-display text-[clamp(24px,2.8vw,32px)] leading-[1.32] mt-[18px]">“My survival was never meant to be a private victory — it was a blueprint for helping others.”</blockquote>
            <div className="mt-[22px] text-[14.5px] text-[#d8c4ad]">— [Founder’s name], Founder of Arise Strong Together · survivor and counsellor</div>
            <p className="mt-2.5 text-[12.5px] text-[#c6b299] italic max-w-[52ch]">Our founder’s own story. Add their name and photo when ready.</p>
          </Reveal>
          <Reveal><Photo src="/images/story.jpg" alt="Founder of Arise Strong Together" className="aspect-[5/4]" /></Reveal>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
