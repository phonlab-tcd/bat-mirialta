import { atom, useRecoilState } from 'recoil';

const totalPointsState = atom<number>({
  key: 'total-points',
  default: 0,
});

const useTotalPoints = () => {
  const [totalPoints, setTotalPoints] = useRecoilState(totalPointsState);
  return { totalPoints, setTotalPoints };
};

const availablePointsState = atom<number>({
  key: 'available-points',
  default: 0,
});

const useAvailablePoints = () => {
  const [availablePoints, setAvailablePoints] = useRecoilState(availablePointsState);
  return { availablePoints, setAvailablePoints };
};

const showAvailablePointsState = atom<boolean>({
  key: 'show-available-points',
  default: true,
});

const useShowAvailablePoints = () => {
  const [showAvailablePoints, setShowAvailablePoints] = useRecoilState(showAvailablePointsState);
  return { showAvailablePoints, setShowAvailablePoints };
};

const thisPenaltyState = atom<number>({
  key: 'this-penalty',
  default: 0,
});

const useThisPenalty = () => {
  const [thisPenalty, setThisPenalty] = useRecoilState(thisPenaltyState);
  return { thisPenalty, setThisPenalty };
};

const showThisPenaltyState = atom<boolean>({
  key: 'show-this-penalty',
  default: false,
});

const useShowThisPenalty = () => {
  const [showThisPenalty, setShowThisPenalty] = useRecoilState(showThisPenaltyState);
  return { showThisPenalty, setShowThisPenalty };
};

const showPointsState = atom<boolean>({
  key: 'show-points',
  default: false,
});

const useShowPoints = () => {
  const [showPoints, setShowPoints] = useRecoilState(showPointsState);
  return { showPoints, setShowPoints };
};

const completedQuestionsState = atom<number>({
  key: 'completed-questions',
  default: 0,
});

const useCompletedQuestions = () => {
  const [completedQuestions, setCompletedQuestions] = useRecoilState(completedQuestionsState);
  return { completedQuestions, setCompletedQuestions };
};

export {
  useTotalPoints,
  useAvailablePoints,
  useCompletedQuestions,
  useThisPenalty,
  useShowThisPenalty,
  useShowPoints,
  useShowAvailablePoints,
};
