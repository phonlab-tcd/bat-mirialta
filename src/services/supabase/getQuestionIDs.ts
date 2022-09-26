// import { SetterOrUpdater } from 'recoil';
// import { questionModel } from '@/models';
import supabase from '@/services/supabase';

const getQuestionIDs = async (
  table: string,
  verb_id: number | undefined,
  tense_id: number | undefined,
  form_id: number | undefined,
  // setter: SetterOrUpdater<number[]>,
) => {
  try {
    const { data, error } = await supabase
      .from(table)
      .select(`id`)
      .eq('verb_id', verb_id)
      .eq('tense_id', tense_id)
      .eq('form_id', form_id);
    if (error) {
      throw error;
    } else {
      const idList: number[] = [];
      data.map((d) => idList.push(d.id));
      return idList;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    alert(error.message);
  }
};

export default getQuestionIDs;
