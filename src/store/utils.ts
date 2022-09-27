import { messageModel } from '@/models';

const removeNumberAtIndex = (arr: number[], index: number) => {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
};

function replaceFinalMessage(arr: messageModel[], newValue: messageModel) {
  return [...arr.slice(0, arr.length - 1), newValue];
}

export { removeNumberAtIndex, replaceFinalMessage };
