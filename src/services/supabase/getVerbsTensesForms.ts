import { SetterOrUpdater } from 'recoil';

import supabase from '@/services/supabase';

interface getVerbsTensesFormsProps {
  table: string;
  setter: SetterOrUpdater<verbTenseFormModel[]>;
}

const getVerbsTensesForms = async ({ table, setter }: getVerbsTensesFormsProps) => {
  try {
    const { data, error } = await supabase.from(table).select(`id, name`);
    if (error) {
      throw error;
    } else {
      setter(data);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    alert(error.message);
  }
};

export default getVerbsTensesForms;
