interface ChatBubbleModel {
  text: string | undefined;
  sender: 'robot' | 'you';
}

export type { ChatBubbleModel };
