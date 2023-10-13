import { ResponseModel } from '@/models';
import supabase from '@/services/supabase';

const patchChatComplete = async (
  chatID: number,
  outro: ResponseModel[] | null,
  complete: boolean,
  totalPoints: number | null,
) => {
  console.log('patching chat');
  try {
    const { data, error } = await supabase
      .from('bat_chats')
      .update({ outro: outro, complete: complete, points: totalPoints })
      .eq('id', chatID)
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

export default patchChatComplete;
