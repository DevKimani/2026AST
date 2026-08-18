import { Phone, Shield } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Banner, Crumb } from "@/components/blocks/Banner";
import { Section, Eyebrow } from "@/components/blocks/Section";
import { Callout } from "@/components/blocks/Callout";
import { Button } from "@/components/ui/button";

export default function GetHelp() {
  return (
    <>
      <Banner green crumb={<Crumb label="Get Help" />} eyebrow="You are not alone" title="Get Help"
        text="Confidential support, at your own pace. There is no pressure and no judgment." />

      <Section>
        <div className="grid lg:grid-cols-[1fr_340px] gap-14 items-start">
          <div>
            <Reveal className="mb-[22px]">
              <Callout variant="urgent" icon={<Phone size={18} strokeWidth={1.8} />} title="I need help now">
                If you are in immediate danger, call <strong>[EMERGENCY NO.]</strong>. To reach us in confidence, call <strong>[HELPLINE NO.]</strong> ([HOURS]) or [WhatsApp / text / email].
              </Callout>
            </Reveal>
            <Reveal className="prose">
              <h2>What to expect</h2>
              <p>Reaching out can feel frightening. When you contact us, someone trained will listen, believe you, and talk through your options — nothing more will happen without your say-so. You are in control of every step, and you can stay anonymous.</p>
              <h2>Support available</h2>
              <ul>
                <li>Emotional support and a safe person to talk to</li>
                <li>Safety planning</li>
                <li>Referral to [safe houses / shelters], legal aid, and health services</li>
                <li>Ongoing support through our programmes — healing, skills, and rebuilding</li>
              </ul>
              <h2>Confidentiality &amp; your privacy</h2>
              <p>What you share with us stays confidential. We will never share your information without your permission, except where we are legally required to protect someone at serious risk of harm — and we’ll always be honest with you about that.</p>
            </Reveal>
            <Reveal className="mt-[26px]">
              <Callout variant="warn" icon={<Shield size={18} strokeWidth={1.8} />} title="Cover your tracks">
                If someone may be monitoring your device, use the “Exit this site” button (top corner) to leave immediately, and consider a private/incognito window or a device the other person can’t access. Please note: leaving this site does not fully erase evidence of the visit. [Link: how to clear your browsing history]
              </Callout>
            </Reveal>
          </div>

          <Reveal className="bg-plum text-white rounded-[14px] p-[26px] lg:sticky lg:top-[100px]">
            <h3 className="text-xl mb-2 text-white">Talk to us</h3>
            <p className="text-[14.5px] text-white/[.88] mb-3.5">Confidential, free, and at your pace.</p>
            <p className="text-[13px] uppercase tracking-[.1em] text-white/70 mb-0.5">Helpline</p>
            <p className="font-display text-2xl text-white mb-3.5">[HELPLINE NO.]</p>
            <p className="text-[13px] uppercase tracking-[.1em] text-white/70 mb-0.5">Hours</p>
            <p className="text-white mb-[18px]">[HOURS]</p>
            <Button to="/contact" variant="white" className="w-full justify-center">Send a message</Button>
          </Reveal>
        </div>
      </Section>

      <Section variant="sage">
        <Reveal className="max-w-[840px] mx-auto text-center">
          <Eyebrow center>If it’s not for you</Eyebrow>
          <h2 className="text-[clamp(26px,3.2vw,38px)] mt-3.5">Helpline &amp; referrals</h2>
          <p className="text-lg text-muted mt-[18px]">A directory of trusted services — national GBV hotline, police gender desk, nearest safe houses, legal aid, and health services. [Add the referral directory here.]</p>
        </Reveal>
      </Section>
    </>
  );
}
