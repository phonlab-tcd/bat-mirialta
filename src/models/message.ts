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

interface displayMessageModel {
  message: string | undefined | 'start' | 'end';
  sender: 'robot' | 'you';
}

export type { messageModel, displayMessageModel };
