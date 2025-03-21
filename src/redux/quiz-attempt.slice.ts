import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import {
  Quiz,
  QuizAttempt,
  QuizAttemptPayload,
  QuizProgress,
  Question,
} from '@/features/quiz/types';
import { quizService } from '@/features/quiz/services/quiz.service';
import { questionService } from '@/features/quiz/services/question.service';

interface QuizAttemptState {
  quiz: Quiz | null;
  currentAttempt: QuizAttempt | null;
  progress: QuizProgress[];
  questions: Question[];
  loading: {
    create: boolean;
    get: boolean;
    getQuestions: boolean;
  };
  error: string | null;
}

const initialState: QuizAttemptState = {
  quiz: null,
  currentAttempt: null,
  progress: [],
  questions: [],
  loading: {
    create: false,
    get: false,
    getQuestions: false,
  },
  error: null,
};

export const createQuizAttempt = createAsyncThunk<
  QuizAttempt,
  QuizAttemptPayload,
  { rejectValue: string }
>('quizAttempt/create', async (payload, { rejectWithValue }) => {
  try {
    const attempt = await quizService.saveQuizAttempt(payload);
    return attempt;
  } catch (error) {
    return rejectWithValue('Failed to create quiz attempt. Please try again.');
  }
});

export const getQuizAttempt = createAsyncThunk<
  Quiz,
  string,
  { rejectValue: string }
>('quizAttempt/get', async (id, { rejectWithValue }) => {
  try {
    const { data, error } = await quizService.getQuizById(id);
    if (!data) throw error;
    return data;
  } catch (error) {
    return rejectWithValue('Failed to get quiz attempt. Please try again.');
  }
});

export const getQuizQuestions = createAsyncThunk<
  Question[],
  string,
  { rejectValue: string }
>('quizAttempt/getQuizQuestions', async (id, { rejectWithValue }) => {
  try {
    const questions = await questionService.getQuizQuestions(id);
    return questions;
  } catch (error) {
    return rejectWithValue('Failed to get quiz questions. Please try again.');
  }
});

// getQuizProgress
export const getQuizProgress = createAsyncThunk<
  QuizProgress[],
  string,
  { rejectValue: string }
>(
  'quizAttempt/getQuizProgress',
  async (quiz_attempt_id, { rejectWithValue }) => {
    try {
      const progress = await quizService.getQuizProgress(quiz_attempt_id);
      return progress;
    } catch (error) {
      return rejectWithValue('Failed to get quiz progress. Please try again.');
    }
  }
);

const quizAttemptSlice = createSlice({
  name: 'quizAttempt',
  initialState,
  reducers: {
    setCurrentAttempt: (state, action: PayloadAction<QuizAttempt>) => {
      state.currentAttempt = action.payload;
      state.error = null;
    },
    clearCurrentAttempt: (state) => {
      state.currentAttempt = null;
      state.error = null;
    },
    setLoading: (
      state,
      action: PayloadAction<{
        create: boolean;
        get: boolean;
        getQuestions: boolean;
      }>
    ) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createQuizAttempt.pending, (state) => {
        state.loading.create = true;
        state.error = null;
      })
      .addCase(createQuizAttempt.fulfilled, (state, action) => {
        state.currentAttempt = action.payload;
        state.loading.create = false;
        state.error = null;
      })
      .addCase(createQuizAttempt.rejected, (state, action) => {
        state.loading.create = false;
        state.error = action.payload || 'Failed to create quiz attempt';
      });

    builder
      .addCase(getQuizAttempt.pending, (state) => {
        state.loading.get = true;
        state.error = null;
      })
      .addCase(getQuizAttempt.fulfilled, (state, action) => {
        state.quiz = action.payload;
        state.loading.get = false;
        state.error = null;
      });

    builder
      .addCase(getQuizProgress.pending, (state) => {
        state.loading.get = true;
        state.error = null;
      })
      .addCase(getQuizProgress.fulfilled, (state, action) => {
        state.progress = action.payload;
        state.loading.get = false;
        state.error = null;
      });

    builder
      .addCase(getQuizQuestions.pending, (state) => {
        state.loading.getQuestions = true;
        state.error = null;
      })
      .addCase(getQuizQuestions.fulfilled, (state, action) => {
        state.questions = action.payload;
        state.loading.getQuestions = false;
        state.error = null;
      });
  },
});

export const { setCurrentAttempt, clearCurrentAttempt, setLoading, setError } =
  quizAttemptSlice.actions;

export default quizAttemptSlice.reducer;
