import { Reveal } from "@/components/Reveal";
import { Banner, Crumb } from "@/components/blocks/Banner";
import { Section } from "@/components/blocks/Section";
import { Button } from "@/components/ui/button";
import { Photo } from "@/components/Photo";

export default function Blog() {
  return (
    <>
      <Banner crumb={<Crumb label="Blog / News" />} eyebrow="News & stories" title="News & Stories"
        text="The milestones we reach, the stories of change, and the resources we share to help end gender-based violence." />
      <Section>
        <Reveal className="grid lg:grid-cols-[1.1fr_.9fr] gap-10 items-center">
          <Photo src="/images/story.jpg" alt="Peris Njoroge, Founder of Arise Strong Together" className="aspect-[16/11]" />
          <div>
            <span className="text-xs font-bold tracking-[.1em] uppercase text-plum">Success Story</span>
            <h2 className="text-[clamp(22px,5vw,30px)] text-forest my-3">Turning Pain into Purpose: Our Founder’s Story</h2>
            <p className="text-muted mb-5">Arise Strong Together was born from one woman’s journey through gender-based violence. Our founder, Peris Njoroge, turned her own survival and healing into a mission, so that no one in Samburu has to walk that path alone. Today, that conviction shapes everything we do, from free psychosocial support to economic empowerment.</p>
            <Button to="/about">Read the full story</Button>
          </div>
        </Reveal>
        <p className="text-center mt-12 text-muted">More stories and updates are on the way.</p>
      </Section>
    </>
  );
}
