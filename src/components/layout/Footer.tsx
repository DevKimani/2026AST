import { Link } from "react-router-dom";

import {
  Lock,
  Instagram,
} from "lucide-react";

import { useTranslation } from "react-i18next";

import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";

const fa =
  "block text-[#c9ded4] text-[15px] mb-2.5 hover:text-white";

export function Footer() {
  const {
    t,
    i18n,
  } = useTranslation();

  const lang =
    i18n.language.startsWith("sw")
      ? "sw"
      : "en";

  const langBtn = (
    active: boolean
  ) =>
    cn(
      "text-[13px] px-3 py-1.5",

      active
        ? "bg-white/15 text-white"
        : "text-[#c9ded4]"
    );

  const year =
    new Date().getFullYear();

  return (
    <footer className="bg-forest-deep text-[#c9ded4] pt-16 pb-[30px]">

      <div className="mx-auto max-w-[1180px] px-7">

        <div className="grid gap-[38px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">

          <div>

            <div className="font-display text-[22px] text-white font-semibold mb-3.5 flex items-center gap-2.5">

              <Logo
                size={30}
                badge
              />

              Arise Strong Together

            </div>

            <p className="text-[14.5px] max-w-[34ch] text-[#a9ccbe]">
              {t("footer.tagline")}
            </p>

            <a
              href="https://www.instagram.com/arisestrongtogether/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="inline-flex items-center gap-2 mt-4 text-[#c9ded4] hover:text-white text-[14px]"
            >
              <Instagram size={18} />

              @arisestrongtogether
            </a>

          </div>

          <div>

            <h4 className="text-[13px] tracking-[.12em] uppercase text-[#8fb6a7] mb-4 font-semibold font-sans">
              {t("footer.explore")}
            </h4>

            <Link
              className={fa}
              to="/about"
            >
              {t("footer.aboutUs")}
            </Link>

            <Link
              className={fa}
              to="/programs"
            >
              {t("nav.programs")}
            </Link>

            <Link
              className={fa}
              to="/get-involved"
            >
              {t("nav.getInvolved")}
            </Link>

            <Link
              className={fa}
              to="/blog"
            >
              {t("footer.blogNews")}
            </Link>

          </div>

          <div>

            <h4 className="text-[13px] tracking-[.12em] uppercase text-[#8fb6a7] mb-4 font-semibold font-sans">
              {t("footer.support")}
            </h4>

            <Link
              className="block text-[#f0c8d3] font-semibold text-[15px] mb-2.5 hover:text-white"
              to="/get-help"
            >
              {t("nav.help")}
            </Link>

            <Link
              className={fa}
              to="/donate"
            >
              {t("nav.donate")}
            </Link>

            <Link
              className={fa}
              to="/volunteer"
            >
              {t("nav.volunteer")}
            </Link>

            <Link
              className={fa}
              to="/contact"
            >
              {t("nav.contact")}
            </Link>

            <Link
              className={fa}
              to="/privacy"
            >
              Privacy & Safety
            </Link>

          </div>

          <div>

            <h4 className="text-[13px] tracking-[.12em] uppercase text-[#8fb6a7] mb-4 font-semibold font-sans">
              {t("footer.yourSafety")}
            </h4>

            <div className="bg-plum/15 border border-plum/40 rounded-xl p-4 text-[13.5px] text-[#e7cdd5]">

              <strong className="text-white block mb-1 text-sm">
                {t("footer.coverTitle")}
              </strong>

              {t("footer.coverBody")}{" "}

              <Link
                to="/privacy#safer-browsing"
                className="underline text-white"
              >
                Safer browsing guidance
              </Link>
              .

            </div>

          </div>

        </div>

        <div className="border-t border-white/10 mt-11 pt-[22px] flex justify-between gap-4 flex-wrap items-center text-[13px] text-[#8fb6a7]">

          <span className="inline-flex items-center gap-1.5">

            <Lock size={14} />

            {t("footer.secure")} · © {year}{" "}
            Arise Strong Together

          </span>

          <span className="inline-flex border border-white/20 rounded-lg overflow-hidden">

            <button
              className={
                langBtn(
                  lang === "en"
                )
              }
              onClick={() =>
                i18n.changeLanguage(
                  "en"
                )
              }
            >
              English
            </button>

            <button
              className={
                langBtn(
                  lang === "sw"
                )
              }
              onClick={() =>
                i18n.changeLanguage(
                  "sw"
                )
              }
            >
              Kiswahili
            </button>

          </span>

        </div>

      </div>

    </footer>
  );
}