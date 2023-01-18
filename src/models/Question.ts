interface VerbTenseFormModel {
  id: number;
  name: string;
}

interface QuestionModel {
  id?: number;
  question_text?: string;
  answer?: string;
  verb_id?: number;
  tense_id?: number;
  form_id?: number;
  hints?: string[];
}

export type { VerbTenseFormModel, QuestionModel };
