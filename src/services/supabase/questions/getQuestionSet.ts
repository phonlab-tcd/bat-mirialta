import supabase from '@/services/supabase';

import { Database } from '../../../../types/supabase';

const getQuestionSet = async (
  verbId: number,
  tenseId: number,
  formId: number,
): Promise<Database['public']['Tables']['bat_questions']['Row'][] | undefined> => {
  try {
    const { data, error } = await supabase
      .from('bat_questions')
      .select(`*`)
      .eq('verb_id', verbId)
      .eq('tense_id', tenseId)
      .eq('form_id', formId);
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
