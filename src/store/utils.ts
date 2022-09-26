const removeNumberAtIndex = (arr: number[], index: number) => {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
};

export { removeNumberAtIndex };
