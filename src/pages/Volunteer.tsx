import { useState } from "react";
import { Shield, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Banner, Crumb } from "@/components/blocks/Banner";
import { Section, SectionHead, Eyebrow } from "@/components/blocks/Section";
import { Card } from "@/components/blocks/Cards";
import { Callout } from "@/components/blocks/Callout";
import { Faq } from "@/components/blocks/Faq";
import { Button } from "@/components/ui/button";
import { submitVolunteer } from "@/lib/submissions";

const roles = [
  ["Community outreach", "Support awareness and prevention activities in the community."],
  ["Event support", "Help plan and run awareness events and commemorations."],
  ["Administrative support", "Keep the office running smoothly behind the scenes."],
  ["Skills-based volunteering", "[Counselling, legal, IT, communications, fundraising.]"],
  ["Peer mentorship", "[Where appropriate and trained.] Walk alongside survivors on their journey."],
  ["Your idea", "Have a skill we haven’t listed? Tell us how you’d like to help."],
];
const faqs = [
  { q: "Do I need experience?", a: "[Answer — most roles need commitment and empathy; some need specific qualifications.]" },
  { q: "Can I volunteer remotely?", a: "[Answer.]" },
  { q: "Will I receive training?", a: "[Answer.]" },
  { q: "Is there a minimum commitment?", a: "[Answer.]" },
];
const input = "font-sans text-[15px] px-3.5 py-3 border-[1.5px] border-sage-line rounded-[10px] bg-white text-ink focus:border-forest focus:outline-none";
const label = "text-sm font-semibold text-ink";
type Status = "idle" | "sending" | "sent" | "error";

export default function Volunteer() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    if (f.get("company")) { setStatus("sent"); return; }
    setStatus("sending");
    try {
      await submitVolunteer({
        name: String(f.get("name") || ""),
        email: String(f.get("email") || ""),
        phone: String(f.get("phone") || "") || undefined,
        interest: String(f.get("interest") || "") || undefined,
        availability: String(f.get("availability") || "") || undefined,
        experience: String(f.get("experience") || "") || undefined,
        consent: f.get("consent") === "on",
      });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <Banner crumb={<Crumb label="Volunteer" mid={{ to: "/get-involved", label: "Get Involved" }} />} eyebrow="Join us" title="Give Your Time. Change a Life."
        text="Our volunteers are the backbone of our work — helping survivors feel less alone and extending our reach in the community." />

      <Section>
        <div className="grid gap-[22px] md:grid-cols-3">
          {roles.map(([t, d]) => <Reveal key={t}><Card title={t}>{d}</Card></Reveal>)}
        </div>
      </Section>

      <Section variant="sage">
        <div className="grid lg:grid-cols-[1fr_340px] gap-14 items-start">
          <Reveal className="prose">
            <h2>Eligibility &amp; commitment</h2>
            <ul>
              <li>Minimum age [18+]</li>
              <li>[Any background check / safeguarding requirement]</li>
              <li>Commitment to confidentiality and our safeguarding policy</li>
              <li>Time commitment: [flexible / minimum hours per month / one-off vs ongoing]</li>
            </ul>
            <h2>How to apply</h2>
            <ol>
              <li>Complete the registration form</li>
              <li>[Brief interview / orientation]</li>
              <li>[Safeguarding checks]</li>
              <li>[Induction and training]</li>
              <li>Get matched to a role and start</li>
            </ol>
          </Reveal>
          <Reveal className="bg-white border border-sage-line rounded-[14px] p-[26px]">
            <Shield size={24} strokeWidth={1.8} className="text-forest" />
            <h3 className="text-xl mt-3 mb-2">Safe by design</h3>
            <p className="text-muted text-[15px]">Because we work with survivors, all volunteers undergo [safeguarding screening]. This protects the people we serve — and it’s something we’re proud of.</p>
          </Reveal>
        </div>
      </Section>

      <Section>
        <div className="max-w-[760px] mx-auto">
          <Reveal className="mb-[26px]">
            <Eyebrow>Register your interest</Eyebrow>
            <h2 className="text-[clamp(26px,3.2vw,38px)] mt-3.5">Volunteer Registration</h2>
          </Reveal>
          {status === "sent" ? (
            <Reveal>
              <Callout variant="calm" icon={<CheckCircle2 size={22} strokeWidth={1.8} />} title="Application received">
                Thank you for offering your time. We’ll review your details and be in touch about next steps.
              </Callout>
            </Reveal>
          ) : (
            <Reveal>
              <form className="grid gap-[18px]" onSubmit={onSubmit}>
                <div className="grid sm:grid-cols-2 gap-[18px]">
                  <div className="flex flex-col gap-[7px]"><label className={label}>Full name</label><input name="name" required className={input} placeholder="Your name" /></div>
                  <div className="flex flex-col gap-[7px]"><label className={label}>Email</label><input name="email" type="email" required className={input} placeholder="you@example.com" /></div>
                </div>
                <div className="flex flex-col gap-[7px]"><label className={label}>Phone</label><input name="phone" className={input} placeholder="[Optional]" /></div>
                <div className="flex flex-col gap-[7px]"><label className={label}>Area of interest</label>
                  <select name="interest" className={input} defaultValue=""><option value="" disabled>Choose an option</option><option>Community outreach</option><option>Event support</option><option>Administrative</option><option>Skills-based</option><option>Peer mentorship</option></select>
                </div>
                <div className="flex flex-col gap-[7px]"><label className={label}>Availability</label><input name="availability" className={input} placeholder="e.g. weekends, evenings" /></div>
                <div className="flex flex-col gap-[7px]"><label className={label}>Relevant skills or experience</label><textarea name="experience" className={`${input} min-h-[130px] resize-y`} placeholder="Tell us a little about yourself" /></div>
                <input name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                <label className="flex gap-2.5 items-start text-sm text-muted"><input name="consent" type="checkbox" className="mt-1" /> I agree to be contacted about volunteering and understand my details will be kept confidential.</label>
                <Button size="lg" type="submit" disabled={status === "sending"}>{status === "sending" ? "Submitting…" : "Submit application"}</Button>
                {status === "error" && <p className="text-plum text-sm">Something went wrong. Please try again in a moment.</p>}
              </form>
            </Reveal>
          )}
        </div>
      </Section>

      <Section variant="sage">
        <SectionHead eyebrow="Questions" title="Volunteer FAQ" />
        <Reveal><Faq items={faqs} /></Reveal>
      </Section>
    </>
  );
}
