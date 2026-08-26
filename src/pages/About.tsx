import { Users } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Banner, Crumb } from "@/components/blocks/Banner";
import { Section, SectionHead } from "@/components/blocks/Section";
import { CtaBand } from "@/components/blocks/CtaBand";

const values: [string, string][] = [
  ["Empowerment", "Equipping people with the tools, knowledge, and confidence to take charge of their own futures."],
  ["Zero Tolerance for GBV", "Steadfast in ending gender-based violence — a safe, non-judgmental space where survivors are believed, supported, and empowered to heal."],
  ["Integrity", "Acting with transparency, honesty, and accountability in every project and every shilling."],
  ["Compassion", "Meeting every individual with empathy, dignity, and a non-judgmental heart."],
  ["Inclusivity", "Embracing the diversity of our community, ensuring every voice — especially women and youth — is heard and respected."],
  ["Collaboration", "Working with local partners, government agencies, and community members to create lasting, sustainable change."],
  ["Resilience", "Fostering the strength not just to survive, but to rise and flourish together."],
];
const milestones: [string, string][] = [
  ["2025", "Arise Strong Together is formally registered as a community-based organisation (CBO) in June."],
  ["2025", "Safe spaces established for survivors to break the silence and access support."],
  ["[YEAR]", "[Next milestone — e.g. economic-empowerment groups launched]."],
  ["[YEAR]", "[Reach milestone]."],
];

export default function About() {
  return (
    <>
      <Banner crumb={<Crumb label="About Us" />} eyebrow="Who we are" title="About Arise Strong Together"
        text="Survivor-led, community-rooted, and unwilling to accept violence as normal." />

      <Section>
        <div className="grid lg:grid-cols-[1fr_340px] gap-14 items-start">
          <Reveal className="prose">
            <h2>Turning Pain into Purpose</h2>
            <p>Arise Strong Together grew out of one survivor’s journey. Our founder lived through gender-based violence and, through specialised healing and GBV training, not only rebuilt her own strength but came to understand-firsthand-the gaps in the support available to others.</p>
            <p>That personal healing became the catalyst for something larger. She saw how many people in the community were caught in cycles of silence, without a safe space or the professional tools to recover. Determined that no one else should walk that path alone, she founded Arise Strong Together.</p>
            <p>What began as a personal mission to heal became a structured community movement. We formally registered as <strong>Arise Strong Together CBO in June 2025</strong>-a platform where counselling, advocacy, and empowerment meet. By combining professional counselling training with lived experience as a survivor, we approach every person with genuine empathy and expert guidance.</p>
            <h2>Mission</h2>
            <p>To support survivors of gender-based violence to heal and reclaim their lives, and to work alongside women, youth, and the wider community to prevent violence and build a future free from GBV.</p>
            <h2>Vision</h2>
            <p>A community-and a society-free from gender-based violence, where every person, especially women and youth, can live with dignity, safety, and opportunity.</p>
            <h2>Why We Rise</h2>
            <p>We exist to prove that healing is possible, and that community support is the bridge to a better future-helping others turn their experiences into strength so that, together, we can all arise.</p>
          </Reveal>
          <Reveal className="bg-white border border-sage-line rounded-[14px] p-[26px] lg:sticky lg:top-[100px]">
            <h3 className="text-xl mb-2">At a glance</h3>
            {([["2025", "Registered as a CBO"], ["Location", "Based in Samburu, Kenya"], ["300", "Women & girls supported"]] as [string, string][]).map(([a, b]) => (
              <p key={b} className="mb-2"><span className="font-display text-2xl text-ochre">{a}</span><br /><span className="text-[13px] text-muted">{b}</span></p>
            ))}
          </Reveal>
        </div>
      </Section>

      <Section variant="sage">
        <SectionHead eyebrow="What guides us" title="Our Core Values" />
        <div className="grid gap-[22px] md:grid-cols-2">
          {values.map(([t, d]) => (
            <Reveal key={t} className="border-l-[3px] border-ochre pl-5 py-1.5">
              <h3 className="text-[19px] text-forest mb-1">{t}</h3>
              <p className="text-muted text-[15px]">{d}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow="Our people" title="Leadership Team" />
        <div className="grid gap-[22px] grid-cols-2 lg:grid-cols-4">
          {[
            { name: "Peris Njoroge", role: "Founder & Counsellor", img: "/images/story.jpg", bio: "Survivor, counsellor, and founder of Arise Strong Together." },
    
          ].map((m, i) => (
            <Reveal key={i} className="text-center">
              <div className="aspect-square rounded-[14px] mb-3.5 border border-sage-line overflow-hidden flex items-center justify-center text-forest bg-gradient-to-br from-sage to-[#e6d6c2]">
                {m.img ? <img src={m.img} alt={m.name} className="w-full h-full object-cover" /> : <Users size={40} strokeWidth={1.5} />}
              </div>
              <h3 className="text-lg text-forest">{m.name}</h3>
              <div className="text-[13.5px] text-terracotta font-semibold">{m.role}</div>
              <p className="text-[13px] text-muted mt-1.5">{m.bio}</p>
            </Reveal>
          ))}
        </div>
    
      </Section>

      <Section variant="sage">
        <SectionHead eyebrow="Our journey" title="Milestones" />
        <Reveal className="max-w-[640px] mx-auto border-l-2 border-sage-line ml-2 pl-[26px] flex flex-col gap-[26px]">
          {milestones.map(([y, d], i) => (
            <div key={i} className="relative before:content-[''] before:absolute before:-left-[33px] before:top-1 before:w-3 before:h-3 before:rounded-full before:bg-ochre before:border-[3px] before:border-paper">
              <div className="font-display text-xl text-ochre">{y}</div>
              <p className="text-muted text-[15px]">{d}</p>
            </div>
          ))}
        </Reveal>
      </Section>

      <CtaBand />
    </>
  );
}
