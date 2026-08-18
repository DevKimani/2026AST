import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { Banner, Crumb } from "@/components/blocks/Banner";
import { Section } from "@/components/blocks/Section";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { posts, categories } from "@/data/posts";

export default function Blog() {
  const [active, setActive] = useState("All");
  return (
    <>
      <Banner crumb={<Crumb label="Blog / News" />} eyebrow="News & stories" title="News & Stories"
        text="The milestones we reach, the stories of change, and the resources we share to help end gender-based violence." />
      <Section>
        <Reveal className="flex gap-2.5 flex-wrap mb-[34px]">
          {categories.map((c) => (
            <button key={c} onClick={() => setActive(c)}
              className={cn("text-[13.5px] font-semibold px-4 py-2 rounded-[20px] border-[1.5px] transition-colors",
                active === c ? "bg-forest text-white border-forest" : "bg-white text-muted border-sage-line hover:bg-forest hover:text-white hover:border-forest")}>
              {c}
            </button>
          ))}
        </Reveal>

        <Reveal className="grid lg:grid-cols-[1.1fr_.9fr] gap-9 items-center bg-white border border-sage-line rounded-[20px] overflow-hidden mb-10">
          <div className="aspect-[16/11] bg-gradient-to-br from-forest-mid to-forest-deep flex items-end p-4 text-white/70 text-xs">[ Featured image ]</div>
          <div className="p-9 max-lg:pt-0">
            <span className="text-xs font-bold tracking-[.1em] uppercase text-plum">Featured · Success Story</span>
            <h2 className="text-[30px] text-forest my-3">[Featured post title goes here]</h2>
            <p className="text-muted mb-4">[A compelling excerpt that draws readers into the featured story or announcement.]</p>
            <Button href="#">Read more</Button>
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p, i) => (
            <Reveal key={i}>
              <a href="#" className="block border border-sage-line rounded-[14px] overflow-hidden bg-white transition-[transform,box-shadow] hover:-translate-y-1 hover:shadow-[0_20px_40px_-26px_rgba(26,59,50,.4)]">
                <div className="aspect-[16/10] bg-gradient-to-br from-sage to-[#cfe0d6] flex items-end p-3 text-forest/85 text-[11px]">[ Image ]</div>
                <div className="p-[20px_22px_24px]">
                  <span className="text-[11px] font-bold tracking-[.1em] uppercase text-plum">{p.cat}</span>
                  <h3 className="text-lg text-forest my-2">{p.title}</h3>
                  <p className="text-muted text-[14.5px] mb-3">{p.excerpt}</p>
                  <span className="text-[13px] text-muted">[Author] · [Date]</span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
        <div className="text-center mt-10"><Button variant="ghost" size="lg">Load more</Button></div>
      </Section>
    </>
  );
}
