import {
  Link,
} from "react-router-dom";

import {
  ArrowLeft,
  Home,
} from "lucide-react";

import { Reveal } from "@/components/Reveal";

import { Section } from "@/components/blocks/Section";

export default function NotFound() {
  return (
    <Section>

      <Reveal className="max-w-[700px] mx-auto text-center py-16 sm:py-24">

        <p className="text-sm font-semibold tracking-[.14em] uppercase text-terracotta mb-3">
          Error 404
        </p>

        <h1 className="text-[clamp(34px,7vw,58px)] text-forest">
          We could not find that page
        </h1>

        <p className="text-lg text-muted mt-5 max-w-[52ch] mx-auto">
          The page may have moved,
          the address may be incorrect,
          or the page may no longer
          exist.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mt-8">

          <Link
            to="/"
            className="inline-flex items-center gap-2 font-semibold text-white bg-forest px-5 py-3 rounded-[10px] hover:bg-forest-deep transition-colors"
          >
            <Home size={17} />

            Go to homepage
          </Link>

          <Link
            to="/get-help"
            className="inline-flex items-center gap-2 font-semibold text-forest border border-sage-line px-5 py-3 rounded-[10px] hover:bg-sage transition-colors"
          >
            <ArrowLeft size={17} />

            Get support
          </Link>

        </div>

      </Reveal>

    </Section>
  );
}