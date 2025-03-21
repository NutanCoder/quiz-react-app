import supabase from '@/api/supbase';
import {
  Quiz,
  QuizProgress,
  QuizAttemptPayload,
  QuizAttempt,
  QuizProgressPayload,
  QuizStats,
  CreateQuiz,
  CreateQuizPayload,
} from '../types';
import { IResponse } from '@/features/shared/types/response.types';

const QUIZ_TABLE = 'quizzes';
const QUIZ_ATTEMPTS_TABLE = 'quiz_attempts';
const QUIZ_ANSWERS_TABLE = 'quiz_answers';

export const quizService = {
  async getQuizzes(): Promise<Quiz[]> {
    const { data, error } = await supabase
      .from(QUIZ_TABLE)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getQuizById(id: string): Promise<IResponse<Quiz, string>> {
    const { data, error } = await supabase
      .from(QUIZ_TABLE)
      .select('*,quiz_attempts(*)')
      .eq('quiz_attempts.completed', false)
      .eq('quiz_attempts.quiz_id', id)
      .eq('uuid', id);

    if (error) return { error: error.message };
    if (data.length == 0) return { error: 'Not Found' };
    return { data: data[0] };
  },

  async getQuizStats(id: string): Promise<QuizStats> {
    const { data, error } = await supabase.rpc('get_quiz_stats', {
      quiz_id: id,
    });
    if (error) throw error;
    return data;
  },

  async createQuiz(quiz: CreateQuizPayload): Promise<Quiz> {
    const { data, error } = await supabase
      .from(QUIZ_TABLE)
      .insert([{ ...quiz, status: 'pending' }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateQuiz(id: string, quiz: CreateQuiz): Promise<IResponse<Quiz>> {
    const { data, error } = await supabase
      .from(QUIZ_TABLE)
      .update(quiz)
      .eq('uuid', id)
      .select()
      .single();

    if (error) return { error: error.message };
    return { data: data };
  },
  async saveQuizAttempt(payload: QuizAttemptPayload): Promise<QuizAttempt> {
    const { data, error } = await supabase
      .from(QUIZ_ATTEMPTS_TABLE)
      .insert(payload)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async submitQuiz(quiz_attempt_id: string): Promise<QuizAttempt> {
    const { data, error } = await supabase
      .from(QUIZ_ATTEMPTS_TABLE)
      .update({ completed: true })
      .eq('uuid', quiz_attempt_id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async getAttempts(quiz_id: string): Promise<QuizAttempt[]> {
    const { data, error } = await supabase
      .from(QUIZ_ATTEMPTS_TABLE)
      .select('*, profiles(*)')
      .eq('quiz_id', quiz_id);
    if (error) throw error;
    return data;
  },

  async deleteQuiz(
    id: string,
    userId: string
  ): Promise<IResponse<boolean, string>> {
    const { error } = await supabase.rpc('soft_delete_quiz', {
      p_quiz_uuid: id,
      p_deleted_by: userId,
    });

    if (error) return { error: error.message };
    return { data: true };
  },

  async saveQuizProgress(
    progress: QuizProgressPayload[]
  ): Promise<QuizProgress[]> {
    const { data, error } = await supabase
      .from(QUIZ_ANSWERS_TABLE)
      .upsert(progress, {
        onConflict: 'quiz_attempt_id,question_id',
      })
      .select();

    if (error) throw error;
    return data;
  },

  async getQuizProgress(quiz_attempt_id: string): Promise<QuizProgress[]> {
    const { data, error } = await supabase
      .from(QUIZ_ANSWERS_TABLE)
      .select('*')
      .eq('quiz_attempt_id', quiz_attempt_id);
    if (error) throw error;
    return data;
  },
}; 