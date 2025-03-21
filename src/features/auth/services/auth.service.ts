import { IResponse } from '@/features/shared/types/response.types';
import { LoginParams, RegisterParams } from '@/features/auth/types/auth.types';
import { User } from '@supabase/supabase-js';
import supabase from '@/api/supbase';

export const authService = {
  login: async function (params: LoginParams): Promise<IResponse<User, string>> {
    const { data, error } = await supabase.auth.signInWithPassword(params);
    if (error) return { error: error.message };
    return { data: data.user };
  },

  register: async function (params: RegisterParams): Promise<IResponse<User, string>> {
    const { data, error } = await supabase.auth.signUp(params);
    if (error) return { error: error.message };
    if (!data.user) return { error: 'User not found' };
    return { data: data.user };
  },

  logout: async function (): Promise<IResponse<boolean, string>> {
    const { error } = await supabase.auth.signOut();
    if (error) return { error: error.message };
    return { data: true };
  },

  getUser: async function (): Promise<IResponse<User, string>> {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error) return { error: error.message };
    if (!user) return { error: 'User not found' };
    return { data: user };
  },

  resetPassword: async function (email: string): Promise<IResponse<boolean, string>> {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) return { error: error.message };
    return { data: true };
  },
}; 