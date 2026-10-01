import { Reveal } from "@/components/Reveal";
import {
  Banner,
  Crumb,
} from "@/components/blocks/Banner";
import { Section } from "@/components/blocks/Section";
import { Button } from "@/components/ui/button";
import { Photo } from "@/components/Photo";

export default function Blog() {
  return (
    <>
      <Banner
        crumb={<Crumb label="Blog / News" />}
        eyebrow="News & stories"
        title="News & Stories"
        text="Updates from Arise Strong Together, reflections from our work, and resources connected to survivor support, prevention, and community resilience."
      />

      <Section>

        <Reveal className="grid lg:grid-cols-[1.1fr_.9fr] gap-10 items-center">

          <Photo
            src="/images/story.jpg"
            alt="Peris Njoroge, founder of Arise Strong Together"
            className="aspect-[16/11]"
          />

          <div>

            <span className="text-xs font-bold tracking-[.1em] uppercase text-plum">
              Our story
            </span>

            <h2 className="text-[clamp(22px,5vw,30px)] text-forest my-3">
              Why Arise Strong Together Was Founded
            </h2>

            <p className="text-muted mb-5">
              Arise Strong Together grew from founder
              Peris Njoroge's lived experience and a
              determination to make support more
              compassionate, practical, and
              community-rooted. That experience now
              informs AST's work across survivor
              support, prevention, skills-building,
              and economic resilience.
            </p>

            <Button to="/about">
              Read our story
            </Button>

          </div>

        </Reveal>

        <p className="text-center mt-12 text-muted">
          Additional news, resources, and community
          updates will appear here as AST publishes
          them.
        </p>

      </Section>
    </>
  );
}