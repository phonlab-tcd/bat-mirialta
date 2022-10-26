import { atom, selector, useRecoilState } from 'recoil';

import { verbTenseFormModel } from '@/models';

const verbsState = atom<verbTenseFormModel[]>({
  key: 'verbs-state',
  default: [],
});

const useVerbs = () => {
  const [verbs, setVerbs] = useRecoilState(verbsState);
  return { verbs, setVerbs };
};

const selectedVerbState = atom<string | undefined>({
  key: 'selected-verb-state',
  default: undefined,
});

const useSelectedVerb = () => {
  const [selectedVerb, setSelectedVerb] = useRecoilState(selectedVerbState);
  return { selectedVerb, setSelectedVerb };
};

const selectedVerbID = selector({
  key: 'selected-verb-ID',
  get: ({ get }) => {
    const selectedVerb = get(selectedVerbState);
    const list = get(verbsState);
    const obj = list.find((item) => item.name === selectedVerb);
    return obj !== undefined ? obj.id : undefined;
  },
});

const tensesState = atom<verbTenseFormModel[]>({
  key: 'tenses-state',
  default: [],
});

const useTenses = () => {
  const [tenses, setTenses] = useRecoilState(tensesState);
  return { tenses, setTenses };
};

const availableTenseIDsState = atom<number[]>({
  key: 'available-tenseIDs-state',
  default: [],
});

const useAvailableTenseIDs = () => {
  const [availabletenseIDs, setAvailableTenseIDs] = useRecoilState(availableTenseIDsState);
  return { availabletenseIDs, setAvailableTenseIDs };
};

const selectedTenseState = atom<string | undefined>({
  key: 'selected-tense-state',
  default: undefined,
});

const useSelectedTense = () => {
  const [selectedTense, setSelectedTense] = useRecoilState(selectedTenseState);
  return { selectedTense, setSelectedTense };
};

const selectedTenseID = selector({
  key: 'selected-tense-ID',
  get: ({ get }) => {
    const selectedTense = get(selectedTenseState);
    const list = get(tensesState);
    const obj = list.find((item) => item.name === selectedTense);
    return obj !== undefined ? obj.id : undefined;
  },
});

const availableTenses = selector({
  key: 'available-tenses',
  get: ({ get }) => {
    const ids = get(availableTenseIDsState);

    const list = get(tensesState);
    const obj = list.filter((item) => ids.includes(item.id));

    return obj !== undefined ? obj : [];
  },
});

const formsState = atom<verbTenseFormModel[]>({
  key: 'forms-state',
  default: [],
});

const useForms = () => {
  const [forms, setForms] = useRecoilState(formsState);
  return { forms, setForms };
};

const availableFormIDsState = atom<number[]>({
  key: 'available-FormIDs-state',
  default: [],
});

const useAvailableFormIDs = () => {
  const [availableFormIDs, setAvailableFormIDs] = useRecoilState(availableFormIDsState);
  return { availableFormIDs, setAvailableFormIDs };
};

const selectedFormState = atom<string | undefined>({
  key: 'selected-form-state',
  default: undefined,
});

const useSelectedForm = () => {
  const [selectedForm, setSelectedForm] = useRecoilState(selectedFormState);
  return { selectedForm, setSelectedForm };
};

const selectedFormID = selector({
  key: 'selected-form-ID',
  get: ({ get }) => {
    const selectedForm = get(selectedFormState);
    const list = get(formsState);
    const obj = list.find((item) => item.name === selectedForm);
    return obj !== undefined ? obj.id : undefined;
  },
});

const availableForms = selector({
  key: 'available-forms',
  get: ({ get }) => {
    const ids = get(availableFormIDsState);

    const list = get(formsState);
    const obj = list.filter((item) => ids.includes(item.id));

    return obj !== undefined ? obj : [];
  },
});

const questionIDsState = atom<number[]>({
  key: 'questionIDs-state',
  default: [],
});

const useQuestionIDs = () => {
  const [questionIDs, setQuestionIDs] = useRecoilState(questionIDsState);
  return { questionIDs, setQuestionIDs };
};

const showStartState = atom<boolean>({
  key: 'show-start-state',
  default: false,
});

const useShowStart = () => {
  const [showStart, setShowStart] = useRecoilState(showStartState);
  return { showStart, setShowStart };
};

export {
  useSelectedVerb,
  useSelectedTense,
  useSelectedForm,
  useQuestionIDs,
  useVerbs,
  useTenses,
  useForms,
  selectedVerbID,
  selectedTenseID,
  selectedFormID,
  useAvailableTenseIDs,
  useAvailableFormIDs,
  availableTenses,
  availableForms,
  useShowStart,
};
