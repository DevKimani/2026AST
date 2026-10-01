import {
  useParams,
  Navigate,
} from "react-router-dom";

import {
  ShieldCheck,
  MessageCircle,
} from "lucide-react";

import { Reveal } from "@/components/Reveal";

import {
  Banner,
  Crumb,
} from "@/components/blocks/Banner";

import { Section } from "@/components/blocks/Section";

import { Callout } from "@/components/blocks/Callout";

import { Button } from "@/components/ui/button";

import { CtaBand } from "@/components/blocks/CtaBand";

import { getProgram } from "@/data/programs";

export default function ProgramDetail() {
  const { slug } = useParams();

  const program =
    getProgram(slug);

  if (!program) {
    return (
      <Navigate
        to="/programs"
        replace
      />
    );
  }

  const isGbvResponse =
    program.slug === "gbv";

  return (
    <>
      <Banner
        green
        crumb={
          <Crumb
            label={program.name}
            mid={{
              to: "/programs",
              label: "Programs",
            }}
          />
        }
        eyebrow="Programme"
        title={program.name}
        text={program.intro}
      />

      <Section>

        <div className="grid lg:grid-cols-[1fr_340px] gap-14 items-start">

          <Reveal className="prose">

            <h2>
              {program.heading1}
            </h2>

            <ul>
              {program.list1.map(
                (item) => (
                  <li key={item}>
                    {item}
                  </li>
                )
              )}
            </ul>

            <h2>
              {program.heading2}
            </h2>

            <ul>
              {program.list2.map(
                (item) => (
                  <li key={item}>
                    {item}
                  </li>
                )
              )}
            </ul>

            <h2>
              Who this programme is for
            </h2>

            <p>
              {program.who}
            </p>

            <div className="mt-5">

              <Callout
                variant="calm"
                icon={
                  <ShieldCheck
                    size={22}
                    strokeWidth={1.8}
                  />
                }
                title="Dignity before storytelling"
              >

                No one is required to share a
                personal story publicly in order to
                receive support or take part in AST's
                work. If a personal story is ever
                shared publicly, it should be based
                on informed consent and the level of
                anonymity or identification chosen by
                the person involved.

              </Callout>

            </div>

          </Reveal>

          <Reveal className="bg-white border border-sage-line rounded-[14px] p-[26px] lg:sticky lg:top-[100px]">

            <MessageCircle
              size={24}
              strokeWidth={1.8}
              className="text-forest"
            />

            <h3 className="text-xl mt-3 mb-2">
              {isGbvResponse
                ? "Need support?"
                : "Interested in this programme?"}
            </h3>

            <p className="text-[14.5px] text-muted mb-5">

              {isGbvResponse
                ? "You do not need to decide exactly what kind of support you need before reaching out. Start with our support page and choose the contact option that feels safest for you."
                : "Programme activities depend on current capacity, location, participant needs, and available partnerships. Contact AST to ask what is currently available or to discuss collaboration."}

            </p>

            <Button
              to={
                isGbvResponse
                  ? "/get-help"
                  : "/contact"
              }
              variant={
                isGbvResponse
                  ? "help"
                  : "primary"
              }
              className="w-full justify-center"
            >

              {isGbvResponse
                ? "Get support"
                : "Contact AST"}

            </Button>

          </Reveal>

        </div>

      </Section>

      <CtaBand />
    </>
  );
}