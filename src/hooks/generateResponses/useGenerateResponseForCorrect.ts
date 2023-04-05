/* eslint-disable @typescript-eslint/no-explicit-any */
import { usePushRandomResponse } from '@/hooks';

const useGenerateResponseForCorrect = () => {
  const pushRandomResponse = usePushRandomResponse();

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
        name: 'John',
      },
    );
    return responseObject;
  };

  return generateResponseForCorrect;
};

export default useGenerateResponseForCorrect;
