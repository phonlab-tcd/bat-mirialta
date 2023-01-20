interface ChatBubbleModel {
  text: string | null;
  sender: 'robot' | 'you';
}

export type { ChatBubbleModel };
