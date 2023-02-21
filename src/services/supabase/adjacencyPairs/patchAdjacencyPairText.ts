import supabase from '@/services/supabase';

const patchAdjacencyPairText = async (AdjacencyPairID: number, text: string) => {
  try {
    const { data, error } = await supabase
      .from('bat_adjacency_pairs')
      .update({ id: AdjacencyPairID, text: text })
      .select()
      .single();

    if (error) {
      throw error;
    }

    if (data) {
      return data;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    alert(error.message);
  }
};

export default patchAdjacencyPairText;
