import supabase from '@/services/supabase';

const postChat = async (
  userID: string,
  verb: string | null,
  tense: string | null,
  form: string | null,
  questions: number[],
) => {
  console.log('userID:', userID);
  try {
    const { data, error } = await supabase
      .from('bat_chats')
      .insert({ user_id: userID, verb: verb, tense: tense, form: form, questions: questions })
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

export default postChat;
