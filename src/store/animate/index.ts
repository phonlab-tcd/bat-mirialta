import { atom, useRecoilState } from 'recoil';

const animatingResponsesState = atom<boolean>({
  key: 'animating-responses',
  default: false,
});

const useAnimatingResponses = () => {
  const [animatingResponses, setAnimatingResponses] = useRecoilState(animatingResponsesState);
  return { animatingResponses, setAnimatingResponses };
};

export { useAnimatingResponses };
