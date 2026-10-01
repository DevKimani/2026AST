import {
  Phone,
  Shield,
  ExternalLink,
} from "lucide-react";

import { Reveal } from "@/components/Reveal";

import {
  Banner,
  Crumb,
} from "@/components/blocks/Banner";

import {
  Section,
  Eyebrow,
} from "@/components/blocks/Section";

import { Callout } from "@/components/blocks/Callout";
import { Button } from "@/components/ui/button";

const supportResources = [
  {
    title: "National GBV Helpline",
    detail:
      "1195 - toll-free and available 24/7 across Kenya",
    href: "tel:1195",
  },
  {
    title: "Police emergency",
    detail: "999 / 112 / 911",
    href: "tel:999",
  },
  {
    title: "Child Helpline",
    detail:
      "116 - for a child who may be at risk or needs support",
    href: "tel:116",
  },
];

export default function GetHelp() {
  return (
    <>
      <Banner
        green
        crumb={<Crumb label="Get Help" />}
        eyebrow="You are not alone"
        title="Get Help"
        text="Confidential, survivor-centred support at your own pace. You choose what you share and what happens next."
      />

      <Section>
        <div className="grid lg:grid-cols-[1fr_340px] gap-14 items-start">

          <div>
            <Reveal className="mb-[22px]">
              <Callout
                variant="urgent"
                icon={
                  <Phone
                    size={18}
                    strokeWidth={1.8}
                  />
                }
                title="I need help now"
              >
                If you are in immediate danger,
                call{" "}
                <strong>
                  999, 112, or 911
                </strong>
                . For Kenya's national GBV response
                line, call{" "}
                <strong>1195</strong>.
                To reach Arise Strong Together,
                call{" "}
                <strong>0180 740 140</strong>{" "}
                or message us on Instagram{" "}
                <a
                  href="https://www.instagram.com/arisestrongtogether/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  @arisestrongtogether
                </a>
                .
              </Callout>
            </Reveal>

            <Reveal className="prose">

              <h2>What to expect</h2>

              <p>
                Reaching out can feel difficult.
                When you contact us, you can share
                only what you feel safe sharing.
                We will listen without judgment,
                talk through the options available
                to you, and respect your choices.
                You do not need to describe
                everything that happened in order
                to ask for support.
              </p>

              <h2>Support available</h2>

              <ul>
                <li>
                  Emotional support and a safe
                  person to talk to
                </li>

                <li>
                  Safety planning based on your
                  circumstances and choices
                </li>

                <li>
                  Referral to appropriate health,
                  legal, protection, and other
                  support services
                </li>

                <li>
                  Ongoing support through healing,
                  skills, and rebuilding programmes
                  where appropriate
                </li>
              </ul>

              <h2>
                Confidentiality and your privacy
              </h2>

              <p>
                We treat what you share as
                confidential and limit access to
                people who need the information to
                support you. There can be limited
                situations where information may
                need to be shared because of a legal
                or safeguarding duty, for example
                where a child or another person is
                at serious and immediate risk. We
                will explain this as clearly as we
                can if it applies.
              </p>

            </Reveal>

            <Reveal className="mt-[26px]">
              <Callout
                variant="warn"
                icon={
                  <Shield
                    size={18}
                    strokeWidth={1.8}
                  />
                }
                title="Use this site as safely as you can"
              >
                The "Exit this site" button quickly
                changes the page, but it does not
                erase browser history, downloads,
                messages, or network records. If
                someone may be monitoring your
                device, consider using a trusted
                device, private/incognito browsing,
                and clearing recent browsing history
                only if doing so is safe for you.
                See our{" "}
                <a
                  href="/privacy#safer-browsing"
                  className="text-plum-deep font-semibold underline"
                >
                  privacy and safer browsing guidance
                </a>
                .
              </Callout>
            </Reveal>
          </div>

          <Reveal className="bg-plum text-white rounded-[14px] p-[26px] lg:sticky lg:top-[100px]">

            <h3 className="text-xl mb-2 text-white">
              Talk to us
            </h3>

            <p className="text-[14.5px] text-white/[.88] mb-3.5">
              Confidential support, at your pace.
            </p>

            <p className="text-[13px] uppercase tracking-[.1em] text-white/70 mb-0.5">
              Arise Strong Together
            </p>

            <p className="font-display text-2xl text-white mb-3.5">
              <a
                href="tel:0180740140"
                className="underline underline-offset-4"
              >
                0180 740 140
              </a>
            </p>

            <p className="text-[13px] uppercase tracking-[.1em] text-white/70 mb-0.5">
              National GBV Helpline
            </p>

            <p className="font-display text-2xl text-white mb-3.5">
              <a
                href="tel:1195"
                className="underline underline-offset-4"
              >
                1195
              </a>
            </p>

            <p className="text-[13px] uppercase tracking-[.1em] text-white/70 mb-0.5">
              Instagram
            </p>

            <p className="text-white mb-[18px]">
              <a
                href="https://www.instagram.com/arisestrongtogether/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                @arisestrongtogether
              </a>
            </p>

            <Button
              to="/contact"
              variant="white"
              className="w-full justify-center"
            >
              Send a message
            </Button>

          </Reveal>
        </div>
      </Section>

      <Section variant="sage">
        <Reveal className="max-w-[840px] mx-auto">

          <Eyebrow center>
            Other support in Kenya
          </Eyebrow>

          <h2 className="text-[clamp(22px,5vw,38px)] mt-3.5 text-center">
            National support and emergency contacts
          </h2>

          <p className="text-lg text-muted mt-[18px] text-center">
            You can contact these services directly
            if AST is not the right option for you,
            if you need urgent support, or if you
            prefer a national service.
          </p>

          <div className="grid sm:grid-cols-3 gap-4 mt-8">

            {supportResources.map((resource) => (
              <a
                key={resource.title}
                href={resource.href}
                className="bg-white border border-sage-line rounded-[14px] p-5 hover:border-forest transition-colors"
              >
                <h3 className="text-lg text-forest mb-2">
                  {resource.title}
                </h3>

                <p className="text-sm text-muted">
                  {resource.detail}
                </p>
              </a>
            ))}

          </div>

          <p className="text-sm text-muted mt-6 text-center">
            You can also seek support at a health
            facility or police station. Where
            possible, AST can help you understand
            referral options without forcing you
            to take a particular path.
          </p>

          <p className="text-xs text-muted mt-4 text-center">
            <a
              href="https://www.migecah.go.ke/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 underline"
            >
              Kenya Ministry of Gender resources
              <ExternalLink size={12} />
            </a>
          </p>

        </Reveal>
      </Section>
    </>
  );
}