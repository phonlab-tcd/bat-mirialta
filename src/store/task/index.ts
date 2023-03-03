import { atom, useRecoilState } from 'recoil';

// import { Database } from '../../../types/supabase';

const newChatState = atom<boolean>({
  key: 'new-chat-state',
  default: false,
});

const useNewChat = () => {
  const [newChat, setNewChat] = useRecoilState(newChatState);
  return { newChat, setNewChat };
};

const verbTenseFormState = atom<undefined | 'verb' | 'tense' | 'form'>({
  key: 'new-verb-tense-form-state',
  default: undefined,
});

const useVerbTenseForm = () => {
  const [verbTenseForm, setVerbTenseForm] = useRecoilState(verbTenseFormState);
  return { verbTenseForm, setVerbTenseForm };
};

export { useNewChat, useVerbTenseForm };
