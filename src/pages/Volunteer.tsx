import { useState } from "react";
import {
  Shield,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "@/components/Reveal";
import {
  Banner,
  Crumb,
} from "@/components/blocks/Banner";
import {
  Section,
  Eyebrow,
} from "@/components/blocks/Section";
import { Card } from "@/components/blocks/Cards";
import { Callout } from "@/components/blocks/Callout";
import { Button } from "@/components/ui/button";
import { submitVolunteer } from "@/lib/submissions";

const roles = [
  [
    "Community outreach",
    "Support awareness, prevention, and community-engagement activities under AST guidance.",
  ],
  [
    "Event support",
    "Help with preparation, logistics, registration, or other practical tasks during approved events and activities.",
  ],
  [
    "Administrative support",
    "Support coordination, logistics, records, research, or other behind-the-scenes work according to the role assigned.",
  ],
  [
    "Skills-based volunteering",
    "Offer relevant professional skills such as IT, communications, fundraising, legal knowledge, or counselling-related expertise, subject to AST need, qualifications, screening, and role boundaries.",
  ],
  [
    "Peer and community support",
    "Contribute to appropriate community-based activities where your experience, training, and the safeguarding requirements are a suitable match.",
  ],
  [
    "Other skills",
    "If your skill is not listed, tell us what you can offer and AST can assess whether there is a suitable current need.",
  ],
] as const;

const input =
  "font-sans text-[15px] px-3.5 py-3 border-[1.5px] border-sage-line rounded-[10px] bg-white text-ink focus:border-forest focus:outline-none";

const label =
  "text-sm font-semibold text-ink";

type Status =
  | "idle"
  | "sending"
  | "sent"
  | "error";

export default function Volunteer() {
  const [status, setStatus] =
    useState<Status>("idle");

  async function onSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const form =
      new FormData(e.currentTarget);

    if (form.get("company")) {
      setStatus("sent");
      return;
    }

    setStatus("sending");

    try {
      await submitVolunteer({
        name: String(
          form.get("name") || ""
        ).trim(),

        email: String(
          form.get("email") || ""
        ).trim(),

        phone:
          String(
            form.get("phone") || ""
          ).trim() || undefined,

        interest:
          String(
            form.get("interest") || ""
          ) || undefined,

        availability:
          String(
            form.get("availability") || ""
          ).trim() || undefined,

        experience:
          String(
            form.get("experience") || ""
          ).trim() || undefined,

        consent:
          form.get("consent") === "on",
      });

      setStatus("sent");

    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <Banner
        crumb={
          <Crumb
            label="Volunteer"
            mid={{
              to: "/get-involved",
              label: "Get Involved",
            }}
          />
        }
        eyebrow="Join us"
        title="Volunteer With Arise Strong Together"
        text="Volunteers can contribute through community, administrative, event, and skills-based roles when those roles match AST's current needs and safeguarding requirements."
      />

      <Section>

        <div className="grid gap-[22px] md:grid-cols-3">

          {roles.map(([title, description]) => (

            <Reveal key={title}>

              <Card title={title}>
                {description}
              </Card>

            </Reveal>

          ))}

        </div>

      </Section>

      <Section variant="sage">

        <div className="grid lg:grid-cols-[1fr_340px] gap-14 items-start">

          <Reveal className="prose">

            <h2>Eligibility and commitment</h2>

            <ul>
              <li>
                Requirements depend on the role and
                whether it involves contact with
                survivors, children, or other people
                who may be at heightened risk.
              </li>

              <li>
                Some roles may require references,
                screening, orientation, training,
                professional qualifications, or other
                checks before placement.
              </li>

              <li>
                All volunteers are expected to follow
                confidentiality, safeguarding,
                boundaries, dignity, and
                data-protection requirements.
              </li>

              <li>
                Time commitments vary from one-off
                support to ongoing roles and are
                agreed before volunteering begins.
              </li>
            </ul>

            <h2>How the process works</h2>

            <ol>
              <li>
                Submit the volunteer interest form.
              </li>

              <li>
                AST reviews your interests, skills,
                availability, and current programme
                needs.
              </li>

              <li>
                If there may be a suitable role, AST
                contacts you for a short conversation.
              </li>

              <li>
                Complete any role-specific checks,
                orientation, or training required.
              </li>

              <li>
                Agree on responsibilities,
                supervision, boundaries, and time
                commitment before beginning.
              </li>
            </ol>

          </Reveal>

          <Reveal className="bg-white border border-sage-line rounded-[14px] p-[26px]">

            <Shield
              size={24}
              strokeWidth={1.8}
              className="text-forest"
            />

            <h3 className="text-xl mt-3 mb-2">
              Safety comes first
            </h3>

            <p className="text-muted text-[15px]">
              Volunteering does not automatically
              involve direct contact with survivors
              or access to confidential information.
              AST should approve the role, scope,
              supervision, and safeguards before any
              direct-contact work begins.
            </p>

          </Reveal>

        </div>

      </Section>

      <Section>

        <div className="max-w-[760px] mx-auto">

          <Reveal className="mb-[26px]">

            <Eyebrow>
              Register your interest
            </Eyebrow>

            <h2 className="text-[clamp(22px,5vw,38px)] mt-3.5">
              Volunteer interest form
            </h2>

            <p className="text-muted mt-3">
              Submitting this form is an expression
              of interest, not a guarantee of a
              volunteer placement. AST will assess
              applications against current needs and
              safeguarding requirements.
            </p>

          </Reveal>

          {status === "sent" ? (

            <Reveal>

              <Callout
                variant="calm"
                icon={
                  <CheckCircle2
                    size={22}
                    strokeWidth={1.8}
                  />
                }
                title="Interest received"
              >
                Thank you for offering your time and
                skills. AST will review the
                information you submitted and contact
                you if there is a suitable next step.
              </Callout>

            </Reveal>

          ) : (

            <Reveal>

              <form
                className="grid gap-[18px]"
                onSubmit={onSubmit}
              >

                <div className="grid sm:grid-cols-2 gap-[18px]">

                  <div className="flex flex-col gap-[7px]">

                    <label
                      htmlFor="volunteer-name"
                      className={label}
                    >
                      Full name
                    </label>

                    <input
                      id="volunteer-name"
                      name="name"
                      required
                      maxLength={160}
                      className={input}
                      placeholder="Your name"
                      autoComplete="name"
                    />

                  </div>

                  <div className="flex flex-col gap-[7px]">

                    <label
                      htmlFor="volunteer-email"
                      className={label}
                    >
                      Email
                    </label>

                    <input
                      id="volunteer-email"
                      name="email"
                      type="email"
                      required
                      maxLength={320}
                      className={input}
                      placeholder="you@example.com"
                      autoComplete="email"
                    />

                  </div>

                </div>

                <div className="flex flex-col gap-[7px]">

                  <label
                    htmlFor="volunteer-phone"
                    className={label}
                  >
                    Phone (optional)
                  </label>

                  <input
                    id="volunteer-phone"
                    name="phone"
                    type="tel"
                    maxLength={60}
                    className={input}
                    autoComplete="tel"
                  />

                </div>

                <div className="flex flex-col gap-[7px]">

                  <label
                    htmlFor="volunteer-interest"
                    className={label}
                  >
                    Area of interest
                  </label>

                  <select
                    id="volunteer-interest"
                    name="interest"
                    className={input}
                    defaultValue=""
                    required
                  >

                    <option
                      value=""
                      disabled
                    >
                      Choose an option
                    </option>

                    <option>
                      Community outreach
                    </option>

                    <option>
                      Event support
                    </option>

                    <option>
                      Administrative support
                    </option>

                    <option>
                      Skills-based volunteering
                    </option>

                    <option>
                      Peer and community support
                    </option>

                    <option>
                      Other skills
                    </option>

                  </select>

                </div>

                <div className="flex flex-col gap-[7px]">

                  <label
                    htmlFor="volunteer-availability"
                    className={label}
                  >
                    Availability
                  </label>

                  <input
                    id="volunteer-availability"
                    name="availability"
                    maxLength={500}
                    className={input}
                    placeholder="For example: weekends, evenings, or selected weekdays"
                  />

                </div>

                <div className="flex flex-col gap-[7px]">

                  <label
                    htmlFor="volunteer-experience"
                    className={label}
                  >
                    Relevant skills or experience
                  </label>

                  <textarea
                    id="volunteer-experience"
                    name="experience"
                    maxLength={5000}
                    className={`${input} min-h-[130px] resize-y`}
                    placeholder="Tell us briefly about the skills or experience you would like to contribute"
                  />

                </div>

                <input
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                <label className="flex gap-2.5 items-start text-sm text-muted">

                  <input
                    name="consent"
                    type="checkbox"
                    required
                    className="mt-1"
                  />

                  <span>
                    I agree to be contacted about
                    volunteering and have read the{" "}
                    <Link
                      to="/privacy"
                      className="underline text-forest"
                    >
                      privacy notice
                    </Link>
                    .
                  </span>

                </label>

                <Button
                  size="lg"
                  type="submit"
                  disabled={
                    status === "sending"
                  }
                >
                  {status === "sending"
                    ? "Submitting..."
                    : "Submit interest"}
                </Button>

                {status === "error" && (

                  <p
                    role="alert"
                    aria-live="polite"
                    className="text-plum text-sm"
                  >
                    Something went wrong. Please
                    try again in a moment.
                  </p>

                )}

              </form>

            </Reveal>

          )}

        </div>

      </Section>
    </>
  );
}