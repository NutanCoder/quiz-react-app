import { IProfile } from "@/features/profile";

export interface QuizProgressPayload {
  quiz_id: string;
  option_id: string;
  question_id: string;
  quiz_attempt_id: string;
}

export interface QuizProgress extends QuizProgressPayload {
  uuid?: string;
  created_at?: string;
  updated_at?: string;
}

export interface QuizAttemptPayload {
  quiz_id: string;
}

export interface QuizAttempt {
  uuid: string;
  quiz_id: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
  time_taken?: number;
  profiles?: IProfile;
} 