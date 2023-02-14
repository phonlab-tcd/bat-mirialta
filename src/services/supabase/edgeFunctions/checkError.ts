/* eslint-disable @typescript-eslint/no-explicit-any */
import supabase from '@/services/supabase';

const checkError = async (word: string, target: string) => {
  // console.log('checking broad slender');
  try {
    const { data, error } = await supabase.functions.invoke('error-check', {
      body: { word: word, target: target },
    });
    if (error) {
      throw error;
    }

    if (data) {
      // console.log('data:', data);

      return data;
    }
  } catch (error: any) {
    alert(error.message);
  }
};

export default checkError;
