import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import {
  format as formatDate,
  formatDistance,
  formatRelative,
  isDate,
} from "date-fns";
import { enGB, itCH } from "date-fns/locale"; // import all locales we need
import LanguageDetector from "i18next-browser-languagedetector";

// locale files
import translationEn from "@/locales/en/translation.json";
import translationIt from "@/locales/it/translation.json";

const locales = { en: enGB, it: itCH }; // used to look up the required locale

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    // debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
      format: (value, format, lng) => {
        if (isDate(value)) {
          const locale = locales[lng];

          if (format === "short") return formatDate(value, "P", { locale });
          if (format === "long") return formatDate(value, "PPPP", { locale });
          if (format === "relative")
            return formatRelative(value, new Date(), { locale });
          if (format === "ago")
            return formatDistance(value, new Date(), {
              locale,
              addSuffix: true,
            });

          return formatDate(value, format, { locale });
        }
        return value;
      },
    },
    resources: {
      en: {
        translation: translationEn,
      },
      it: {
        translation: translationIt,
      },
    },
  });

export default i18n;
