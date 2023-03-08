interface ResponseModel {
  text: string;
  form: 'statement' | 'question';
  answer?: string;
}

export type { ResponseModel };
