import { removeNumberAtIndex } from '@/store/utils';

const generateNewQuestionID = (questionIDs: number[]): [number, number[]] => {
  const randomIndex = Math.floor(Math.random() * questionIDs.length);
  const randomQuestionID = questionIDs[randomIndex];
  const newList = removeNumberAtIndex(questionIDs, randomIndex);

  return [randomQuestionID, newList];
};

export default generateNewQuestionID;
