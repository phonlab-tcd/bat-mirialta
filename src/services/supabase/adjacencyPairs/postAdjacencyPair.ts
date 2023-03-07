import supabase from '@/services/supabase';

const postAdjacencyPair = async (
  userID: string,
  chatID: number,
  questionID: number,
  repeat: number,
) => {
  try {
    const { data, error } = await supabase
      .from('bat_adjacency_pairs')
      .insert({ user_id: userID, chat_id: chatID, question_id: questionID, retry_attempt: repeat })
      .select(`*`)
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

export default postAdjacencyPair;
