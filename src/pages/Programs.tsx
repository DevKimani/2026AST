import { Reveal } from "@/components/Reveal";

import {
  Banner,
  Crumb,
} from "@/components/blocks/Banner";

import { Section } from "@/components/blocks/Section";

import { ProgramCard } from "@/components/blocks/Cards";

import { CtaBand } from "@/components/blocks/CtaBand";

import { ProgramIcon } from "@/components/ProgramIcon";

import { programs } from "@/data/programs";

const blurb: Record<string, string> = {
  gbv:
    "Survivor-centred support, safety planning, psychosocial care, and appropriate referral options.",

  "capacity-building":
    "Learning that strengthens confidence, practical skills, leadership, and safer community responses.",

  "community-advocacy":
    "Community dialogue and awareness that challenge harmful norms and strengthen prevention.",

  "economic-empowerment":
    "Livelihood and enterprise support that can strengthen financial independence and resilience.",
};

export default function Programs() {
  return (
    <>
      <Banner
        crumb={
          <Crumb label="Programs" />
        }
        eyebrow="What we do"
        title="Our Programmes"
        text="Our four programme areas connect immediate support with longer-term prevention, skills, community engagement, and economic resilience. Participation and support depend on individual needs, programme capacity, and what is safe and appropriate."
      />

      <Section>
        <div className="grid gap-[22px] md:grid-cols-2">

          {programs.map((program) => (

            <Reveal key={program.slug}>

              <ProgramCard
                to={`/programs/${program.slug}`}
                icon={
                  <ProgramIcon
                    name={program.icon}
                  />
                }
                title={program.name}
              >
                {blurb[program.slug]}
              </ProgramCard>

            </Reveal>

          ))}

        </div>
      </Section>

      <CtaBand />
    </>
  );
}