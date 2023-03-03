import supabase from '@/services/supabase';

const getAvailableForms = async (
  verb_id: number | undefined,
  tense_id: number | undefined,
): Promise<number[] | undefined> => {
  try {
    if (verb_id === undefined && tense_id === undefined) {
      const { data, error } = await supabase.rpc(`getforms`);
      if (error) {
        throw error;
      } else {
        return data;
      }
    } else if (verb_id === undefined) {
      const { data, error } = await supabase.rpc(`getformsfromtense`, { t_id: tense_id });
      if (error) {
        throw error;
      } else {
        return data;
      }
    } else if (tense_id === undefined) {
      const { data, error } = await supabase.rpc(`getformsfromverb`, { v_id: verb_id });
      if (error) {
        throw error;
      } else {
        return data;
      }
    } else {
      const { data, error } = await supabase.rpc(`getformsfromverbandtense`, {
        v_id: verb_id,
        t_id: tense_id,
      });
      if (error) {
        throw error;
      } else {
        return data;
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    alert(error.message);
  }
};

export default getAvailableForms;
