import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import AbButton from '@/components/AbButton';
import { getQuestionIDs } from '@/services/supabase';
import {
  selectedFormID,
  selectedTenseID,
  selectedVerbID,
  useQuestionIDs,
  useShowStart,
} from '@/store/scripts';

const TaskStartCtrl = () => {
  const navigate = useNavigate();
  const { setQuestionIDs } = useQuestionIDs();
  const { showStart } = useShowStart();
  const selectedVerbIDValue = useRecoilValue(selectedVerbID);
  const selectedTenseIDValue = useRecoilValue(selectedTenseID);
  const selectedFormIDValue = useRecoilValue(selectedFormID);

  const prepareToStart = () => {
    getQuestionIDs(
      'bat_questions',
      selectedVerbIDValue,
      selectedTenseIDValue,
      selectedFormIDValue,
    ).then((res) => {
      if (res) {
        setQuestionIDs(res);
        console.log('res:', res);
        navigate('/chat');
      }
    });
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
