import { AbButtonProps } from 'abair-components';

import {
  useForms,
  useSelectedForm,
  useSelectedTense,
  useSelectedVerb,
  useTenses,
  useVerbs,
} from '@/store/scripts';
import { useNewChat, useVerbTenseForm } from '@/store/task';

const useButtonsLists = () => {
  const { setNewChat } = useNewChat();
  const { setVerbTenseForm } = useVerbTenseForm();
  const { verbs } = useVerbs();
  const { tenses } = useTenses();
  const { forms } = useForms();
  const { setSelectedVerb } = useSelectedVerb();
  const { setSelectedTense } = useSelectedTense();
  const { setSelectedForm } = useSelectedForm();

  const getButtonLists = (stage: string) => {
    let buttonList: AbButtonProps[] = [];
    switch (stage) {
      case 'newChat':
        buttonList = [
          {
            color: 'primary',
            label: 'new chat',
            onClick: () => {
              setNewChat(true);
            },
          },
          {
            color: 'primary',
            label: 'continue',
            onClick: () => {
              setNewChat(false);
            },
          },
        ];
        break;

      case 'verbTenseForm':
        buttonList = [
          {
            color: 'primary',
            label: 'verb',
            onClick: () => {
              setVerbTenseForm('verb');
            },
          },
          {
            color: 'primary',
            label: 'tense',
            onClick: () => {
              setVerbTenseForm('tense');
            },
          },
          {
            color: 'primary',
            label: 'form',
            onClick: () => {
              setVerbTenseForm('form');
            },
          },
        ];
        break;

      case 'verb':
        buttonList = verbs.map((v) => ({
          label: v.name,
          onClick: () => {
            setSelectedVerb(v);
          },
          color: 'primary',
        }));
        console.log('verbs:', verbs);
        console.log('buttonList:', buttonList);
        break;

      case 'tense':
        buttonList = tenses.map((t) => ({
          label: t.name,
          onClick: () => {
            setSelectedTense(t);
          },
          color: 'primary',
        }));
        break;

      case 'form':
        buttonList = forms.map((f) => ({
          label: f.name,
          onClick: () => {
            setSelectedForm(f);
          },
          color: 'primary',
        }));
        break;
    }
    return buttonList;
  };
  return getButtonLists;
};
export { useButtonsLists };
