/* eslint-disable @typescript-eslint/no-explicit-any */
import { usePushRandomResponse } from '@/hooks';
import { useProfile } from '@/store/auth';
import { useTotalPoints } from '@/store/points';

const useGenerateOutro = () => {
  const pushRandomResponse = usePushRandomResponse();
  const { profile } = useProfile();
  const { totalPoints } = useTotalPoints();

  const generateOutro = () => {
    let responseObject = pushRandomResponse([], 'filler', 'outro', 'beginning', 'basic', {
      name: profile !== null && profile.username !== null ? profile.username : '',
    });
    responseObject = pushRandomResponse(responseObject, 'filler', 'outro', 'points', 'basic', {
      points: totalPoints,
    });
    responseObject = pushRandomResponse(responseObject, 'filler', 'outro', 'ending', 'basic', {});

    return responseObject;
  };

  return generateOutro;
};

export default useGenerateOutro;
