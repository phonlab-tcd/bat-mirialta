import axios from 'axios';

import { errorCheckURL } from '@/config';

const postError = async (word: string | null, target: string, hints: string[] | undefined) => {
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
      return data;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    alert(error.message);
    return false;
  }
};

export default postError;
