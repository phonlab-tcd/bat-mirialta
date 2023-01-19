import Meta from '@/display/components/Meta';
import TaskChoice from '@/display/controllers/TaskChoice';
import TaskStart from '@/display/controllers/TaskStart';

const Welcome = () => {
  return (
    <>
      <Meta title="Welcome" />
      <TaskChoice />
      <TaskStart />
    </>
  );
};

export default Welcome;
