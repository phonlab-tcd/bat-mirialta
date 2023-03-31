/* eslint-disable react-hooks/exhaustive-deps */
import { useAdjacencyPairs } from '@/store/adjacencyPairs';
import {
  useAvailablePoints,
  useCompletedQuestions,
  useMostRecentPenalty,
  useTotalPoints,
} from '@/store/points';
import { calculateTotalPoints } from '@/utils/points';

const useUpdatePoints = () => {
  const { adjacencyPairs } = useAdjacencyPairs();
  const { setTotalPoints } = useTotalPoints();
  const { setAvailablePoints } = useAvailablePoints();
  const { setMostRecentPenalty } = useMostRecentPenalty();
  const { setCompletedQuestions } = useCompletedQuestions();

  const updatePoints = () => {
    const { completedQuestions, totalPoints, availablePoints, mostRecentPenalty } =
      calculateTotalPoints(adjacencyPairs);
    setTotalPoints(totalPoints);
    setAvailablePoints(availablePoints);
    setCompletedQuestions(completedQuestions);
    setMostRecentPenalty(mostRecentPenalty);
  };

  return updatePoints;
};

export default useUpdatePoints;
