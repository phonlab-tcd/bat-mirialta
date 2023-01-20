import supabase from '@/services/supabase';

const getAdjacencyPairs = async (userID: string) => {
  try {
    const { data, error } = await supabase
      .from('bat_adjacency_pairs')
      .select(`*`)
      .eq('user_id', userID)
      .order('id', { ascending: true });

    if (error) {
      console.log('error:', error);
    } else {
      return data;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    alert(e.message);
  } finally {
    // setLoader(false);
  }
};

export default getAdjacencyPairs;
