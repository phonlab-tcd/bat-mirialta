/* eslint-disable @typescript-eslint/no-explicit-any */
import supabase from '@/services/supabase';

const getQuestions = async (questionIDs: number[]) => {
  try {
    const { data, error } = await supabase.from('bat_questions').select(`*`).in('id', questionIDs);

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

export default getQuestions;
