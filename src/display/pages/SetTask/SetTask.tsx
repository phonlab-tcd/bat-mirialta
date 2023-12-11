/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TypeAnimation } from 'react-type-animation';

import Box from '@mui/material/Box';

// import Typography from '@mui/material/Typography';
import Meta from '@/display/components/Meta';
import RobotImage from '@/display/components/RobotImage';
import { CenteredFlexBox } from '@/display/components/styled';
import SetVerbTenseForm from '@/display/controllers/SetVerbTenseForm';
import { usePopulateChats, useSetSelectedTaskFromActiveChat } from '@/hooks';
import { useAvailables, useGetAvailables } from '@/hooks/selectTask';
import usePopulateVerbsTensesForms from '@/hooks/tasks/usePopulateVerbsTensesForms';
import { useSession } from '@/store/auth';
import { useChats } from '@/store/chats';
import { useVerbs } from '@/store/scripts';

const SetTask = () => {
  useAvailables();
  useGetAvailables();
  useSetSelectedTaskFromActiveChat();
  const { verbs } = useVerbs();
  const { chats } = useChats();
  const { session } = useSession();
  const populateVerbsTensesForms = usePopulateVerbsTensesForms();
  const populateChats = usePopulateChats();
  const { i18n } = useTranslation();

  useEffect(() => {
    // reset the question set, so no redirect to chat
    if (verbs.length === 0) {
      populateVerbsTensesForms();
    }

    if (chats.length === 0 && session !== null) {
      populateChats(session.user.id);
    }
  }, [session]);

  return (
    <Box pb={2}>
      <Meta title="SetTask" />
      <CenteredFlexBox pt={2}>
        <RobotImage />
      </CenteredFlexBox>
      <CenteredFlexBox py={1} px={2} flexDirection="column">
        <Box width={'95%'} height={150} maxWidth={400}>
          <Box
            width={'100%'}
            height={'100%'}
            sx={{ display: i18n.language === 'ga' ? 'block' : 'none' }}
          >
            <TypeAnimation
              style={{ height: 150, width: '100%' }}
              sequence={[
                1000,
                'Pioc briathar, ',
                200,
                'Pioc briathar, aimsir,',
                200,
                'Pioc briathar, aimsir, agus foirm.\n',
                500,
                'Pioc briathar, aimsir, agus foirm.\nCuirfidh mé 5 cheist ort le',
                200,
                "Pioc briathar, aimsir, agus foirm.\nCuirfidh mé 5 cheist ort le 'líon na bearnaí'",
                200,
                "Pioc briathar, aimsir, agus foirm.\nCuirfidh mé 5 cheist ort le 'líon na bearnaí' iontu.",
                500,
                "Pioc briathar, aimsir, agus foirm.\nCuirfidh mé 5 cheist ort le 'líon na bearnaí' iontu.\nIs féidir liom cabhrú leat trí nodanna agus moltaí a thabhairt duit.",
                500,
                "Pioc briathar, aimsir, agus foirm.\nCuirfidh mé 5 cheist ort le 'líon na bearnaí' iontu.\nIs féidir liom cabhrú leat trí nodanna agus moltaí a thabhairt duit.\nTá 10 bpointe ag dul ar gach ceist.",
                400,
                "Pioc briathar, aimsir, agus foirm.\nCuirfidh mé 5 cheist ort le 'líon na bearnaí' iontu.\nIs féidir liom cabhrú leat trí nodanna agus moltaí a thabhairt duit.\nTá 10 bpointe ag dul ar gach ceist..",
                400,
                "Pioc briathar, aimsir, agus foirm.\nCuirfidh mé 5 cheist ort le 'líon na bearnaí' iontu.\nIs féidir liom cabhrú leat trí nodanna agus moltaí a thabhairt duit.\nTá 10 bpointe ag dul ar gach ceist...",
                500,
                "Pioc briathar, aimsir, agus foirm.\nCuirfidh mé 5 cheist ort le 'líon na bearnaí' iontu.\nIs féidir liom cabhrú leat trí nodanna agus moltaí a thabhairt duit.\nTá 10 bpointe ag dul ar gach ceist...\nAn bhfuil tú in ann 50 a shroichint? ",
              ]}
              wrapper="span"
              cursor={true}
              repeat={0}
            />
            {/* <Typography>
              Pioc briathar, aimsir, agus foirm. Cuirfidh mé 5 cheist ort le &apos;líon na
              bearnaí&apos; iontu. Is féidir liom cabhrú leat trí nodanna agus moltaí a thabhairt
              duit. Tá 10 bpointe ag dul ar gach ceist... An bhfuil tú in ann 50 a shroichint?
            </Typography> */}
          </Box>
          <Box
            width={'100%'}
            height={'100%'}
            sx={{ display: i18n.language === 'en' ? 'block' : 'none' }}
          >
            <TypeAnimation
              style={{ height: 170, width: '100%' }}
              sequence={[
                1000,
                'Choose a verb, ',
                200,
                'Choose a verb, tense,',
                200,
                'Choose a verb, tense, and form to practice.\n',
                500,
                'Choose a verb, tense, and form to practice.\nI will ask you 5',
                200,
                "Choose a verb, tense, and form to practice.\nI will ask you 5 'fill in the blank'",
                200,
                "Choose a verb, tense, and form to practice.\nI will ask you 5 'fill in the blank' questions.",
                500,
                "Choose a verb, tense, and form to practice.\nI will ask you 5 'fill in the blank' questions.\nI can help by giving hints and suggestions.",
                500,
                "Choose a verb, tense, and form to practice.\nI will ask you 5 'fill in the blank' questions.\nI can help by giving hints and suggestions.\nThere are 10 points per question.",
                400,
                "Choose a verb, tense, and form to practice.\nI will ask you 5 'fill in the blank' questions.\nI can help by giving hints and suggestions.\nThere are 10 points per question..",
                400,
                "Choose a verb, tense, and form to practice.\nI will ask you 5 'fill in the blank' questions.\nI can help by giving hints and suggestions.\nThere are 10 points per question...",
                500,
                "Choose a verb, tense, and form to practice.\nI will ask you 5 'fill in the blank' questions.\nI can help by giving hints and suggestions.\nThere are 10 points per question...\nCan you score 50?",
              ]}
              wrapper="span"
              cursor={true}
              repeat={0}
            />
            {/* <Typography>
              Choose a verb, tense, and form to practice. I will ask you 5 &apos;fill in the
              blank&apos; questions. I can help by giving hints and suggestions. There are 10 points
              per question... Can you score 50?
            </Typography> */}
          </Box>
        </Box>
      </CenteredFlexBox>
      <CenteredFlexBox>
        <SetVerbTenseForm />
      </CenteredFlexBox>
    </Box>
  );
};

export default SetTask;
