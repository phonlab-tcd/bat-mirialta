const calculateChatPointsCumFreq = (chatPoints: number[]) => {
  const cumFreq = {
    '50': 0,
    '40': 0,
    '30': 0,
    '20': 0,
    '19': 0,
  };

  chatPoints.map((chatPoint) => {
    if (chatPoint !== null) {
      if (chatPoint < 20) {
        cumFreq['19'] = cumFreq['19'] + 1;
      } else if (chatPoint < 30) {
        cumFreq['20'] = cumFreq['20'] + 1;
      } else if (chatPoint < 40) {
        cumFreq['30'] = cumFreq['30'] + 1;
      } else if (chatPoint < 50) {
        cumFreq['40'] = cumFreq['40'] + 1;
      } else {
        cumFreq['50'] = cumFreq['50'] + 1;
      }
    }
  });

  return cumFreq;
};

export default calculateChatPointsCumFreq;
