import supabase from '@/services/supabase';

const getAdjacencyPairs = async (chatID: number) => {
  try {
    const { data, error } = await supabase
      .from('bat_adjacency_pairs')
      .select(`*`)
      .eq('chat_id', chatID)
      .order('id', { ascending: true });

    if (error) {
      console.log('error:', error);
    } else {
      return data;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    alert(e.message);
  }
};

export default getAdjacencyPairs;
