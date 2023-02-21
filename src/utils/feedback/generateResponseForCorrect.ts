import { ResponseModel } from '@/models';

const generateResponseForCorrect = (word: string, target: string) => {
  console.log(word, target);
  const responseObject: ResponseModel[] = [];

  // placeholder for now
  const correctResponses = ['ceart', 'foirfe'];
  const correctFollowUp = ['maith thú', 'tá tú iontach'];

  responseObject.push({
    text: correctResponses[Math.floor(Math.random() * correctResponses.length)],
    form: 'statement',
  });
  responseObject.push({
    text: correctFollowUp[Math.floor(Math.random() * correctFollowUp.length)],
    form: 'statement',
  });

  return responseObject;
};

export default generateResponseForCorrect;
