import { atom, useRecoilState } from 'recoil';

const animatingResponsesState = atom<boolean>({
  key: 'animating-responses',
  default: false,
});

const useAnimatingResponses = () => {
  const [animatingResponses, setAnimatingResponses] = useRecoilState(animatingResponsesState);
  return { animatingResponses, setAnimatingResponses };
};

const animatingOutroState = atom<boolean>({
  key: 'animating-Outro',
  default: false,
});

const useAnimatingOutro = () => {
  const [animatingOutro, setAnimatingOutro] = useRecoilState(animatingOutroState);
  return { animatingOutro, setAnimatingOutro };
};

export { useAnimatingResponses, useAnimatingOutro };
