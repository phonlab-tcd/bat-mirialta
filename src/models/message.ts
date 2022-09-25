import { questionModel } from '.';

interface messageModel {
  id: number;
  text?: string;
  correct?: boolean;
  answer?: string;
  retry_attempt?: number;
  bat_response?: string;
  question?: questionModel;
}

export type { messageModel };
