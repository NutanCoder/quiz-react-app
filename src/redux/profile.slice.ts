import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IProfile, UpdateProfilePayload } from '@/features/profile/types/profile.types';
import { RootState } from './store';
import { profileService } from '@/features/profile/services/profile.service';

interface ProfileState {
  profile: IProfile | null;
  loading: boolean;
}

const initialState: ProfileState = {
  profile: null,
  loading: true,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading = false;
      })
      .addCase(fetchProfile.rejected, (state) => {
        state.loading = false;
      });

    builder.addCase(updateProfile.fulfilled, (state, action) => {
      if (action.payload) {
        state.profile = action.payload;
      }
    });
  },
});

export const fetchProfile = createAsyncThunk('profile/fetchProfile', async (_, { getState }) => {
  const { auth } = getState() as RootState;
  if (!auth.user) return null;
  const userId = auth.user.id;
  const { data } = await profileService.getProfile(userId);
  if (!data) return null;
  return data;
});

export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async (payload: UpdateProfilePayload, { getState }) => {
    const { auth } = getState() as RootState;
    const userId = auth.user?.id;
    if (!userId) return null;
    const { data } = await profileService.updateProfile(userId, payload);
    if (!data) return null;
    return data;
  }
);

export const { setProfile } = profileSlice.actions;

export default profileSlice.reducer;
