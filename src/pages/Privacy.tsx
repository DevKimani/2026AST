import { Link } from "react-router-dom";
import {
  Shield,
  Lock,
  EyeOff,
} from "lucide-react";

import { Reveal } from "@/components/Reveal";
import {
  Banner,
  Crumb,
} from "@/components/blocks/Banner";

import { Section } from "@/components/blocks/Section";
import { Callout } from "@/components/blocks/Callout";

export default function Privacy() {
  return (
    <>
      <Banner
        crumb={<Crumb label="Privacy" />}
        eyebrow="Your information and safety"
        title="Privacy & Safer Browsing"
        text="We aim to collect as little personal information as possible and to handle it with care, especially when someone is seeking support."
      />

      <Section>
        <div className="max-w-[820px] mx-auto">

          <Reveal className="mb-6">
            <Callout
              variant="calm"
              icon={
                <Shield
                  size={20}
                  strokeWidth={1.8}
                />
              }
              title="If you are seeking support"
            >
              You do not need to put the details
              of violence, abuse, medical history,
              legal matters, or identification
              documents into our website forms.
              Share only what is needed for us to
              contact you safely. For urgent
              support, see our{" "}
              <Link
                to="/get-help"
                className="underline font-semibold"
              >
                Get Help
              </Link>{" "}
              page.
            </Callout>
          </Reveal>

          <Reveal className="prose">

            <h2>What information we collect</h2>

            <p>
              When you use our contact form, we
              collect the name or alias you provide,
              at least one contact method, your
              reason for contacting us, your message,
              and your consent to be contacted.
              When you apply to volunteer, we collect
              the information you provide about your
              contact details, interests,
              availability, and relevant experience.
            </p>

            <h2>Why we collect it</h2>

            <p>
              We use this information to respond to
              enquiries, provide or coordinate
              support, manage volunteer applications,
              and keep an appropriate record of our
              interactions. We do not ask you to
              provide more information than is
              necessary for these purposes.
            </p>

            <h2>Who can access it</h2>

            <p>
              Access to form submissions is
              restricted to authorised people who
              need the information for their role.
              Website notifications are designed not
              to include the contents of confidential
              messages or personal contact details;
              authorised staff must access the secure
              record to review a submission.
            </p>

            <h2>Service providers</h2>

            <p>
              Our website uses service providers to
              host the site, store form submissions,
              and send administrative notifications.
              These providers may process limited
              personal data on our behalf. We do not
              publish form submissions or sell
              personal information.
            </p>

            <h2>How long we keep information</h2>

            <p>
              We keep personal information only for
              as long as it is needed for the purpose
              it was collected for, for safeguarding
              or service continuity, or where we have
              a legal obligation to retain it. We
              periodically review information that is
              no longer needed.
            </p>

            <h2>Your choices and rights</h2>

            <p>
              You can ask what personal information
              we hold about you, request correction
              of inaccurate information, object to
              certain processing, or ask us to delete
              information where applicable. To make
              a privacy request, email{" "}
              <a href="mailto:arisestrongtogether@gmail.com">
                arisestrongtogether@gmail.com
              </a>.
            </p>

            <h2>
              Confidentiality and safeguarding
            </h2>

            <p>
              We treat support-related information
              as confidential. Confidentiality can
              have limited exceptions where
              disclosure is required by law or where
              action is necessary to respond to a
              serious safeguarding risk. We aim to
              explain any such situation clearly and
              to respect survivor choice as far as
              possible.
            </p>

          </Reveal>
        </div>
      </Section>

      <Section
        variant="sage"
        id="safer-browsing"
      >
        <div className="max-w-[820px] mx-auto">

          <Reveal>
            <div className="flex items-start gap-4 mb-5">

              <EyeOff
                size={26}
                strokeWidth={1.8}
                className="text-forest mt-1 shrink-0"
              />

              <div>
                <h2 className="text-[clamp(22px,5vw,34px)]">
                  Safer browsing
                </h2>

                <p className="text-muted mt-2">
                  No website can guarantee that a
                  visit will leave no trace on a
                  device or network.
                </p>
              </div>
            </div>

            <div className="prose">
              <ul>
                <li>
                  Use a trusted device that another
                  person cannot easily access, if
                  one is available.
                </li>

                <li>
                  Private or incognito browsing can
                  reduce local browser history, but
                  it does not hide activity from
                  internet providers, workplace or
                  school networks, device monitoring
                  software, or someone who can see
                  your screen.
                </li>

                <li>
                  The "Exit this site" button and
                  Escape key quickly move away from
                  this website, but they do not erase
                  browsing history or other traces.
                </li>

                <li>
                  Only clear browsing history if
                  doing so is safe. A suddenly empty
                  history may itself be noticeable
                  on a monitored device.
                </li>

                <li>
                  Be cautious with saved passwords,
                  autofill, notifications, shared
                  email accounts, and message
                  previews on a locked screen.
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal className="mt-6">
            <Callout
              variant="warn"
              icon={
                <Lock
                  size={20}
                  strokeWidth={1.8}
                />
              }
              title="Need a safer way to reach support?"
            >
              If using this website could put you
              at risk, use a trusted phone or device
              where possible. Kenya's national GBV
              helpline is{" "}
              <a
                href="tel:1195"
                className="font-semibold underline"
              >
                1195
              </a>
              . For immediate danger, call{" "}
              <a
                href="tel:999"
                className="font-semibold underline"
              >
                999
              </a>
              , 112, or 911.
            </Callout>
          </Reveal>

        </div>
      </Section>
    </>
  );
}