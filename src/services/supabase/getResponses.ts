/* eslint-disable @typescript-eslint/no-explicit-any */
import supabase from '@/services/supabase';

const getResponses = async (responseIDs: number[]) => {
  console.log('responseIDs:', responseIDs);
  try {
    const { data, error } = await supabase.from('bat_responses').select(`*`).in('id', responseIDs);

    if (error) {
      console.log('error:', error);
      return;
    } else {
      console.log('responses data:', data);
      return data;
    }
  } catch (e: any) {
    alert(e.message);
  }
};

export default getResponses;
