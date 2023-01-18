import Meta from '@/components/Meta';
import TaskChoice from '@/controllers/taskChoice';
import TaskStart from '@/controllers/taskStart';

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
