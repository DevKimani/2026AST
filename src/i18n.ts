import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import sw from "./locales/sw.json";

const saved = (() => { try { return localStorage.getItem("ast_lang"); } catch { return null; } })();

i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, sw: { translation: sw } },
  lng: saved || "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

document.documentElement.lang = i18n.language;
i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng;
  try { localStorage.setItem("ast_lang", lng); } catch { /* ignore */ }
});

export default i18n;
