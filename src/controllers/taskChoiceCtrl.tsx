import Box from '@mui/material/Box';

import FormChoiceCtrl from '@/controllers/formChoiceCtrl';
import TenseChoiceCtrl from '@/controllers/tenseChoiceCtrl';
import VerbChoiceCtrl from '@/controllers/verbChoiceCtrl';
import { useSelectedTense, useSelectedVerb } from '@/store/scripts';

const TaskChoiceCtrl = () => {
  const { selectedVerb } = useSelectedVerb();
  const { selectedTense } = useSelectedTense();

  return (
    <Box>
      <Box>
        <VerbChoiceCtrl />
      </Box>
      {selectedVerb !== undefined && (
        <Box>
          <TenseChoiceCtrl />
        </Box>
      )}
      {selectedVerb !== undefined && selectedTense !== undefined && (
        <Box>
          <FormChoiceCtrl />
        </Box>
      )}
    </Box>
  );
};

export default TaskChoiceCtrl;
