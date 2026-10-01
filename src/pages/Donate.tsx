import {
  Smartphone,
  Landmark,
  Heart,
  ShieldCheck,
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

import { Callout } from "@/components/blocks/Callout";

import { DonateWidget } from "@/components/blocks/DonateWidget";

const channels = [
  [
    <Smartphone
      size={20}
      strokeWidth={1.8}
    />,
    "M-Pesa (Lipa na M-Pesa)",
    "Paybill 400200 · Account 1201208",
  ],

  [
    <Landmark
      size={20}
      strokeWidth={1.8}
    />,
    "Bank transfer",
    "Co-operative Bank · Arise Strong Together · A/C 01102079018001",
  ],
] as const;

export default function Donate() {
  return (
    <>
      <Banner
        green
        crumb={
          <Crumb
            label="Donate"
            mid={{
              to: "/get-involved",
              label: "Get Involved",
            }}
          />
        }
        eyebrow="Support the work"
        title="Donate"
        text="Your contribution helps Arise Strong Together sustain survivor-centred support, community prevention, skills-building, and programme delivery."
      />

      <Section>
        <div className="grid lg:grid-cols-[1fr_420px] gap-14 items-start">

          <div>

            <Reveal className="prose">

              <h2>
                Why donations matter
              </h2>

              <p>
                Arise Strong Together is a
                community-based organisation.
                Donations help us keep support
                available, run community
                activities, strengthen prevention
                work, and deliver programmes that
                support recovery and economic
                resilience.
              </p>

              <h2>
                How your contribution may be used
              </h2>

              <ul>
                <li>
                  Survivor support and appropriate
                  referrals
                </li>

                <li>
                  Community awareness and
                  prevention activities
                </li>

                <li>
                  Skills-building and livelihood
                  programmes
                </li>

                <li>
                  Programme coordination,
                  safeguarding, and essential
                  operating costs
                </li>
              </ul>

              <p>
                We avoid assigning a fixed impact
                to a particular donation amount
                unless that cost has been verified.
                Contributions are applied where
                they can best support AST's
                current work and responsibilities.
              </p>

            </Reveal>

            <Reveal className="mt-7">

              <Callout
                variant="calm"
                icon={
                  <ShieldCheck
                    size={21}
                    strokeWidth={1.8}
                  />
                }
                title="One-time online giving"
              >
                Online donations are currently
                processed as one-time gifts. We
                will only add recurring or monthly
                giving when the recurring-payment
                process is fully configured and
                tested.
              </Callout>

            </Reveal>

          </div>

          <Reveal className="lg:sticky lg:top-[100px]">
            <DonateWidget />
          </Reveal>

        </div>
      </Section>

      <Section
        variant="sage"
        id="channels"
      >

        <div className="max-w-[820px] mx-auto">

          <SectionHead
            eyebrow="Other ways to give"
            title="Direct donation channels"
          />

          <Reveal className="grid sm:grid-cols-2 gap-3.5">

            {channels.map(
              ([icon, title, detail]) => (

                <div
                  key={title}
                  className="border border-sage-line rounded-xl p-[18px] flex gap-3 items-center bg-white"
                >

                  <div className="w-10 h-10 rounded-[10px] bg-sage flex items-center justify-center text-forest flex-none">
                    {icon}
                  </div>

                  <div>
                    <b className="block text-[15px]">
                      {title}
                    </b>

                    <span className="text-[13.5px] text-muted">
                      {detail}
                    </span>
                  </div>

                </div>

              )
            )}

          </Reveal>

          <p className="text-[13px] text-muted text-center mt-4">
            Before publishing changes to payment
            instructions, verify these account
            details internally with the authorised
            AST finance representative.
          </p>

        </div>

      </Section>

      <Section>

        <Reveal className="max-w-[760px] mx-auto">

          <Callout
            variant="calm"
            icon={
              <Heart
                size={22}
                strokeWidth={1.8}
              />
            }
            title="Thank you"
          >
            Thank you for standing with survivors
            and supporting community-led work
            against gender-based violence.
          </Callout>

        </Reveal>

      </Section>
    </>
  );
}