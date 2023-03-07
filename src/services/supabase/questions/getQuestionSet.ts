import supabase from '@/services/supabase';

import { Database } from '../../../../types/supabase';

const getQuestionSet = async (
  verbIds: number[],
  tenseIds: number[],
  formIds: number[],
): Promise<Database['public']['Tables']['bat_questions']['Row'][] | undefined> => {
  try {
    const { data, error } = await supabase
      .from('bat_questions')
      .select(`*`)
      .in('verb_id', verbIds)
      .in('tense_id', tenseIds)
      .in('form_id', formIds);
    if (error) {
      throw error;
    } else {
      return data;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    alert(error.message);
  }
};

export default getQuestionSet;
