import supabase from '@/services/supabase';

const getAvailableVerbs = async (
  tense_id: number | undefined,
  form_id: number | undefined,
): Promise<number[] | undefined> => {
  try {
    if (tense_id === undefined && form_id === undefined) {
      const { data, error } = await supabase.rpc(`getverbs`);
      if (error) {
        throw error;
      } else {
        return data;
      }
    } else if (tense_id === undefined) {
      const { data, error } = await supabase.rpc(`getverbsfromform`, { f_id: form_id });
      if (error) {
        throw error;
      } else {
        return data;
      }
    } else if (form_id === undefined) {
      const { data, error } = await supabase.rpc(`getverbsfromtense`, { t_id: tense_id });
      if (error) {
        throw error;
      } else {
        return data;
      }
    } else {
      const { data, error } = await supabase.rpc(`getverbsfromtenseandform`, {
        t_id: tense_id,
        f_id: form_id,
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

export default getAvailableVerbs;
