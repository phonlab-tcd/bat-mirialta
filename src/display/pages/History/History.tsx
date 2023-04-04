/* eslint-disable react-hooks/exhaustive-deps */
import { CenteredFlexBox } from '@/display/components/styled';
import ChatHistories from '@/display/controllers/ChatHistories';

const History = () => {
  return (
    <CenteredFlexBox mt={2}>
      <ChatHistories showHowMany={1000} />
    </CenteredFlexBox>
  );
};

export default History;
