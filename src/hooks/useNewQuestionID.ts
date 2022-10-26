import { useQuestionIDs } from '@/store/scripts';
import { removeNumberAtIndex } from '@/store/utils';

const useGenerateNewQuestionID = () => {
  // [ 345, 346, 347, 348, 349, 350]
  // randomly pops a number from this array, saves the new array, and returns the question ID
  const { questionIDs, setQuestionIDs } = useQuestionIDs();
  const randomIndex = Math.floor(Math.random() * questionIDs.length);
  const randomQuestionID = questionIDs[randomIndex];
  const newList = removeNumberAtIndex(questionIDs, randomIndex);
  setQuestionIDs(newList);
  return randomQuestionID;
};

export default useGenerateNewQuestionID;
