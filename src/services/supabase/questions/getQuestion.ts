/* eslint-disable @typescript-eslint/no-explicit-any */
import supabase from '@/services/supabase';

const getQuestion = async (ID: number) => {
  try {
    const { data, error } = await supabase.from('bat_questions').select(`*`).eq('id', ID).single();

    if (error) {
      console.log('error:', error);
      return;
    } else {
      return data;
    }
  } catch (e: any) {
    alert(e.message);
  }
};

export default getQuestion;
