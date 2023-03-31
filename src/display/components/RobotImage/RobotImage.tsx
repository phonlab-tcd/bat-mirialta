import Image from 'mui-image';

import robotImg from '/assets/images/robot.png';

const RobotImage = () => {
  return (
    <Image
      duration={1000}
      height={150}
      width={150}
      easing="ease-out"
      alt="Abair Applications"
      src={robotImg}
      showLoading
    />
  );
};

export default RobotImage;
