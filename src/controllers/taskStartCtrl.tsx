/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import AbButton from '@/components/AbButton';
import { getQuestionIDs } from '@/services/supabase';
import {
  useQuestionIDs,
  useSelectedForm,
  useSelectedTense,
  useSelectedVerb,
  useShowStart,
} from '@/store/scripts';

const TaskStartCtrl = () => {
  const navigate = useNavigate();
  const { setQuestionIDs } = useQuestionIDs();
  const { showStart } = useShowStart();
  const { selectedVerb } = useSelectedVerb();
  const { selectedTense } = useSelectedTense();
  const { selectedForm } = useSelectedForm();
  // const [firstLoad, setFirstLoad] = useState(true);

  const prepareToStart = () => {
    if (selectedVerb !== undefined && selectedTense !== undefined && selectedForm !== undefined) {
      getQuestionIDs('bat_questions', selectedVerb.id, selectedTense.id, selectedForm.id).then(
        (res) => {
          if (res) {
            setQuestionIDs(() => {
              return res;
            });
            if (res.length > 0) {
              navigate('/chat');
            }
          }
        },
      );
    } else {
      alert('undefined task');
    }
  };

  return showStart ? (
    <Box>
      <Typography py={2} align="center">
        Ar aghaidh linn
      </Typography>
      <Typography align="center">
        <AbButton
          label={'Tosaigh'}
          onClick={prepareToStart}
          selected={true}
          variation="question"
          color="primary"
        />
      </Typography>
    </Box>
  ) : null;
};

export default TaskStartCtrl;
