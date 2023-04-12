import { atom, selector, useRecoilState } from 'recoil';

import { hintsGivenState } from '@/store/adjacencyPairs';

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

const mostRecentPenaltyState = atom<number>({
  key: 'this-penalty',
  default: 0,
});

const useMostRecentPenalty = () => {
  const [mostRecentPenalty, setMostRecentPenalty] = useRecoilState(mostRecentPenaltyState);
  return { mostRecentPenalty, setMostRecentPenalty };
};

const showMostRecentPenaltyState = atom<boolean>({
  key: 'show-this-penalty',
  default: false,
});

const useShowMostRecentPenalty = () => {
  const [showMostRecentPenalty, setShowMostRecentPenalty] = useRecoilState(
    showMostRecentPenaltyState,
  );
  return { showMostRecentPenalty, setShowMostRecentPenalty };
};

const showPointsState = atom<boolean>({
  key: 'show-points',
  default: false,
});

const useShowPoints = () => {
  const [showPoints, setShowPoints] = useRecoilState(showPointsState);
  return { showPoints, setShowPoints };
};

const showHintState = selector({
  key: 'show-hint-state',
  get: ({ get }) => {
    const hintsGiven = get(hintsGivenState);
    const availablePoints = get(availablePointsState);
    return availablePoints > 3 && hintsGiven < 2 ? true : false;
  },
});

const showHomeState = atom<boolean>({
  key: 'show-home',
  default: false,
});

const useShowHome = () => {
  const [showHome, setShowHome] = useRecoilState(showHomeState);
  return { showHome, setShowHome };
};

const completedQuestionsState = atom<number>({
  key: 'completed-questions',
  default: 0,
});

const useCompletedQuestions = () => {
  const [completedQuestions, setCompletedQuestions] = useRecoilState(completedQuestionsState);
  return { completedQuestions, setCompletedQuestions };
};

const cumFreqArrayState = atom<number[]>({
  key: 'cum-freq-array-state',
  default: [],
});

const useCumFreqArray = () => {
  const [cumFreqArray, setCumFreqArray] = useRecoilState(cumFreqArrayState);
  return { cumFreqArray, setCumFreqArray };
};

const pointsModalOpenState = atom<boolean>({
  key: 'points-modal-open-state',
  default: false,
});

const usePointsModalOpen = () => {
  const [pointsModalOpen, setPointsModalOpen] = useRecoilState(pointsModalOpenState);
  return { pointsModalOpen, setPointsModalOpen };
};

export {
  useTotalPoints,
  useAvailablePoints,
  useCompletedQuestions,
  useMostRecentPenalty,
  useShowMostRecentPenalty,
  useShowPoints,
  useShowAvailablePoints,
  showHintState,
  useShowHome,
  useCumFreqArray,
  usePointsModalOpen,
};
