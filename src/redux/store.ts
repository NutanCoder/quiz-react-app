import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/redux/auth.slice';
import profileReducer from '@/redux/profile.slice';
import quizReducer from '@/redux/quiz.slice';
import selectedQuizReducer from '@/redux/selected-quiz.slice';
import quizAttemptReducer from '@/redux/quiz-attempt.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    quiz: quizReducer,
    selectedQuiz: selectedQuizReducer,
    quizAttempt: quizAttemptReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
