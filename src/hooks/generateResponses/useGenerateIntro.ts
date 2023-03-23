/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable react-hooks/exhaustive-deps */
import { ResponseModel } from '@/models';
import { useProfile } from '@/store/auth';
import {
  useNoQuestions,
  useSelectedForm,
  useSelectedTense,
  useSelectedVerb,
} from '@/store/scripts';

const useGenerateIntro = () => {
  const { profile } = useProfile();
  const { selectedVerb } = useSelectedVerb();
  const { noQuestions } = useNoQuestions();
  const { selectedTense } = useSelectedTense();
  const { selectedForm } = useSelectedForm();

  const generateIntro = () => {
    const intro: ResponseModel[] = [
      {
        text: `Hi ${profile !== null ? profile.username : 'there'}!`,
        form: 'statement',
      },
      {
        text: `Let's practice ${noQuestions} of ${
          selectedVerb !== undefined ? selectedVerb.name : 'all verbs'
        }, ${selectedTense !== undefined ? selectedTense.name : 'all tenses'}, and ${
          selectedForm !== undefined ? selectedForm.name : 'all forms'
        }`,
        form: 'statement',
      },
    ];
    return intro;
  };

  return generateIntro;
};

export default useGenerateIntro;
