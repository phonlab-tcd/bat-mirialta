/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import { activeChatState } from '@/store/chats';
import { useForms, useTenses, useVerbs } from '@/store/scripts';
import { useSelectedForm, useSelectedTense, useSelectedVerb } from '@/store/scripts';

function useSetSelectedTaskFromActiveChat() {
  const activeChat = useRecoilValue(activeChatState);
  const { setSelectedVerb } = useSelectedVerb();

  const { setSelectedTense } = useSelectedTense();

  const { setSelectedForm } = useSelectedForm();
  const { verbs } = useVerbs();
  const { tenses } = useTenses();
  const { forms } = useForms();

  useEffect(() => {
    if (activeChat !== undefined) {
      setSelectedVerb(verbs.find((v) => v.name === activeChat.verb));
      setSelectedTense(tenses.find((t) => t.name === activeChat.tense));
      setSelectedForm(forms.find((f) => f.name === activeChat.form));
    }
  }, [activeChat]);
  return null;
}

export default useSetSelectedTaskFromActiveChat;
