import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { quizService } from '@/features/quiz/services/quiz.service';
import { Quiz, Question, QuizStats, QuizAttempt } from '@/features/quiz/types';
import { questionService } from '@/features/quiz/services/question.service';

interface SelectedQuizState {
  quiz: Quiz | null;
  quizStats: QuizStats | null;
  attempts: QuizAttempt[];
  questions: Question[];
  loading: {
    attempts: boolean;
    quiz: boolean;
    questions: boolean;
    quizStats: boolean;
  };
  error: string | null;
}

const initialState: SelectedQuizState = {
  quiz: null,
  questions: [],
  attempts: [],
  quizStats: null,
  loading: {
    attempts: false,
    quiz: false,
    questions: false,
    quizStats: false,
  },
  error: null,
};

// Fetch quiz by ID
export const fetchSelectedQuiz = createAsyncThunk(
  'selectedQuiz/fetchQuiz',
  async (quizId: string) => {
    const { data, error } = await quizService.getQuizById(quizId);
    if (!data) throw error;
    return data;
  }
);
// Fetch quiz by ID
export const getQuizStats = createAsyncThunk(
  'selectedQuiz/getQuizStats',
  async (quizId: string) => {
    const response = await quizService.getQuizStats(quizId);
    return response;
  }
);
// Fetch questions for the selected quiz
export const fetchSelectedQuizQuestions = createAsyncThunk(
  'selectedQuiz/fetchQuestions',
  async (quizId: string) => {
    const response = await questionService.getQuizQuestions(quizId);
    return response;
  }
);

// Create a new question
export const createQuestion = createAsyncThunk(
  'selectedQuiz/createQuestion',
  async (payload: { quizId: string; question: any }) => {
    const response = await questionService.createQuestion(payload.question);
    if (typeof response !== 'string') throw new Error(response);
    const questions = await questionService.getQuizQuestions(payload.quizId);
    return questions;
  }
);

// Fetch attempts for the selected quiz
export const fetchAttempts = createAsyncThunk(
  'selectedQuiz/fetchAttempts',
  async (quizId: string) => {
    const response = await quizService.getAttempts(quizId);
    return response;
  }
);
const selectedQuizSlice = createSlice({
  name: 'selectedQuiz',
  initialState,
  reducers: {
    clearSelectedQuiz: (state) => {
      state.quiz = null;
      state.questions = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Quiz
      .addCase(fetchSelectedQuiz.pending, (state) => {
        state.loading.quiz = true;
        state.error = null;
      })
      .addCase(fetchSelectedQuiz.fulfilled, (state, action) => {
        state.loading.quiz = false;
        state.quiz = action.payload;
      })
      .addCase(fetchSelectedQuiz.rejected, (state, action) => {
        state.loading.quiz = false;
        state.error = action.error.message || 'Failed to fetch quiz';
      })
      // Fetch Questions
      .addCase(fetchSelectedQuizQuestions.pending, (state) => {
        state.loading.questions = true;
        state.error = null;
      })
      .addCase(fetchSelectedQuizQuestions.fulfilled, (state, action) => {
        state.loading.questions = false;
        state.questions = action.payload;
      })
      .addCase(fetchSelectedQuizQuestions.rejected, (state, action) => {
        state.loading.questions = false;
        state.error = action.error.message || 'Failed to fetch questions';
      })
      // Create Question
      .addCase(createQuestion.pending, (state) => {
        state.loading.questions = true;
        state.error = null;
      })
      .addCase(createQuestion.fulfilled, (state, action) => {
        state.loading.questions = false;
        state.questions = action.payload;
      })
      .addCase(createQuestion.rejected, (state, action) => {
        state.loading.questions = false;
        state.error = action.error.message || 'Failed to create question';
      })

      // Fetch Quiz Stats
      .addCase(getQuizStats.pending, (state) => {
        state.loading.quizStats = true;
        state.error = null;
      })
      .addCase(getQuizStats.fulfilled, (state, action) => {
        state.loading.quizStats = false;
        state.quizStats = action.payload;
      })
      .addCase(getQuizStats.rejected, (state, action) => {
        state.loading.quizStats = false;
        state.error = action.error.message || 'Failed to fetch quiz stats';
      })
      // Fetch Attempts
      .addCase(fetchAttempts.pending, (state) => {
        state.loading.attempts = true;
        state.error = null;
      })
      .addCase(fetchAttempts.fulfilled, (state, action) => {
        state.loading.attempts = false;
        state.attempts = action.payload;
      });
  },
});

export const { clearSelectedQuiz } = selectedQuizSlice.actions;

export default selectedQuizSlice.reducer;
