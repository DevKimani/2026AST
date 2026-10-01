import { useState } from "react";

import {
  Shield,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  Instagram,
} from "lucide-react";

import { Link } from "react-router-dom";

import { Reveal } from "@/components/Reveal";

import {
  Banner,
  Crumb,
} from "@/components/blocks/Banner";

import { Section } from "@/components/blocks/Section";
import { Callout } from "@/components/blocks/Callout";
import { Button } from "@/components/ui/button";

import { submitContact } from "@/lib/submissions";

const input =
  "font-sans text-[15px] px-3.5 py-3 border-[1.5px] border-sage-line rounded-[10px] bg-white text-ink focus:border-forest focus:outline-none";

const label =
  "text-sm font-semibold text-ink";

type Status =
  | "idle"
  | "sending"
  | "sent"
  | "error";

export default function Contact() {
  const [status, setStatus] =
    useState<Status>("idle");

  const [reason, setReason] =
    useState("General enquiry");

  const [errorMessage, setErrorMessage] =
    useState("");

  async function onSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const f =
      new FormData(e.currentTarget);

    // Honeypot spam protection
    if (f.get("company")) {
      setStatus("sent");
      return;
    }

    const email =
      String(f.get("email") || "").trim();

    const phone =
      String(f.get("phone") || "").trim();

    if (!email && !phone) {
      setErrorMessage(
        "Please provide either an email address or phone number so we can respond safely."
      );

      setStatus("error");
      return;
    }

    if (f.get("consent") !== "on") {
      setErrorMessage(
        "Please confirm that it is safe for us to contact you using the details provided."
      );

      setStatus("error");
      return;
    }

    setErrorMessage("");
    setStatus("sending");

    try {
      await submitContact({
        name:
          String(
            f.get("name") || ""
          ).trim(),

        email:
          email || undefined,

        phone:
          phone || undefined,

        reason:
          String(
            f.get("reason") || ""
          ) || undefined,

        message:
          String(
            f.get("message") || ""
          ).trim(),

        consent: true,
      });

      setStatus("sent");
    } catch {
      setErrorMessage(
        "Something went wrong sending your message. Please try again, or use one of the support numbers shown above."
      );

      setStatus("error");
    }
  }

  return (
    <>
      <Banner
        crumb={<Crumb label="Contact" />}
        eyebrow="Get in touch"
        title="Contact Us"
        text="Whether you need support, want to partner, or have a question, you can reach us here."
      />

      <Section>
        <div className="grid lg:grid-cols-[1fr_340px] gap-14 items-start">

          <div>

            <Reveal className="mb-6">
              <Callout
                variant="warn"
                icon={
                  <Shield
                    size={18}
                    strokeWidth={1.8}
                  />
                }
                title="Seeking support?"
              >
                If you are in immediate danger,
                call{" "}
                <strong>
                  999, 112, or 911
                </strong>
                . Kenya's national GBV helpline is{" "}
                <strong>1195</strong>.
                You can also visit our{" "}
                <Link
                  to="/get-help"
                  className="text-plum-deep font-semibold underline"
                >
                  Get Help
                </Link>{" "}
                page. If it is not safe for you to
                receive a reply by email or phone,
                do not use this form from a
                monitored device.
              </Callout>
            </Reveal>

            {status === "sent" ? (

              <Reveal>
                <Callout
                  variant="calm"
                  icon={
                    <CheckCircle2
                      size={22}
                      strokeWidth={1.8}
                    />
                  }
                  title="Message received"
                >
                  Thank you for reaching out.
                  We will use only the contact
                  details you provided to respond.
                  If your matter becomes urgent,
                  please use the emergency or
                  national GBV support numbers
                  above.
                </Callout>
              </Reveal>

            ) : (

              <Reveal>
                <form
                  className="grid gap-[18px]"
                  onSubmit={onSubmit}
                >

                  <div className="grid sm:grid-cols-2 gap-[18px]">

                    <div className="flex flex-col gap-[7px]">

                      <label
                        htmlFor="contact-name"
                        className={label}
                      >
                        Name or alias
                      </label>

                      <input
                        id="contact-name"
                        name="name"
                        required
                        maxLength={120}
                        className={input}
                        placeholder="The name you want us to use"
                      />

                    </div>

                    <div className="flex flex-col gap-[7px]">

                      <label
                        htmlFor="contact-email"
                        className={label}
                      >
                        Email (optional)
                      </label>

                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        maxLength={320}
                        className={input}
                        placeholder="you@example.com"
                        autoComplete="email"
                      />

                    </div>

                  </div>

                  <div className="flex flex-col gap-[7px]">

                    <label
                      htmlFor="contact-phone"
                      className={label}
                    >
                      Phone (optional)
                    </label>

                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      maxLength={60}
                      className={input}
                      autoComplete="tel"
                    />

                    <p className="text-xs text-muted">
                      Please provide at least one
                      safe contact method: email
                      or phone.
                    </p>

                  </div>

                  <div className="flex flex-col gap-[7px]">

                    <label
                      htmlFor="contact-reason"
                      className={label}
                    >
                      Reason for contact
                    </label>

                    <select
                      id="contact-reason"
                      name="reason"
                      className={input}
                      value={reason}
                      onChange={(e) =>
                        setReason(
                          e.target.value
                        )
                      }
                    >
                      <option>
                        General enquiry
                      </option>

                      <option>
                        Get help
                      </option>

                      <option>
                        Volunteering
                      </option>

                      <option>
                        Partnership
                      </option>

                      <option>
                        Donation
                      </option>

                      <option>
                        Media
                      </option>
                    </select>

                  </div>

                  {reason === "Get help" && (

                    <div className="rounded-xl border border-[#EAD6BC] bg-[#FBF0E4] p-4 text-sm text-[#6b4e26]">
                      You do not need to describe
                      the violence or share medical,
                      legal, identification, or
                      other sensitive details here.
                      Tell us only enough to
                      understand how you would like
                      us to contact or support you.
                    </div>

                  )}

                  <div className="flex flex-col gap-[7px]">

                    <label
                      htmlFor="contact-message"
                      className={label}
                    >
                      Message
                    </label>

                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      maxLength={5000}
                      className={`${input} min-h-[130px] resize-y`}
                      placeholder={
                        reason === "Get help"
                          ? "For example: Please contact me about support options."
                          : "How can we help?"
                      }
                    />

                  </div>

                  <input
                    name="company"
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                    aria-hidden="true"
                  />

                  <label className="flex gap-2.5 items-start text-sm text-muted">

                    <input
                      name="consent"
                      type="checkbox"
                      required
                      className="mt-1"
                    />

                    <span>
                      I confirm that it is safe for
                      Arise Strong Together to
                      contact me using the email or
                      phone number I provided. I
                      have read the{" "}
                      <Link
                        to="/privacy"
                        className="underline text-forest"
                      >
                        privacy notice
                      </Link>
                      .
                    </span>

                  </label>

                  <Button
                    size="lg"
                    type="submit"
                    disabled={
                      status === "sending"
                    }
                  >
                    {status === "sending"
                      ? "Sending..."
                      : "Send message"}
                  </Button>

                  {status === "error" && (
                    <p
                      role="alert"
                      aria-live="polite"
                      className="text-plum text-sm"
                    >
                      {errorMessage}
                    </p>
                  )}

                </form>
              </Reveal>

            )}

          </div>

          <Reveal>

            <div className="bg-white border border-sage-line rounded-[14px] p-[26px] mb-5">

              <h3 className="text-xl mb-3">
                Our details
              </h3>

              {[
                [
                  <Mail
                    size={20}
                    strokeWidth={1.8}
                  />,
                  "arisestrongtogether@gmail.com",
                ],

                [
                  <Phone
                    size={20}
                    strokeWidth={1.8}
                  />,
                  "0180 740 140",
                ],

                [
                  <MapPin
                    size={20}
                    strokeWidth={1.8}
                  />,
                  "Samburu County, Kenya",
                ],
              ].map(([ic, t], i) => (

                <p
                  key={i}
                  className="flex gap-2.5 items-start text-ink mb-2.5"
                >
                  {ic}
                  <span>{t}</span>
                </p>

              ))}

              <h4 className="font-sans text-[13px] tracking-[.1em] uppercase text-muted mb-2.5 mt-4">
                Follow us
              </h4>

              <div className="flex gap-3">

                <a
                  href="https://www.instagram.com/arisestrongtogether/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-[42px] h-[42px] rounded-[11px] bg-sage flex items-center justify-center text-forest hover:bg-forest hover:text-white transition-colors"
                >
                  <Instagram size={20} />
                </a>

              </div>

            </div>

            <div className="rounded-[14px] bg-sage border border-sage-line p-6 text-sm text-muted">

              <MapPin
                size={20}
                strokeWidth={1.8}
                className="text-forest mb-2"
              />

              Arise Strong Together is based in
              Samburu County, Kenya. Contact us
              before visiting so we can confirm
              the appropriate meeting location.

            </div>

          </Reveal>

        </div>
      </Section>
    </>
  );
}