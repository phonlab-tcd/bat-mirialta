/* eslint-disable @typescript-eslint/no-explicit-any */
import supabase from '@/services/supabase';

const checkBroadSlender = async (word: string) => {
  try {
    const { data, error } = await supabase.functions.invoke('broad-slender-check', {
      body: { name: word },
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey',
      },
    });
    if (error) {
      throw error;
    }

    if (data) {
      return data;
    }
  } catch (error: any) {
    alert(error.message);
  }
};

export default checkBroadSlender;
