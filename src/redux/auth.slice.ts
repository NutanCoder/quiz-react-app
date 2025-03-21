import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@supabase/supabase-js';
import { setProfile } from './profile.slice';
import { authService } from '@/features/auth';

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: true,
  isAuthenticated: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    clearAuth: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      if (!action.payload) return;
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    });
  },
});

export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, { dispatch }) => {
  const { data } = await authService.logout();
  if (data == true) {
    dispatch(setProfile(null));
  }
  return data == true;
});

export const { setUser, clearAuth } = authSlice.actions;
export default authSlice.reducer;
