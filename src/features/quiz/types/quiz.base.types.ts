import { QuizAttempt } from "./attempt.types";

export interface CreateQuiz {
  title: string;
  description: string;
  category: string;
  is_public: boolean;
}

export interface CreateQuizPayload {
  title: string;
  description?: string;
  category?: string;
  is_public?: boolean;
}

export interface Quiz extends CreateQuiz {
  uuid: string;
  status: 'pending' | 'published' | 'draft';
  created_at?: string;
  updated_at?: string;
  user_id?: string;
  attemptsCount?: number;
  quiz_attempts?: QuizAttempt[];
  passing_score?: number;
  time_limit?: number;
  average_score?: number;
}

export interface QuizState {
  quizzes: Quiz[];
  selectedQuiz: Quiz | null;
  loading: boolean;
  error: string | null;
} 