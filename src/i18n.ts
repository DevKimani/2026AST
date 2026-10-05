import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import sw from "./locales/sw.json";

const isBrowser =
  typeof window !== "undefined";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en,
      },

      sw: {
        translation: sw,
      },
    },

    // Always render English first.
    // This keeps build-time HTML and initial
    // browser hydration identical.
    lng: "en",

    fallbackLng: "en",

    interpolation: {
      escapeValue: false,
    },
  });

if (isBrowser) {
  document.documentElement.lang =
    i18n.language;

  i18n.on(
    "languageChanged",
    (lng) => {
      document.documentElement.lang =
        lng;

      try {
        localStorage.setItem(
          "ast_lang",
          lng
        );
      } catch {
        // Ignore unavailable storage.
      }
    }
  );
}

export function restoreSavedLanguage() {
  if (!isBrowser) {
    return;
  }

  try {
    const saved =
      localStorage.getItem(
        "ast_lang"
      );

    if (
      saved === "en" ||
      saved === "sw"
    ) {
      void i18n.changeLanguage(
        saved
      );
    }
  } catch {
    // Ignore unavailable storage.
  }
}

export default i18n;