// import { SetterOrUpdater } from 'recoil';
// import { messageModel } from '@/models/message';
// import { questionModel } from '@/models/question';
import supabase from '@/services/supabase';

const patchMessage = async (messageID: number, text: string) => {
  console.log('messageID:', messageID);
  try {
    const { data, error } = await supabase
      .from('bat_messages')
      .upsert([{ id: messageID, text: text }])
      .select(
        `id, bat_questions (question_text, answer, hints), text, correct, retry_attempt, bat_response`,
      )
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

export default patchMessage;
