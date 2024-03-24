import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        ola_mundo: "Hello World",
      },
    },
    pt: {
      translation: {
        ola_mundo: "Olá mundo",
      },
    },
    es: {
      translation: {
        ola_mundo: "¡Hola mundo!",
      },
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
