/* eslint-disable react-hooks/exhaustive-deps */
import { useAdjacencyPairs } from '@/store/adjacencyPairs';
import {
  useAvailablePoints,
  useCompletedQuestions,
  useThisPenalty,
  useTotalPoints,
} from '@/store/points';
import { calculateTotalPoints } from '@/utils/points';

const useUpdatePoints = () => {
  const { adjacencyPairs } = useAdjacencyPairs();
  const { setTotalPoints } = useTotalPoints();
  const { setAvailablePoints } = useAvailablePoints();
  const { setThisPenalty } = useThisPenalty();
  const { setCompletedQuestions } = useCompletedQuestions();

  const updatePoints = () => {
    const { completedQuestions, totalPoints, availablePoints, thisPenalty } =
      calculateTotalPoints(adjacencyPairs);
    setTotalPoints(totalPoints);
    setAvailablePoints(availablePoints);
    setCompletedQuestions(completedQuestions);
    setThisPenalty(thisPenalty);
  };

  return updatePoints;
};

export default useUpdatePoints;
