import { useState } from "react";
import {
  Shield,
  MessageCircle,
  Heart,
  BookOpen,
  Users,
  Coins,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "@/components/Reveal";
import {
  Section,
  Eyebrow,
  SectionHead,
} from "@/components/blocks/Section";
import {
  ProgramCard,
  Stat,
} from "@/components/blocks/Cards";
import { CtaBand } from "@/components/blocks/CtaBand";
import { DonateWidget } from "@/components/blocks/DonateWidget";
import { Photo } from "@/components/Photo";

export default function Home() {
  const [heroErr, setHeroErr] =
    useState(false);

  return (
    <>
      <section className="relative overflow-hidden">

        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(135deg,#2E5E4E,#163227)",
          }}
        >

          {!heroErr && (
            <img
              src="/images/hero.jpg"
              alt=""
              onError={() =>
                setHeroErr(true)
              }
              className="w-full h-full object-cover"
              fetchPriority="high"
            />
          )}

          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg,rgba(22,50,39,.92) 0%,rgba(22,50,39,.72) 45%,rgba(22,50,39,.45) 100%)",
            }}
          />

        </div>

        <div className="mx-auto max-w-[1180px] px-7 grid lg:grid-cols-[1.05fr_.9fr] gap-12 items-center pt-14 pb-20 min-h-[560px]">

          <div className="text-white reveal in">

            <span className="inline-flex items-center gap-[9px] text-[12.5px] tracking-[.16em] uppercase font-semibold text-[#f0d9b0] before:content-[''] before:w-5 before:h-[1.5px] before:bg-ochre">
              Samburu County, Kenya
            </span>

            <h1 className="text-[clamp(30px,7vw,62px)] tracking-[-.015em] mt-5 text-white">
              From Surviving to{" "}

              <span className="relative text-[#e8b877] whitespace-nowrap">
                Thriving

                <svg
                  className="absolute left-0 -right-1 -bottom-3 h-[20px] w-full"
                  viewBox="0 0 300 24"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M4 20 C 80 20, 150 20, 296 8"
                    stroke="#C98A3B"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                  <path
                    d="M255 12 C 258 4, 266 2, 273 3 C 272 10, 264 13, 257 12"
                    fill="#C98A3B"
                  />
                </svg>

              </span>

            </h1>

            <p className="text-[19px] text-white/85 max-w-[40ch] mt-6">
              Arise Strong Together supports women,
              girls, and young mothers affected by
              gender-based violence through
              survivor-centred support, community
              prevention, and pathways toward greater
              economic independence.
            </p>

            <div className="flex gap-3.5 mt-8 flex-wrap">

              <Link
                to="/get-help"
                className="inline-flex items-center gap-2 font-semibold text-base px-6 py-[14px] rounded-[10px] bg-white text-forest hover:bg-[#f2ede4] transition-colors"
              >
                I need help
                <ArrowRight size={17} />
              </Link>

              <Link
                to="/programs"
                className="inline-flex items-center gap-2 font-semibold text-base px-6 py-[14px] rounded-[10px] border-[1.5px] border-white/55 text-white bg-white/10 hover:bg-white/20 transition-colors"
              >
                Our programmes
              </Link>

            </div>

            <div className="mt-6 text-[14.5px] text-white/80 flex items-center gap-2.5">

              <Shield
                size={18}
                className="flex-none text-[#e8b877]"
              />

              Confidential · Survivor-centred · At
              your own pace

            </div>

          </div>

          <div className="reveal in">
            <DonateWidget />
          </div>

        </div>

      </section>

      <div className="bg-terracotta text-white">

        <div className="mx-auto max-w-[1180px] px-7 flex items-center justify-between gap-6 py-[22px] flex-wrap max-[600px]:flex-col max-[600px]:items-start">

          <div className="flex items-center gap-4">

            <MessageCircle
              size={30}
              strokeWidth={1.8}
              className="flex-none"
            />

            <div>

              <h2 className="text-[22px] text-white">
                You are not alone.
              </h2>

              <p className="text-[14.5px] text-white/85 mt-0.5">
                If you are experiencing gender-based
                violence, you can review confidential
                support options and choose what feels
                safest for you.
              </p>

            </div>

          </div>

          <Link
            to="/get-help"
            className="inline-flex items-center gap-2 font-bold text-[15px] px-5 py-[11px] rounded-[10px] bg-white text-terracotta hover:bg-[#fbeee6] transition-colors"
          >
            See support options
          </Link>

        </div>

      </div>

      <Section>

        <div className="grid lg:grid-cols-[1fr_1fr] gap-14 items-center">

          <Reveal>

            <Eyebrow>
              Our mission
            </Eyebrow>

            <h2 className="text-[clamp(22px,5vw,38px)] mt-3.5 tracking-[-.01em]">
              Standing with women and girls while
              working to prevent violence
            </h2>

            <p className="text-lg text-muted mt-5">
              Arise Strong Together is a
              survivor-founded community-based
              organisation in Samburu County,
              registered in June 2025. We bring
              together lived experience, counselling
              knowledge, community engagement, and
              livelihood support to help survivors
              move forward while strengthening
              prevention in the wider community.
            </p>

            <Link
              to="/about"
              className="inline-flex items-center gap-2 font-semibold text-terracotta mt-6 hover:gap-3 transition-[gap]"
            >
              Learn our story
              <ArrowRight size={17} />
            </Link>

          </Reveal>

          <Reveal>

            <Photo
              src="/images/mission.jpg"
              alt="Woman seated in a shoe shop"
              caption="Livelihood and enterprise"
              className="aspect-[5/4]"
            />

          </Reveal>

        </div>

      </Section>

      <Section variant="sage">

        <SectionHead
          eyebrow="Our foundation"
          title="Community-rooted work in Samburu"
        />

        <div className="grid gap-[22px] grid-cols-1 sm:grid-cols-3">

          <Reveal>
            <Stat
              n="2025"
              label="registered as a community-based organisation"
            />
          </Reveal>

          <Reveal>
            <Stat
              n="4"
              label="core programme areas"
            />
          </Reveal>

          <Reveal>
            <Stat
              n="Samburu"
              label="community-rooted and locally focused"
            />
          </Reveal>

        </div>

        <p className="text-center mt-6 text-[15px] text-muted max-w-[70ch] mx-auto">
          As our monitoring systems grow, we aim to
          publish impact figures only when they have
          clear definitions, reporting periods, and
          supporting records.
        </p>

      </Section>

      <Section>

        <Reveal className="flex justify-between items-end gap-5 mb-[42px] flex-wrap">

          <div>

            <Eyebrow>
              What we do
            </Eyebrow>

            <h2 className="text-[clamp(22px,5vw,38px)] mt-3.5 max-w-[18ch]">
              Connected programmes for support,
              prevention, and resilience
            </h2>

          </div>

          <Link
            to="/programs"
            className="inline-flex items-center gap-2 font-semibold text-base px-6 py-[14px] rounded-[10px] bg-transparent text-forest border-[1.5px] border-sage-line hover:border-forest hover:bg-sage transition-colors"
          >
            All programmes
          </Link>

        </Reveal>

        <div className="grid gap-[22px] md:grid-cols-2">

          <Reveal>

            <ProgramCard
              to="/programs/gbv"
              icon={
                <Heart
                  size={24}
                  strokeWidth={1.8}
                />
              }
              title="Gender-Based Violence Response"
            >
              Survivor-centred support, psychosocial
              care, safety planning, and appropriate
              referral options.
            </ProgramCard>

          </Reveal>

          <Reveal>

            <ProgramCard
              to="/programs/capacity-building"
              icon={
                <BookOpen
                  size={24}
                  strokeWidth={1.8}
                />
              }
              title="Capacity Building"
            >
              Practical learning that strengthens
              confidence, leadership, knowledge, and
              community participation.
            </ProgramCard>

          </Reveal>

          <Reveal>

            <ProgramCard
              to="/programs/community-advocacy"
              icon={
                <Users
                  size={24}
                  strokeWidth={1.8}
                />
              }
              title="Community Advocacy"
            >
              Dialogue and awareness activities that
              challenge harmful norms and strengthen
              prevention.
            </ProgramCard>

          </Reveal>

          <Reveal>

            <ProgramCard
              to="/programs/economic-empowerment"
              icon={
                <Coins
                  size={24}
                  strokeWidth={1.8}
                />
              }
              title="Economic Empowerment"
            >
              Livelihood and enterprise support that
              can strengthen financial independence
              and resilience.
            </ProgramCard>

          </Reveal>

        </div>

      </Section>

      <Section variant="green">

        <div className="grid lg:grid-cols-[1.1fr_.9fr] gap-12 items-center">

          <Reveal>

            <Eyebrow className="text-[#e8c9a6]">
              Turning pain into purpose
            </Eyebrow>

            <h2 className="text-[clamp(22px,4.8vw,34px)] leading-[1.25] mt-[18px] text-white">
              A survivor-founded organisation built
              so others do not have to navigate
              healing alone
            </h2>

            <p className="mt-[18px] text-[16px] leading-7 text-[#d8c4ad] max-w-[55ch]">
              Arise Strong Together grew from founder
              Peris Njoroge's lived experience and a
              determination to create more supportive,
              dignified pathways for people affected
              by gender-based violence.
            </p>

            <Link
              to="/about"
              className="inline-flex items-center gap-2 mt-6 font-semibold text-white hover:gap-3 transition-[gap]"
            >
              Read our story
              <ArrowRight size={17} />
            </Link>

          </Reveal>

          <Reveal>

            <Photo
              src="/images/story.jpg"
              alt="Peris Njoroge, founder of Arise Strong Together"
              className="aspect-[5/4]"
            />

          </Reveal>

        </div>

      </Section>

      <CtaBand />
    </>
  );
}