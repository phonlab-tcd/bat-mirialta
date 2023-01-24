// import { SetterOrUpdater } from 'recoil';
// import { messageModel } from '@/models/message';
// import { questionModel } from '@/models/question';
import supabase from '@/services/supabase';

const postAdjacenyPair = async (userID: string, questionID: number, repeat: number) => {
  console.log('questionID:', questionID);
  try {
    const { data, error } = await supabase
      .from('bat_adjacency_pairs')
      .insert([{ user_id: userID, question_id: questionID, retry_attempt: repeat }])
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

export default postAdjacenyPair;
