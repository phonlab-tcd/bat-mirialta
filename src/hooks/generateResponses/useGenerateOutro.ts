/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { usePushRandomResponse } from '@/hooks';
import { useProfile } from '@/store/auth';
import { useTotalPoints } from '@/store/points';

const useGenerateOutro = () => {
  const pushRandomResponse = usePushRandomResponse();
  const { profile } = useProfile();
  const { totalPoints } = useTotalPoints();
  const [pointsString, setPointsString] = useState('');
  const { i18n } = useTranslation();

  useEffect(() => {
    if (i18n.language === 'ga') {
      const pointsModulo = totalPoints % 10;
      if (pointsModulo >= 3 && pointsModulo <= 6) {
        setPointsString('phointe');
      } else if (pointsModulo >= 7 && pointsModulo <= 10) {
        setPointsString('bpointe');
      } else {
        setPointsString('pointe');
      }
    } else {
      setPointsString('points');
    }
  }, [totalPoints, i18n.language]);

  const generateOutro = () => {
    let responseObject = pushRandomResponse([], 'filler', 'outro', 'beginning', 'basic', {
      name: profile !== null && profile.username !== null ? profile.username : '',
    });
    responseObject = pushRandomResponse(responseObject, 'filler', 'outro', 'points', 'basic', {
      points: `${totalPoints} ${pointsString}`,
    });
    responseObject = pushRandomResponse(responseObject, 'filler', 'outro', 'ending', 'basic', {});

    return responseObject;
  };

  return generateOutro;
};

export default useGenerateOutro;
