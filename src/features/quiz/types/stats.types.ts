import { IProfile } from "@/features/profile";
import { Quiz } from "./quiz.base.types";

export interface QuizStats {
  quiz_info: Quiz;
  quiz_stats: IProfile;
  questions_count: number;
  total_attempts: number;
  completed_attempts: number;
  incomplete_attempts: number;
} 