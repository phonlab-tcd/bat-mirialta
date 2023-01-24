import supabase from '@/services/supabase';

const getForms = async () => {
  try {
    const { data, error } = await supabase.from(`bat_forms`).select(`*`);
    if (error) {
      throw error;
    } else {
      return data;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    alert(error.message);
  }
};

export default getForms;
