import supabase from '@/services/supabase';

const getAvailableTenses = async (
  verb_id: number | undefined,
  form_id: number | undefined,
): Promise<number[] | undefined> => {
  try {
    if (verb_id === undefined && form_id === undefined) {
      const { data, error } = await supabase.rpc(`gettenses`);
      if (error) {
        throw error;
      } else {
        return data;
      }
    } else if (verb_id === undefined) {
      const { data, error } = await supabase.rpc(`gettensesfromform`, { f_id: form_id });
      if (error) {
        throw error;
      } else {
        return data;
      }
    } else if (form_id === undefined) {
      const { data, error } = await supabase.rpc(`gettensesfromverb`, { v_id: verb_id });
      if (error) {
        throw error;
      } else {
        return data;
      }
    } else {
      const { data, error } = await supabase.rpc(`gettensesfromverbandform`, {
        v_id: verb_id,
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

export default getAvailableTenses;
