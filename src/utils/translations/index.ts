import { initReactI18next } from 'react-i18next';

import i18n from 'i18next';

import translationEN from './translationEN.json';
import translationGA from './translationGA.json';

// import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  //   .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'ga',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: translationEN,
      },
      ga: {
        translation: translationGA,
      },
    },
  });

export default i18n;
