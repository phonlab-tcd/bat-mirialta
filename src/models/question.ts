interface verbTenseFormModel {
  id: number;
  name: string;
}

interface questionModel {
  id?: number;
  question_text?: string;
  answer?: string;
  verb_id?: number;
  tense_id?: number;
  form_id?: number;
  hints?: string[];
}

export type { verbTenseFormModel, questionModel };
