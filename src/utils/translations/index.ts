import { initReactI18next } from 'react-i18next';

import i18n from 'i18next';

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
        translation: {
          pageTitles: {
            home: 'Home',
            chat: 'Chat',
            history: 'My History',
          },
          headers: {
            stats: 'My Stats',
            verb: 'Verb',
            tense: 'Tense',
            form: 'Form',
          },
          subHeaders: {
            played: 'Played',
            average: 'Average',
            score: 'score',
            all: 'all',
          },
          buttons: {
            start: 'Start',
            seeAll: 'See All',
            continue: 'continue',
          },
          months: {
            jan: 'Jan',
            feb: 'Feb',
            mar: 'Mar',
            apr: 'Apr',
            may: 'May',
            jun: 'Jun',
            jul: 'Jul',
            aug: 'Aug',
            sep: 'Sep',
            oct: 'Oct',
            nov: 'Nov',
            dec: 'Dec',
          },
          errorMessages: {
            app: {
              crash: {
                title: 'Hmmmm... something went wrong. You can:',
                options: {
                  email: 'contact the Abair team through this email - sloanjs@tcd.ie',
                  reset: 'Press here to reset the application',
                },
              },
            },
            loader: {
              fail: 'There is something wrong with this component loading process... please try again later',
            },
            images: {
              failed: 'something went wrong during image loading :(',
            },
            404: 'No route for this URL',
          },
        },
      },
      ga: {
        translation: {
          pageTitles: {
            home: 'Baile',
            chat: 'Comhrá',
            history: 'Mo Stair',
          },
          headers: {
            stats: 'Mo Staitisticí',
            verb: 'Briathar',
            tense: 'Aimsir',
            form: 'Foirm',
          },
          subHeaders: {
            played: 'A Imrítear',
            average: 'Meánscór',
            score: 'Scór',
            all: 'go léir',
          },
          buttons: {
            start: 'Tús a Chur le Comhrá Nua',
            seeAll: 'Gach Rud a Fheicáil',
            continue: 'Leanúint ar Aghaidh ag Comhrá',
          },
          months: {
            jan: 'Ean',
            feb: 'Fea',
            mar: 'Már',
            apr: 'Aib',
            may: 'Bea',
            jun: 'Mei',
            jul: 'Iúi',
            aug: 'Lún',
            sep: 'MFó',
            oct: 'DFó',
            nov: 'Sam',
            dec: 'Nol',
          },
          errorMessages: {
            app: {
              crash: {
                title: 'Hmmmmm… chlis ar an gcóras. Is féidir leat:',
                options: {
                  email: 'Dul i dteagmháil le foireann ABAIR ag an seoladh - sloanjs@tcd.ie',
                  reset: 'Brúigh anseo chun an feidhmchlár a athshocrú',
                },
              },
            },
            loader: {
              fail: 'There is something wrong with this component loading process... please try again later',
            },
            images: {
              failed: 'something went wrong during image loading :(',
            },
            404: 'No route for this URL',
          },
        },
      },
    },
  });

export default i18n;
