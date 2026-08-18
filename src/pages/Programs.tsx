import { Reveal } from "@/components/Reveal";
import { Banner, Crumb } from "@/components/blocks/Banner";
import { Section } from "@/components/blocks/Section";
import { ProgramCard } from "@/components/blocks/Cards";
import { CtaBand } from "@/components/blocks/CtaBand";
import { ProgramIcon } from "@/components/ProgramIcon";
import { programs } from "@/data/programs";

const blurb: Record<string, string> = {
  gbv: "Confidential support, safety, and accompaniment for survivors.",
  "capacity-building": "Training that equips survivors, communities, and responders.",
  "community-advocacy": "Changing the norms and systems that allow violence to continue.",
  "economic-empowerment": "Livelihoods, skills, and enterprise so survivors can stand on their own.",
};

export default function Programs() {
  return (
    <>
      <Banner crumb={<Crumb label="Programs" />} eyebrow="What we do" title="Our Programs"
        text="Ending gender-based violence takes more than a single response. Our programmes work together across a survivor’s whole journey — from crisis, through healing, to independence — while tackling the root causes of violence." />
      <Section>
        <div className="grid gap-[22px] md:grid-cols-2">
          {programs.map((p) => (
            <Reveal key={p.slug}>
              <ProgramCard to={`/programs/${p.slug}`} icon={<ProgramIcon name={p.icon} />} title={p.name}>{blurb[p.slug]}</ProgramCard>
            </Reveal>
          ))}
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
