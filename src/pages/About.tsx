import { Reveal } from "@/components/Reveal";
import {
  Banner,
  Crumb,
} from "@/components/blocks/Banner";
import {
  Section,
  SectionHead,
} from "@/components/blocks/Section";
import { Callout } from "@/components/blocks/Callout";
import { CtaBand } from "@/components/blocks/CtaBand";
import { Photo } from "@/components/Photo";
import { ShieldCheck } from "lucide-react";

const values: [string, string][] = [
  [
    "Empowerment",
    "Supporting people with information, practical tools, and opportunities to make their own decisions and shape their futures.",
  ],
  [
    "Safety & dignity",
    "Creating non-judgmental spaces where people affected by gender-based violence are treated with respect and their choices matter.",
  ],
  [
    "Integrity",
    "Working with honesty, transparency, and accountability in our programmes, partnerships, and use of resources.",
  ],
  [
    "Compassion",
    "Meeting people with empathy while respecting boundaries, confidentiality, and individual circumstances.",
  ],
  [
    "Inclusivity",
    "Working to ensure women, youth, and other community members can participate and be heard without discrimination.",
  ],
  [
    "Collaboration",
    "Working with community members, local leaders, service providers, institutions, and partners where collaboration can strengthen support and prevention.",
  ],
  [
    "Resilience",
    "Recognising the strengths people and communities already have and supporting pathways toward recovery, independence, and wellbeing.",
  ],
];

const milestones: [string, string][] = [
  [
    "June 2025",
    "Arise Strong Together is formally registered as a community-based organisation in Kenya.",
  ],
  [
    "Today",
    "AST is developing its work across survivor support, capacity building, community advocacy, and economic empowerment in Samburu County.",
  ],
];

export default function About() {
  return (
    <>
      <Banner
        crumb={<Crumb label="About Us" />}
        eyebrow="Who we are"
        title="About Arise Strong Together"
        text="Survivor-founded, community-rooted, and committed to dignity, safety, and practical pathways forward."
      />

      <Section>
        <div className="grid lg:grid-cols-[1fr_340px] gap-14 items-start">

          <Reveal className="prose">

            <h2>Turning pain into purpose</h2>

            <p>
              Arise Strong Together grew from a
              survivor's lived experience of
              gender-based violence and the belief
              that people seeking support should not
              have to navigate healing alone.
            </p>

            <p>
              That experience highlighted the need
              for support that is compassionate,
              practical, community-rooted, and
              centred on the choices of the person
              seeking help. AST was created to bring
              those principles together through
              survivor support, community engagement,
              skills-building, and livelihood work.
            </p>

            <p>
              Arise Strong Together was formally
              registered as a community-based
              organisation in June 2025. Our work is
              based in Samburu County, with a focus
              on strengthening support for people
              affected by gender-based violence while
              also addressing prevention and the
              social and economic conditions that can
              increase vulnerability.
            </p>

            <h2>Mission</h2>

            <p>
              To support survivors of gender-based
              violence to heal and reclaim their
              lives, and to work alongside women,
              youth, and the wider community to
              prevent violence and build safer,
              more resilient communities.
            </p>

            <h2>Vision</h2>

            <p>
              A society free from gender-based
              violence, where every person can live
              with dignity, safety, opportunity, and
              the freedom to make choices about their
              own future.
            </p>

          </Reveal>

          <Reveal className="bg-white border border-sage-line rounded-[14px] p-[26px] lg:sticky lg:top-[100px]">

            <h3 className="text-xl mb-4">
              At a glance
            </h3>

            {(
              [
                [
                  "2025",
                  "Registered as a community-based organisation",
                ],
                [
                  "Samburu",
                  "Based in Samburu County, Kenya",
                ],
                [
                  "4 areas",
                  "Support, skills, advocacy, and livelihoods",
                ],
              ] as [string, string][]
            ).map(([a, b]) => (
              <p
                key={b}
                className="mb-4 last:mb-0"
              >
                <span className="font-display text-2xl text-ochre">
                  {a}
                </span>

                <br />

                <span className="text-[13px] text-muted">
                  {b}
                </span>
              </p>
            ))}

          </Reveal>

        </div>
      </Section>

      <Section variant="sage">

        <SectionHead
          eyebrow="How we work"
          title="Survivor-centred by design"
        />

        <Reveal className="max-w-[840px] mx-auto">

          <Callout
            variant="calm"
            icon={
              <ShieldCheck
                size={22}
                strokeWidth={1.8}
              />
            }
            title="Choice, confidentiality, and do-no-harm"
          >
            We aim to give people clear options
            without pressuring them to disclose more
            than they want to share or to take a
            particular course of action. Access to
            sensitive information should be limited
            to people who need it for their role,
            with safeguarding and legal exceptions
            handled as carefully and transparently
            as possible.
          </Callout>

        </Reveal>

      </Section>

      <Section>

        <SectionHead
          eyebrow="What guides us"
          title="Our core values"
        />

        <div className="grid gap-[22px] md:grid-cols-2">

          {values.map(([title, description]) => (

            <Reveal
              key={title}
              className="border-l-[3px] border-ochre pl-5 py-1.5"
            >

              <h3 className="text-[19px] text-forest mb-1">
                {title}
              </h3>

              <p className="text-muted text-[15px]">
                {description}
              </p>

            </Reveal>

          ))}

        </div>
      </Section>

      <Section variant="sage">

        <SectionHead
          eyebrow="Our people"
          title="Leadership"
        />

        <div className="max-w-[280px] mx-auto">

          <Reveal className="text-center">

            <Photo
              src="/images/story.jpg"
              alt="Peris Njoroge, founder of Arise Strong Together"
              className="aspect-square mb-3.5"
              rounded="rounded-[14px]"
            />

            <h3 className="text-lg text-forest">
              Peris Njoroge
            </h3>

            <div className="text-[13.5px] text-terracotta font-semibold">
              Founder & Counsellor
            </div>

            <p className="text-[13px] text-muted mt-1.5">
              Founder of Arise Strong Together,
              bringing lived experience and
              counselling knowledge to AST's
              survivor-centred approach.
            </p>

          </Reveal>

        </div>
      </Section>

      <Section>

        <SectionHead
          eyebrow="Our journey"
          title="Milestones"
        />

        <Reveal className="max-w-[640px] mx-auto border-l-2 border-sage-line ml-2 pl-[26px] flex flex-col gap-[26px]">

          {milestones.map(([year, detail], i) => (

            <div
              key={`${year}-${i}`}
              className="relative before:content-[''] before:absolute before:-left-[33px] before:top-1 before:w-3 before:h-3 before:rounded-full before:bg-ochre before:border-[3px] before:border-paper"
            >

              <div className="font-display text-xl text-ochre">
                {year}
              </div>

              <p className="text-muted text-[15px]">
                {detail}
              </p>

            </div>

          ))}

        </Reveal>

      </Section>

      <CtaBand />
    </>
  );
}