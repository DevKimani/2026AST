import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "./Section";

export function CtaBand() {
  return (
    <section className="py-[78px] max-[600px]:py-14">
      <div className="mx-auto max-w-[1180px] px-7">
        <Reveal className="bg-paper border border-sage-line rounded-[24px] p-14 max-[600px]:p-9 text-center shadow-[0_26px_60px_-40px_rgba(26,59,50,.4)]">
          <Eyebrow center>Stand with survivors</Eyebrow>
          <h2 className="text-[clamp(28px,3.4vw,40px)] tracking-[-.01em] mt-3.5">Every gift, hour, and partnership helps someone rise.</h2>
          <p className="text-muted text-lg my-[18px_auto_30px] max-w-[48ch] mx-auto">Whether you’re an individual, a business, or an organisation — there’s a place for you in this movement.</p>
          <div className="flex gap-3.5 justify-center flex-wrap">
            <Button to="/donate" size="lg">Donate</Button>
            <Button to="/volunteer" size="lg" variant="help">Volunteer</Button>
            <Button to="/get-involved" size="lg" variant="ghost">Partner with us</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
