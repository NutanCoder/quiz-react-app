import supabase from '@/api/supbase';
import { IProfile, UpdateProfilePayload } from '../types';
import { IResponse } from '@/features/shared/types/response.types';

export const profileService = {
  table: 'profiles',
  getProfile: async function (userId: string): Promise<IResponse<IProfile, string>> {
    const { data, error } = await supabase.from(this.table).select('*').eq('uuid', userId).single();
    if (error) return { error: error.message };
    return { data };
  },
  getProfileById: async function (id: string): Promise<IResponse<IProfile, string>> {
    const { data, error } = await supabase.from(this.table).select('*').eq('id', id).single();
    if (error) return { error: error.message };
    if (!data) return { error: 'Profile not found' };
    return { data };
  },
  updateProfile: async function (
    id: string,
    payload: UpdateProfilePayload
  ): Promise<IResponse<IProfile, string>> {
    const { data, error } = await supabase
      .from(this.table)
      .update(payload)
      .eq('uuid', id)
      .select()
      .single();
    if (error) return { error: error.message };
    return { data };
  },
}; 