/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRecoilValue } from 'recoil';

import { patchChat, postAdjacencyPair } from '@/services/supabase';
import { currentAdjacencyPairState, useAdjacencyPairs } from '@/store/adjacencyPairs';
import { useSession } from '@/store/auth';
import { activeChatState, useChats } from '@/store/chats';
import { currentQuestionIndexState, useQuestionSet } from '@/store/questions';

const useGenerateNextQuestion = () => {
  const { adjacencyPairs, setAdjacencyPairs } = useAdjacencyPairs();
  const { chats, setChats } = useChats();
  const currentAdjacencyPair = useRecoilValue(currentAdjacencyPairState);
  const currentQuestionIndex = useRecoilValue(currentQuestionIndexState);
  const { session } = useSession();
  const activeChat = useRecoilValue(activeChatState);
  const { setQuestionSet } = useQuestionSet();

  const determineRepeatForNewAdjacencyPair = () => {
    if (currentAdjacencyPair === undefined) {
      return 0;
    } else if (currentAdjacencyPair.correct) {
      return 0;
    } else {
      return currentAdjacencyPair.retry_attempt + 1;
    }
  };

  const generateNextQuestion = () => {
    if (session !== null && activeChat !== undefined) {
      // if wrong, ask again with retry_attempt iterated

      let questionID;
      let repeat;
      if (currentAdjacencyPair === undefined) {
        questionID = activeChat.questions[0];
        repeat = 0;
      } else {
        if (currentQuestionIndex !== undefined) {
          repeat = determineRepeatForNewAdjacencyPair();
          if (repeat === 0) {
            // check if all questions complete
            if (
              currentAdjacencyPair.question_id ===
              activeChat.questions[activeChat.questions.length - 1]
            ) {
              // finish the current chat
              patchChat(activeChat.id, true).then((c) => {
                setChats([...chats.slice(0, chats.length - 1), c]);
                setQuestionSet([]);
              });
            } else {
              // generate new question

              questionID = activeChat.questions[currentQuestionIndex + 1];
            }
          } else {
            // same question repeated
            questionID = activeChat.questions[currentQuestionIndex];
          }
        } else {
          console.log('currentQuestionIndex is undefined');
        }
      }

      if (questionID !== undefined && repeat !== undefined) {
        postAdjacencyPair(session.user.id, activeChat.id, questionID, repeat).then((a_p) => {
          setAdjacencyPairs([...adjacencyPairs, a_p]);
        });
      } else {
        console.log('questionID or repeat is undefined');
      }
    } else {
      alert('session is null');
    }
    return true;
  };

  return generateNextQuestion;
};

export default useGenerateNextQuestion;
