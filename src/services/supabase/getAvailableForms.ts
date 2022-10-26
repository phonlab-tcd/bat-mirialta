import supabase from '@/services/supabase';

const getForms = async (verb_id: number | undefined, tense_id: number | undefined) => {
  try {
    const { data, error } = await supabase.rpc(`getforms`, { v_id: verb_id, t_id: tense_id });

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

export default getForms;
