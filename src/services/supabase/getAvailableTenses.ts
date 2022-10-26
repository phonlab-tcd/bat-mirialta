import supabase from '@/services/supabase';

const getAvailableTenses = async (verb_id: number | undefined) => {
  try {
    const { data, error } = await supabase.rpc(`gettenses`, { v_id: verb_id });

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

export default getAvailableTenses;
