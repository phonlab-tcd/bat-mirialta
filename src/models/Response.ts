interface ResponseModel {
  text: string;
  form: 'statement' | 'question';
  answer?: string;
}

interface TranslationContextModel {
  [key: string]: string | number;
}

export type { ResponseModel, TranslationContextModel };
