/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable react-hooks/exhaustive-deps */
import { usePushRandomResponse } from '@/hooks';
import { useProfile } from '@/store/auth';
import { useSelectedForm, useSelectedTense, useSelectedVerb } from '@/store/scripts';

const useGenerateIntro = () => {
  const { profile } = useProfile();
  const { selectedVerb } = useSelectedVerb();

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
        verb: selectedVerb !== undefined ? selectedVerb.name : 'all verbs',
        tense: selectedTense !== undefined ? selectedTense.name : 'all tenses',
        form: selectedForm !== undefined ? selectedForm.name : 'all forms',
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
    responseObject = pushRandomResponse(responseObject, 'filler', 'intro', 'getReady', 'basic', {});

    return responseObject;
  };

  return generateIntro;
};

export default useGenerateIntro;
