import supabase from '@/services/supabase';

const patchAdjacencyPairResponse = async (AdjacencyPairID: number, responseID: number) => {
  try {
    const { data, error } = await supabase
      .from('bat_adjacency_pairs')
      .update({ id: AdjacencyPairID, response_id: responseID })
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

export default patchAdjacencyPairResponse;
