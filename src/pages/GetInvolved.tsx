import {
  HandHeart,
  Users,
  Coins,
  Shield,
} from "lucide-react";

import { Reveal } from "@/components/Reveal";

import {
  Banner,
  Crumb,
} from "@/components/blocks/Banner";

import {
  Section,
  SectionHead,
} from "@/components/blocks/Section";

import {
  Card,
  ProgramCard,
} from "@/components/blocks/Cards";

import { Callout } from "@/components/blocks/Callout";

import { Button } from "@/components/ui/button";

export default function GetInvolved() {
  return (
    <>
      <Banner
        crumb={
          <Crumb label="Get Involved" />
        }
        eyebrow="Stand with survivors"
        title="Get Involved"
        text="Individuals, organisations, businesses, and institutions can support AST through partnership, volunteering, practical resources, and financial contributions."
      />

      <Section>

        <div className="grid gap-[22px] md:grid-cols-3">

          <Reveal>

            <ProgramCard
              to="/get-involved#partner"
              icon={
                <HandHeart
                  size={24}
                  strokeWidth={1.8}
                />
              }
              title="Partner With Us"
            >

              Explore programme, technical,
              community, and institutional
              collaboration aligned with AST's work.

            </ProgramCard>

          </Reveal>

          <Reveal>

            <ProgramCard
              to="/volunteer"
              icon={
                <Users
                  size={24}
                  strokeWidth={1.8}
                />
              }
              title="Volunteer"
            >

              Offer time and relevant skills through
              roles that match current needs and
              safeguarding requirements.

            </ProgramCard>

          </Reveal>

          <Reveal>

            <ProgramCard
              to="/donate"
              icon={
                <Coins
                  size={24}
                  strokeWidth={1.8}
                />
              }
              title="Donate"
            >

              Contribute resources that help AST
              sustain survivor support, prevention,
              skills-building, and programme delivery.

            </ProgramCard>

          </Reveal>

        </div>

      </Section>

      <Section
        variant="sage"
        id="partner"
      >

        <SectionHead
          eyebrow="For organisations"
          title="Partnership opportunities"
        />

        <div className="grid gap-[22px] md:grid-cols-2">

          <Reveal>

            <Card title="Programme partnerships">

              Collaborate on clearly defined
              activities that strengthen survivor
              support, prevention, skills-building,
              livelihoods, or community engagement.

            </Card>

          </Reveal>

          <Reveal>

            <Card title="Technical support">

              Share relevant expertise in areas such
              as safeguarding, counselling systems,
              monitoring and evaluation, legal
              awareness, communications, technology,
              or organisational development.

            </Card>

          </Reveal>

          <Reveal>

            <Card title="Institutional support">

              Discuss grants, sponsorship of defined
              programme activities, capacity
              strengthening, or other forms of support
              with clear expectations and reporting.

            </Card>

          </Reveal>

          <Reveal>

            <Card title="In-kind contributions">

              Offer goods, venues, equipment, or
              professional services that match a
              confirmed AST need. Please contact us
              before sending physical items.

            </Card>

          </Reveal>

        </div>

        <Reveal className="mt-[26px]">

          <Callout
            variant="calm"
            icon={
              <Shield
                size={22}
                strokeWidth={1.8}
              />
            }
            title="Partnership must protect survivor dignity"
          >

            Partnership, funding, volunteering, or
            in-kind support does not automatically
            provide access to survivor identities,
            case information, photographs, or
            personal stories. Any information sharing
            should follow confidentiality,
            safeguarding, consent, and data-protection
            requirements.

          </Callout>

        </Reveal>

      </Section>

      <Section>

        <div className="text-center">

          <Button
            to="/contact"
            size="lg"
          >
            Talk to us about partnership
          </Button>

        </div>

      </Section>

    </>
  );
}