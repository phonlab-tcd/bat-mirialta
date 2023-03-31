import supabase from '@/services/supabase';

const getAllPoints = async (userID: string): Promise<number[] | undefined> => {
  try {
    const { data, error } = await supabase.rpc(`getallchatpoints`, { u_id: userID });
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

export default getAllPoints;
