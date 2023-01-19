import { atom, selector, useRecoilState } from 'recoil';

import { VerbTenseFormModel } from '@/models';

const verbsState = atom<VerbTenseFormModel[]>({
  key: 'verbs-state',
  default: [],
});

const useVerbs = () => {
  const [verbs, setVerbs] = useRecoilState(verbsState);
  return { verbs, setVerbs };
};

const selectedVerbState = atom<VerbTenseFormModel | undefined>({
  key: 'selected-verb-state',
  default: undefined,
});

const useSelectedVerb = () => {
  const [selectedVerb, setSelectedVerb] = useRecoilState(selectedVerbState);
  return { selectedVerb, setSelectedVerb };
};

const tensesState = atom<VerbTenseFormModel[]>({
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

const selectedTenseState = atom<VerbTenseFormModel | undefined>({
  key: 'selected-tense-state',
  default: undefined,
});

const useSelectedTense = () => {
  const [selectedTense, setSelectedTense] = useRecoilState(selectedTenseState);
  return { selectedTense, setSelectedTense };
};

const availableTenses = selector({
  key: 'available-tenses',
  get: ({ get }) => {
    const ids = get(availableTenseIDsState);

    const list = get(tensesState);
    const obj = list.filter((item) => ids.includes(item.id));

    return obj !== undefined ? obj : [];
  },
});

const formsState = atom<VerbTenseFormModel[]>({
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

const selectedFormState = atom<VerbTenseFormModel | undefined>({
  key: 'selected-form-state',
  default: undefined,
});

const useSelectedForm = () => {
  const [selectedForm, setSelectedForm] = useRecoilState(selectedFormState);
  return { selectedForm, setSelectedForm };
};

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
  selectedVerbState,
  selectedTenseState,
  selectedFormState,
  useAvailableTenseIDs,
  useAvailableFormIDs,
  availableTenses,
  availableForms,
  useShowStart,
};
