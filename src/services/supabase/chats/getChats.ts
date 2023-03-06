import supabase from '@/services/supabase';

const getChats = async (userID: string) => {
  try {
    const { data, error } = await supabase
      .from('bat_chats')
      .select(`*`)
      .eq('user_id', userID)
      .order('id', { ascending: true });

    if (error) {
      console.log('error:', error);
    } else {
      console.log('data:', data);
      return data;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    alert(e.message);
  }
};

export default getChats;
