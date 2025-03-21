export interface Question {
  uuid: string;
  quiz_id: string;
  question_text: string;
  difficulty_level: 'easy' | 'medium' | 'hard';
  quiz_options: QuestionOption[];
  created_at?: string;
  updated_at?: string;
}

export interface QuestionOption {
  uuid: string;
  question_id: string;
  option_text: string;
  is_correct: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Answer {
  uuid: string;
  question_id: string;
  option_text: string;
  is_correct: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CreateQuestionPayload {
  question_text: string;
  difficulty_level?: 'Easy' | 'Medium' | 'Hard';
  quiz_id: string;
  answers: {
    option_text: string;
    is_correct: boolean;
  }[];
} 