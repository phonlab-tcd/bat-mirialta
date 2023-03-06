import supabase from '@/services/supabase';

const patchChat = async (chatID: string, complete: boolean) => {
  try {
    const { data, error } = await supabase
      .from('bat_chats')
      .update({ chat_id: chatID, complete: complete })
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

export default patchChat;
