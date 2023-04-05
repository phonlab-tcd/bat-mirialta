/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTranslation } from 'react-i18next';

import { ResponseModel, TranslationContextModel } from '@/models';
import translationEN from '@/utils/translations/translationEN.json';
import translationGA from '@/utils/translations/translationGA.json';

const usePushRandomResponse = () => {
  const { t, i18n } = useTranslation();

  const pushRandomResponse = (
    responseObject: ResponseModel[],
    category: string,
    type: string,
    name: string,
    granularity: string,
    context: TranslationContextModel,
  ) => {
    let translationFile: any = translationGA;
    if (i18n.language === 'en') {
      translationFile = translationEN;
    }
    const noOfResponses = Object.keys(translationFile[category][type][name][granularity]).length;
    const randomNo = Math.ceil(Math.random() * noOfResponses);
    const stringifiedNoOfResponses =
      randomNo < 10 ? '.text_0' + String(randomNo) : '.text_' + String(noOfResponses);

    const textFromTranslation = t(
      category + '.' + type + '.' + name + '.' + granularity + stringifiedNoOfResponses,
      context,
    );

    responseObject.push({
      text: textFromTranslation,
      form: 'statement',
    });
    return responseObject;
  };
  return pushRandomResponse;
};

export default usePushRandomResponse;
