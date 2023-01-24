/* eslint-disable @typescript-eslint/no-explicit-any */
import supabase from '@/services/supabase';

const getResponseCategories = async () => {
  try {
    const { data, error } = await supabase.from('bat_response_categories').select(`*`);

    if (error) {
      console.log('error:', error);
      return;
    } else {
      return data;
    }
  } catch (e: any) {
    alert(e.message);
  }
};

export default getResponseCategories;
