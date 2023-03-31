const calculateChatPointsCumFreq = (chatPoints: number[]) => {
  const cumFreq = {
    '90': 0,
    '80': 0,
    '70': 0,
    '60': 0,
    '50': 0,
    '49': 0,
  };

  chatPoints.map((chatPoint) => {
    if (chatPoint) {
      if (chatPoint < 50) {
        cumFreq['49'] = cumFreq['49'] + 1;
      } else if (chatPoint < 60) {
        cumFreq['50'] = cumFreq['50'] + 1;
      } else if (chatPoint < 70) {
        cumFreq['60'] = cumFreq['60'] + 1;
      } else if (chatPoint < 80) {
        cumFreq['70'] = cumFreq['70'] + 1;
      } else if (chatPoint < 90) {
        cumFreq['80'] = cumFreq['80'] + 1;
      } else {
        cumFreq['90'] = cumFreq['90'] + 1;
      }
    }
  });

  return cumFreq;
};

export default calculateChatPointsCumFreq;
