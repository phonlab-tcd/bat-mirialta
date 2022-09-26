import { atom, selector, useRecoilState } from 'recoil';

import { verbTenseFormModel } from '@/models';

const verbIDState = atom<number | undefined>({
  key: 'verbID-state',
  default: undefined,
});

const useVerbID = () => {
  const [verbID, setVerbID] = useRecoilState(verbIDState);
  return { verbID, setVerbID };
};

const verbsState = atom<verbTenseFormModel[]>({
  key: 'verbs-state',
  default: [],
});

const useVerbs = () => {
  const [verbs, setVerbs] = useRecoilState(verbsState);
  return { verbs, setVerbs };
};

const tenseIDState = atom<number | undefined>({
  key: 'tenseID-state',
  default: undefined,
});

const useTenseID = () => {
  const [tenseID, setTenseID] = useRecoilState(tenseIDState);
  return { tenseID, setTenseID };
};

const tensesState = atom<verbTenseFormModel[]>({
  key: 'tenses-state',
  default: [],
});

const useTenses = () => {
  const [tenses, setTenses] = useRecoilState(tensesState);
  return { tenses, setTenses };
};

const formIDState = atom<number | undefined>({
  key: 'formID-state',
  default: undefined,
});

const useFormID = () => {
  const [formID, setFormID] = useRecoilState(formIDState);
  return { formID, setFormID };
};

const formsState = atom<verbTenseFormModel[]>({
  key: 'forms-state',
  default: [],
});

const useForms = () => {
  const [forms, setForms] = useRecoilState(formsState);
  return { forms, setForms };
};

const questionIDsState = atom<number[]>({
  key: 'questionIDs-state',
  default: [],
});

const useQuestionIDs = () => {
  const [questionIDs, setQuestionIDs] = useRecoilState(questionIDsState);
  return { questionIDs, setQuestionIDs };
};

const selectedVerb = selector({
  key: 'selected-verb',
  get: ({ get }) => {
    const id = get(verbIDState);
    const list = get(verbsState);
    const obj = list.find((item) => item.id === id);
    return obj !== undefined ? obj.name : undefined;
  },
});

const selectedTense = selector({
  key: 'selected-tense',
  get: ({ get }) => {
    const id = get(tenseIDState);
    const list = get(tensesState);
    const obj = list.find((item) => item.id === id);
    return obj !== undefined ? obj.name : undefined;
  },
});

const selectedForm = selector({
  key: 'selected-form',
  get: ({ get }) => {
    const id = get(formIDState);
    const list = get(formsState);
    const obj = list.find((item) => item.id === id);
    return obj !== undefined ? obj.name : undefined;
  },
});

export {
  useVerbID,
  useTenseID,
  useFormID,
  useQuestionIDs,
  useVerbs,
  useTenses,
  useForms,
  selectedVerb,
  selectedTense,
  selectedForm,
};
