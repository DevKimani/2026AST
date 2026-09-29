import { HandHeart, Users, Coins, Shield } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Banner, Crumb } from "@/components/blocks/Banner";
import { Section, SectionHead } from "@/components/blocks/Section";
import { Card, ProgramCard } from "@/components/blocks/Cards";
import { Callout } from "@/components/blocks/Callout";
import { Button } from "@/components/ui/button";

export default function GetInvolved() {
  return (
    <>
      <Banner crumb={<Crumb label="Get Involved" />} eyebrow="Stand with survivors" title="Get Involved"
        text="Change doesn’t happen alone. Whether you’re an organisation, a business, or an individual, there’s a place for you in this movement." />

      <Section>
        <div className="grid gap-[22px] md:grid-cols-3">
          <Reveal><ProgramCard to="/get-involved#partner" icon={<HandHeart size={24} strokeWidth={1.8} />} title="Partner With Us">For organisations, businesses, and institutions ready to create lasting change together.</ProgramCard></Reveal>
          <Reveal><ProgramCard to="/volunteer" icon={<Users size={24} strokeWidth={1.8} />} title="Volunteer">Give your time and skills to support survivors and communities.</ProgramCard></Reveal>
          <Reveal><ProgramCard to="/donate" icon={<Coins size={24} strokeWidth={1.8} />} title="Donate">Fund the support, skills, and safety survivors need.</ProgramCard></Reveal>
        </div>
      </Section>

      <Section variant="sage" id="partner">
        <SectionHead eyebrow="For organisations" title="Partnership Opportunities" />
        <div className="grid gap-[22px] md:grid-cols-2">
          <Reveal><Card title="Corporate partnerships">Bring your business behind a cause your team and customers care about, through CSR programmes, employee engagement, cause marketing, or matched giving.</Card></Reveal>
          <Reveal><Card title="Institutional & development partners">Collaborate with us on grants, joint programmes, and technical support that strengthen survivor services across Samburu County.</Card></Reveal>
          <Reveal><Card title="Sponsorship">Sponsor a programme, an event, or a survivor’s journey, and see exactly how your support changes lives.</Card></Reveal>
          <Reveal><Card title="In-kind donations">Give goods, services, professional skills, or the use of a venue or equipment, support that stretches just as far as cash.</Card></Reveal>
        </div>
        <Reveal className="mt-[26px]">
          <Callout variant="calm" icon={<Shield size={22} strokeWidth={1.8} />} title="Why partner with us">
            As a survivor-led organisation rooted in Samburu County, we pair lived experience with professional counselling to reach women and girls that other services miss. Partnering with us means real, measurable local impact, a trusted presence in the community, and a direct contribution to SDG 5 and a future free from gender-based violence.
          </Callout>
        </Reveal>
      </Section>

      <Section>
        <div className="text-center"><Button to="/contact" size="lg">Talk to our partnerships team</Button></div>
      </Section>
    </>
  );
}
