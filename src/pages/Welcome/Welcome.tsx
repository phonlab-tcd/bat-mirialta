import Meta from '@/components/Meta';
import TaskChoiceCtrl from '@/controllers/taskChoiceCtrl';
import TaskStartCtrl from '@/controllers/taskStartCtrl';

const Welcome = () => {
  return (
    <>
      <Meta title="Welcome" />
      <TaskChoiceCtrl />
      <TaskStartCtrl />
    </>
  );
};

export default Welcome;
