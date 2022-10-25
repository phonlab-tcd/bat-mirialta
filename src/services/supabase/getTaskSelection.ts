import supabase from '@/services/supabase';

const getVerbsTensesForms = async (table: string) => {
  try {
    const { data, error } = await supabase.from(`bat_${table}`).select(`id, name`);
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

export default getVerbsTensesForms;
