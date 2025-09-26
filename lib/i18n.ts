import i18n from "i18next"
import { initReactI18next } from "react-i18next"

// Import translation files
import enCommon from "../locales/en/common.json"
import yoCommon from "../locales/yo/common.json"
import haCommon from "../locales/ha/common.json"
import igCommon from "../locales/ig/common.json"

const resources = {
  en: {
    common: enCommon,
  },
  yo: {
    common: yoCommon,
  },
  ha: {
    common: haCommon,
  },
  ig: {
    common: igCommon,
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // default language
  fallbackLng: "en",
  debug: false,

  ns: ["common"],
  defaultNS: "common",

  interpolation: {
    escapeValue: false,
  },

  react: {
    useSuspense: false,
  },
})

export default i18n
