import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Quiz } from '@/features/quiz/types';
import { quizService } from '@/features/quiz/services/quiz.service';

interface QuizState {
  quizzes: Quiz[];
  loading: boolean;
  error: string | null;
}

const initialState: QuizState = {
  quizzes: [],
  loading: false,
  error: null,
};

export const fetchQuizzes = createAsyncThunk('quiz/fetchQuizzes', async () => {
  const response = await quizService.getQuizzes();
  return response;
});

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizzes.pending, (state) => {
        console.log('fetchQuizzes.pending');
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuizzes.fulfilled, (state, action) => {
        state.loading = false;
        state.quizzes = action.payload;
      })
      .addCase(fetchQuizzes.rejected, (state, action) => {
        console.log('fetchQuizzes.rejected');
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch quizzes';
      });
  },
});

export default quizSlice.reducer;
