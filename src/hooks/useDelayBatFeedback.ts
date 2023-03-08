import { batDelayMultiplier } from '@/config';
import { useBatTyping, useMessageInputDisabled } from '@/store/textInput';

const useDelayBatFeedback = () => {
  const { setBatTyping } = useBatTyping();
  const { setMessageInputDisabled } = useMessageInputDisabled();

  const delayBatFeedback = (callback: () => void, delay: number, focusOnInput: boolean) => {
    setTimeout(() => {
      setBatTyping(true);
      setTimeout(() => {
        setBatTyping(false);
        callback();
        if (focusOnInput) {
          setMessageInputDisabled(false);
        }
      }, batDelayMultiplier * delay);
    }, batDelayMultiplier * 750);
  };

  return delayBatFeedback;
};

export default useDelayBatFeedback;
