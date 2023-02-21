/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResponseModel } from '@/models';

const generateResponseForIncorrect = (word: string, target: string, errorData: any) => {
  console.log(word, target, errorData);
  const responseObject: ResponseModel[] = [];

  // placeholder for now

  const incorrectResponses = ['níl se ceart', 'mícheart'];

  responseObject.push({
    text: incorrectResponses[Math.floor(Math.random() * incorrectResponses.length)],
    form: 'statement',
  });
  responseObject.push({
    text: '...',
    form: 'statement',
  });

  return responseObject;
};

export default generateResponseForIncorrect;
