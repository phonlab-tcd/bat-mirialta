// import { Dispatch } from 'react';
// import { SetterOrUpdater } from 'recoil';
import { Session } from '@supabase/supabase-js';

// import { messageModel } from '@/models';
import supabase from '@/services/supabase';

const getMessages = async (
  sess: Session,
  // setter: SetterOrUpdater<messageModel[]>,
  // setLoader: Dispatch<boolean>,
) => {
  try {
    const { user } = sess;
    console.log('in getMessages');
    const { data, error, status } = await supabase
      .from('bat_messages')
      .select(
        `id, text, correct, retry_attempt, bat_response, question_id(id, question_text, answer, verb_id, tense_id, form_id, hints)`,
      )
      .eq('user_id', user.id);

    if (error && status !== 406) {
      throw error;
    } else {
      console.log('error:', error);
      return data;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    alert(e.message);
  } finally {
    // setLoader(false);
  }
};

export default getMessages;
