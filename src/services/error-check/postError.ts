import axios from 'axios';

import { errorCheckURL } from '@/config';

const postError = async (word: string | null, target: string, hints: string[] | undefined) => {
  console.log('errorCheckURL', errorCheckURL);
  try {
    const { data } = await axios({
      method: 'post',
      url: errorCheckURL,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        word: word,
        target: target,
        hints: hints,
      },
      timeout: 10000,
    });
    if (data) {
      console.log('data:', data);
      return data;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    alert(error.message);
    return false;
  }
};

export default postError;
