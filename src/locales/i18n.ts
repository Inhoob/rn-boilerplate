import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import ko from "./ko.json";
import * as i18nIsoCountries from "i18n-iso-countries";
const resources = {
  ko: {
    translation: ko,
  },
  en: {
    translation: en,
  },
};

i18n.use(initReactI18next).init({
  resources: resources,
  fallbackLng: "ko",
  interpolation: {
    escapeValue: false,
  },
  compatibilityJSON: "v4",
});
i18nIsoCountries.registerLocale(require("i18n-iso-countries/langs/ko.json"));
i18nIsoCountries.registerLocale(require("i18n-iso-countries/langs/en.json"));

export default { i18n };
