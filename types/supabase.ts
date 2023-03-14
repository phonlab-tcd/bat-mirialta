import { ResponseModel } from '@/models';

export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      ab_publications: {
        Row: {
          abstract: string | null;
          authors: Json | null;
          created_at: string | null;
          id: number;
          pdf_url: string | null;
          title: string | null;
          year_published: number | null;
        };
        Insert: {
          abstract?: string | null;
          authors?: Json | null;
          created_at?: string | null;
          id?: number;
          pdf_url?: string | null;
          title?: string | null;
          year_published?: number | null;
        };
        Update: {
          abstract?: string | null;
          authors?: Json | null;
          created_at?: string | null;
          id?: number;
          pdf_url?: string | null;
          title?: string | null;
          year_published?: number | null;
        };
      };
      application_categories: {
        Row: {
          created_at: string | null;
          id: number;
          name_en: string | null;
          name_ga: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          name_en?: string | null;
          name_ga?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          name_en?: string | null;
          name_ga?: string | null;
        };
      };
      applications: {
        Row: {
          category: number | null;
          created_at: string | null;
          description_en: string | null;
          description_ga: string | null;
          id: number;
          image: string | null;
          name: string | null;
          url: string | null;
        };
        Insert: {
          category?: number | null;
          created_at?: string | null;
          description_en?: string | null;
          description_ga?: string | null;
          id?: number;
          image?: string | null;
          name?: string | null;
          url?: string | null;
        };
        Update: {
          category?: number | null;
          created_at?: string | null;
          description_en?: string | null;
          description_ga?: string | null;
          id?: number;
          image?: string | null;
          name?: string | null;
          url?: string | null;
        };
      };
      bat_adjacency_pairs: {
        Row: {
          chat_id: number;
          correct: boolean | null;
          created_at: string | null;
          error_data: Json | null;
          id: number;
          question_id: number;
          response: ResponseModel[];
          retry_attempt: number;
          text: string | null;
          user_id: string | null;
          hint: boolean | null;
        };
        Insert: {
          chat_id: number;
          correct?: boolean | null;
          created_at?: string | null;
          error_data?: Json | null;
          id?: number;
          question_id: number;
          response?: ResponseModel[];
          retry_attempt?: number;
          text?: string | null;
          user_id?: string | null;
          hint?: boolean | null;
        };
        Update: {
          chat_id?: number;
          correct?: boolean | null;
          created_at?: string | null;
          error_data?: Json | null;
          id?: number;
          question_id?: number;
          response?: ResponseModel[];
          retry_attempt?: number;
          text?: string | null;
          user_id?: string | null;
          hint?: boolean | null;
        };
      };
      bat_chats: {
        Row: {
          complete: boolean;
          created_at: string;
          form: string | null;
          id: number;
          intro: ResponseModel[];
          outro: ResponseModel[];
          questions: number[];
          tense: string | null;
          user_id: string | null;
          verb: string | null;
        };
        Insert: {
          complete?: boolean;
          created_at?: string;
          form?: string | null;
          id?: number;
          intro?: ResponseModel[];
          outro?: ResponseModel[];
          questions?: number[];
          tense?: string | null;
          user_id?: string | null;
          verb?: string | null;
        };
        Update: {
          complete?: boolean;
          created_at?: string;
          form?: string | null;
          id?: number;
          intro?: ResponseModel[];
          outro?: ResponseModel[];
          questions?: number[];
          tense?: string | null;
          user_id?: string | null;
          verb?: string | null;
        };
      };
      bat_forms: {
        Row: {
          created_at: string | null;
          id: number;
          name: string;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          name: string;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          name?: string;
        };
      };
      bat_questions: {
        Row: {
          answer: string;
          created_at: string;
          form_id: number;
          hints: Json;
          id: number;
          tense_id: number;
          text: string;
          verb_id: number;
        };
        Insert: {
          answer: string;
          created_at?: string;
          form_id: number;
          hints: Json;
          id?: number;
          tense_id: number;
          text: string;
          verb_id: number;
        };
        Update: {
          answer?: string;
          created_at?: string;
          form_id?: number;
          hints?: Json;
          id?: number;
          tense_id?: number;
          text?: string;
          verb_id?: number;
        };
      };
      bat_tenses: {
        Row: {
          created_at: string | null;
          id: number;
          name: string;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          name: string;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          name?: string;
        };
      };
      bat_verbs: {
        Row: {
          created_at: string | null;
          id: number;
          name: string;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          name: string;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          name?: string;
        };
      };
      dialects: {
        Row: {
          created_at: string | null;
          id: number;
          name: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          name?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          name?: string | null;
        };
      };
      genders: {
        Row: {
          created_at: string | null;
          id: number;
          name: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          name?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          name?: string | null;
        };
      };
      news_stories: {
        Row: {
          blurb_en: string | null;
          blurb_ga: string | null;
          body_en: string | null;
          body_ga: string | null;
          created_at: string | null;
          date: string | null;
          id: number;
          images: Json | null;
          title_en: string | null;
          title_ga: string | null;
          video: string | null;
        };
        Insert: {
          blurb_en?: string | null;
          blurb_ga?: string | null;
          body_en?: string | null;
          body_ga?: string | null;
          created_at?: string | null;
          date?: string | null;
          id?: number;
          images?: Json | null;
          title_en?: string | null;
          title_ga?: string | null;
          video?: string | null;
        };
        Update: {
          blurb_en?: string | null;
          blurb_ga?: string | null;
          body_en?: string | null;
          body_ga?: string | null;
          created_at?: string | null;
          date?: string | null;
          id?: number;
          images?: Json | null;
          title_en?: string | null;
          title_ga?: string | null;
          video?: string | null;
        };
      };
      profiles: {
        Row: {
          avatar: string;
          dialect: number | null;
          gender: number | null;
          id: string;
          over_16: boolean | null;
          parent_caregiver_email: string | null;
          parent_caregiver_name: string | null;
          updated_at: string | null;
          username: string | null;
          year: number | null;
        };
        Insert: {
          avatar?: string;
          dialect?: number | null;
          gender?: number | null;
          id: string;
          over_16?: boolean | null;
          parent_caregiver_email?: string | null;
          parent_caregiver_name?: string | null;
          updated_at?: string | null;
          username?: string | null;
          year?: number | null;
        };
        Update: {
          avatar?: string;
          dialect?: number | null;
          gender?: number | null;
          id?: string;
          over_16?: boolean | null;
          parent_caregiver_email?: string | null;
          parent_caregiver_name?: string | null;
          updated_at?: string | null;
          username?: string | null;
          year?: number | null;
        };
      };
      synthesis_requests: {
        Row: {
          created_at: string | null;
          duration: number | null;
          id: number;
          session_ID: string | null;
          text: string;
          user_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          duration?: number | null;
          id?: number;
          session_ID?: string | null;
          text: string;
          user_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          duration?: number | null;
          id?: number;
          session_ID?: string | null;
          text?: string;
          user_id?: string | null;
        };
      };
      transcriptions: {
        Row: {
          audio_file_path: string | null;
          correct: boolean | null;
          corrected: boolean;
          correction: string;
          created_at: string | null;
          duration: number | null;
          id: number;
          recognition_response: Json | null;
          session_ID: string | null;
          user_id: string | null;
        };
        Insert: {
          audio_file_path?: string | null;
          correct?: boolean | null;
          corrected?: boolean;
          correction?: string;
          created_at?: string | null;
          duration?: number | null;
          id?: number;
          recognition_response?: Json | null;
          session_ID?: string | null;
          user_id?: string | null;
        };
        Update: {
          audio_file_path?: string | null;
          correct?: boolean | null;
          corrected?: boolean;
          correction?: string;
          created_at?: string | null;
          duration?: number | null;
          id?: number;
          recognition_response?: Json | null;
          session_ID?: string | null;
          user_id?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      getforms: {
        Args: Record<PropertyKey, never>;
        Returns: number[];
      };
      getformsfromtense: {
        Args: {
          t_id: number;
        };
        Returns: number[];
      };
      getformsfromverb: {
        Args: {
          v_id: number;
        };
        Returns: number[];
      };
      getformsfromverbandtense: {
        Args: {
          v_id: number;
          t_id: number;
        };
        Returns: number[];
      };
      gettenses: {
        Args: Record<PropertyKey, never>;
        Returns: number[];
      };
      gettensesfromform: {
        Args: {
          f_id: number;
        };
        Returns: number[];
      };
      gettensesfromverb: {
        Args: {
          v_id: number;
        };
        Returns: number[];
      };
      gettensesfromverbandform: {
        Args: {
          v_id: number;
          f_id: number;
        };
        Returns: number[];
      };
      getverbs: {
        Args: Record<PropertyKey, never>;
        Returns: number[];
      };
      getverbsfromform: {
        Args: {
          f_id: number;
        };
        Returns: number[];
      };
      getverbsfromtense: {
        Args: {
          t_id: number;
        };
        Returns: number[];
      };
      getverbsfromtenseandform: {
        Args: {
          t_id: number;
          f_id: number;
        };
        Returns: number[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
