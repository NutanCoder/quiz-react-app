import supabase from '@/api/supbase';
import { IResponse } from '@/features/shared/types/response.types';
import { CreateQuestionPayload, Question } from '../types';
import { shuffle } from '@/utils/shuffle';

const QUESTION_TABLE = 'quiz_questions';
const ANSWER_TABLE = 'quiz_options';

export const questionService = {
  async getQuizQuestions(quizId: string): Promise<Question[]> {
    const { data, error } = await supabase
      .from(QUESTION_TABLE)
      .select(
        `
        *,
        ${ANSWER_TABLE}(*)
      `
      )
      .eq('quiz_id', quizId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return shuffle(
      (data as Question[]).map((e: Question) => ({
        ...e,
        quiz_options: shuffle(e.quiz_options),
      }))
    );
  },

  async createQuestion(payload: CreateQuestionPayload): Promise<string> {
    const { answers, ...questionData } = payload;

    const { data: questionId, error: questionError } = await supabase.rpc(
      'insert_question_with_options',
      {
        quiz_id: questionData.quiz_id,
        q_text: questionData.question_text,
        q_difficulty: questionData.difficulty_level,
        q_options: answers,
      }
    );
    if (questionError) throw questionError;
    return questionId;
  },

  async deleteQuestion(
    questionId: string
  ): Promise<IResponse<boolean, string>> {
    const { error } = await supabase
      .from(QUESTION_TABLE)
      .delete()
      .eq('uuid', questionId);
    if (error) {
      return {
        error: error.message,
      };
    }
    return { data: true };
  },
};
