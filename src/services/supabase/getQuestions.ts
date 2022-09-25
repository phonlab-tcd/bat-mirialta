import { SetterOrUpdater } from 'recoil';

import { questionModel } from '@/models';
import supabase from '@/services/supabase';

const getQuestions = async (
  table: string,
  verb_id: number | undefined,
  tense_id: number | undefined,
  form_id: number | undefined,
  setter: SetterOrUpdater<questionModel[]>,
) => {
  try {
    const { data, error } = await supabase
      .from(table)
      .select(`id, question_text, answer, verb_id, tense_id, form_id, hints`)
      .eq('verb_id', verb_id)
      .eq('tense_id', tense_id)
      .eq('form_id', form_id);
    if (error) {
      throw error;
    } else {
      setter(data);
      console.log('data:', data);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    alert(error.message);
  }
};

export default getQuestions;
