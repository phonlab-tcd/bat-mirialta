/* eslint-disable @typescript-eslint/no-explicit-any */
import { usePushRandomResponse } from '@/hooks';
import { useProfile } from '@/store/auth';

const useGenerateResponseForCorrect = () => {
  const pushRandomResponse = usePushRandomResponse();
  const { profile } = useProfile();

  const generateResponseForCorrect = (word: string, target: string) => {
    console.log('word + target correct:', word, target);
    let responseObject = pushRandomResponse([], 'feedback', 'correct', 'general', 'notice', {});
    responseObject = pushRandomResponse(
      responseObject,
      'feedback',
      'correct',
      'general',
      'followUp',
      {
        name: profile !== null && profile.username !== null ? profile.username : '',
      },
    );
    return responseObject;
  };

  return generateResponseForCorrect;
};

export default useGenerateResponseForCorrect;
