import { atom, useRecoilState } from 'recoil';

const verbState = atom<string | undefined>({
  key: 'verb-state',
  default: undefined,
});

const useVerb = () => {
  const [verb, setVerb] = useRecoilState(verbState);
  return { verb, setVerb };
};

const tenseState = atom<string | undefined>({
  key: 'tense-state',
  default: undefined,
});

const useTense = () => {
  const [tense, setTense] = useRecoilState(tenseState);
  return { tense, setTense };
};

const formState = atom<string | undefined>({
  key: 'form-state',
  default: undefined,
});

const useForm = () => {
  const [form, setForm] = useRecoilState(formState);
  return { form, setForm };
};

const questionState = atom<string | undefined>({
  key: 'question-state',
  default: undefined,
});

const useQuestion = () => {
  const [question, setQuestion] = useRecoilState(questionState);
  return { question, setQuestion };
};

export { useVerb, useTense, useForm, useQuestion };
