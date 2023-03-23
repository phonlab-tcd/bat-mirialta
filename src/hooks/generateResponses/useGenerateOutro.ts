/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable react-hooks/exhaustive-deps */
import { ResponseModel } from '@/models';

// import { useProfile } from '@/store/auth';
// import {
//   useNoQuestions,
//   useSelectedForm,
//   useSelectedTense,
//   useSelectedVerb,
// } from '@/store/scripts';

const useGenerateOutro = () => {
  // const { profile } = useProfile();
  // const { selectedVerb } = useSelectedVerb();
  // const { noQuestions } = useNoQuestions();
  // const { selectedTense } = useSelectedTense();
  // const { selectedForm } = useSelectedForm();

  const generateOutro = () => {
    const outro: ResponseModel[] = [
      {
        text: `Well done!`,
        form: 'statement',
      },
      {
        text: `You are now finished`,
        form: 'statement',
      },
    ];
    return outro;
  };

  return generateOutro;
};

export default useGenerateOutro;
