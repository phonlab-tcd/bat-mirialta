import supabase from '@/services/supabase';

const getHint = async (
  difficulty: 'easy' | 'medium' | 'hard',
  verb_id: number | undefined,
  tense_id?: number | undefined,
  form_id?: number | undefined,
): Promise<string[] | undefined> => {
  try {
    if (difficulty === 'easy') {
      const { data, error } = await supabase.rpc(`gethinteasy`, {
        v_id: verb_id,
        t_id: tense_id,
        f_id: form_id,
      });
      if (error) {
        throw error;
      } else {
        return data;
      }
    } else if (difficulty === 'medium') {
      const { data, error } = await supabase.rpc(`gethintmedium`, {
        v_id: verb_id,
        t_id: tense_id,
      });
      if (error) {
        throw error;
      } else {
        return data;
      }
    } else if (difficulty === 'hard') {
      const { data, error } = await supabase.rpc(`gethinthard`, { v_id: verb_id });
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

export default getHint;
