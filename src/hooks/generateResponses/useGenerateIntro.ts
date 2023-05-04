/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable react-hooks/exhaustive-deps */
import { useTranslation } from 'react-i18next';

import { usePushRandomResponse } from '@/hooks';
import { useProfile } from '@/store/auth';
import { useSelectedForm, useSelectedTense, useSelectedVerb } from '@/store/scripts';

const useGenerateIntro = () => {
  const { profile } = useProfile();
  const { selectedVerb } = useSelectedVerb();
  const { t } = useTranslation();

  const { selectedTense } = useSelectedTense();
  const { selectedForm } = useSelectedForm();
  const pushRandomResponse = usePushRandomResponse();

  const generateIntro = () => {
    let responseObject = pushRandomResponse([], 'filler', 'intro', 'greeting', 'naive', {
      name: profile !== null && profile.username !== null ? profile.username : 'there',
    });
    responseObject = pushRandomResponse(
      responseObject,
      'filler',
      'intro',
      'taskDescription',
      'basic',
      {
        verb: selectedVerb !== undefined ? selectedVerb.name : (t('task.allVerbs') as string),
        tense: selectedTense !== undefined ? selectedTense.name : (t('task.allTenses') as string),
        form: selectedForm !== undefined ? selectedForm.name : (t('task.allForms') as string),
      },
    );
    responseObject = pushRandomResponse(
      responseObject,
      'filler',
      'intro',
      'questionDescription',
      'basic',
      {},
    );
    responseObject = pushRandomResponse(
      responseObject,
      'filler',
      'intro',
      'hintDescription',
      'basic',
      {},
    );
    responseObject = pushRandomResponse(responseObject, 'filler', 'intro', 'getReady', 'basic', {});

    return responseObject;
  };

  return generateIntro;
};

export default useGenerateIntro;
