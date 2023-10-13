/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResponseModel } from '@/models';
import supabase from '@/services/supabase';

const patchAdjacencyPairFeedback = async (
  AdjacencyPairID: number,
  correct: boolean,
  errorData: any,
  response: ResponseModel[] | null,
) => {
  try {
    const { data, error } = await supabase
      .from('bat_adjacency_pairs')
      .update({
        correct: correct,
        error_data: errorData,
        response: response,
      })
      .eq('id', AdjacencyPairID)
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

export default patchAdjacencyPairFeedback;
