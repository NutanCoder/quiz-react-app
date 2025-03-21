import { IMember } from '@/features/quiz/types/member.types';
import { IResponse } from '@/features/shared/types/response.types';
import supabase from '@/api/supbase';

const TABLE_NAME = 'quiz_access';

async function getMembers(id: string): Promise<IResponse<IMember[], string>> {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*, student:profiles!quiz_access_student_id_fkey(*)')
    .eq('quiz_id', id);
  if (error) return { error: error.message };
  return { data: data };
}

async function addMember(
  id: string,
  email: string
): Promise<IResponse<IMember[], string>> {
  const { data, error } = await supabase.rpc('grant_quiz_access_by_email', {
    student_email: email,
    quiz_uuid: id,
  });
  if (error) return { error: error.message };
  return { data: data };
}

async function removeMember(
  quizId: string,
  studentId: string
): Promise<IResponse<boolean, string>> {
  const { error } = await supabase
    .from(TABLE_NAME)
    .delete()
    .eq('student_id', studentId)
    .eq('quiz_id', quizId);
  if (error) {
    return { error: error.message };
  } else {
    return { data: true };
  }
}

export const memberService = {
  getMembers,
  addMember,
  removeMember,
};
