import useAnimateHints from './animate/useAnimateHints';
import useAnimateIntro from './animate/useAnimateIntro';
import useAnimateOutro from './animate/useAnimateOutro';
import useAnimateResponses from './animate/useAnimateResponses';
import usePopulateChats from './chats/usePopulateChats';
import useSetSelectedTaskFromActiveChat from './chats/useSetSelectedTaskFromActiveChat';
import useGenerateFeedback from './generateResponses/useGenerateFeedback';
import useGenerateHint from './generateResponses/useGenerateHint';
import useGenerateIntro from './generateResponses/useGenerateIntro';
import useGenerateOutro from './generateResponses/useGenerateOutro';
import useGenerateResponseForCorrect from './generateResponses/useGenerateResponseForCorrect';
import useGenerateResponseForIncorrect from './generateResponses/useGenerateResponseForIncorrect';
import usePushRandomResponse from './generateResponses/usePushRandomResponse';
import useChangeLanguage from './language/useChangeLanguage';
import useUpdatePoints from './points/useUpdatePoints';

export {
  useSetSelectedTaskFromActiveChat,
  usePopulateChats,
  useAnimateResponses,
  useAnimateIntro,
  useUpdatePoints,
  useAnimateOutro,
  useGenerateFeedback,
  useGenerateIntro,
  useGenerateOutro,
  useAnimateHints,
  useGenerateHint,
  useGenerateResponseForCorrect,
  useGenerateResponseForIncorrect,
  usePushRandomResponse,
  useChangeLanguage,
};
