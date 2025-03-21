/* eslint-disable @typescript-eslint/no-explicit-any */
import { RouteObject } from 'react-router-dom';
import { ROUTES } from './route.constants';
import { lazy, Suspense } from 'react';
import { PageLoading } from '@/components/common';
import ProtectedRoute from '@/components/ProtectedRoute';

// Lazy load components
const QuizListPage = lazy(() => import('@/features/quiz/pages/quiz.list.page'));
const QuizCreatePage = lazy(
  () => import('@/features/quiz/pages/quiz.create.page')
);
const QuizEditPage = lazy(() => import('@/features/quiz/pages/quiz.edit.page'));
const QuizMembersPage = lazy(
  () => import('@/features/quiz/pages/member/quiz.members.page')
);
const QuizDetailPage = lazy(
  () => import('@/features/quiz/pages/quiz.detail.page')
);
const QuizOverviewPage = lazy(
  () => import('@/features/quiz/pages/online/overview.page')
);
const StartQuestionPage = lazy(
  () => import('@/features/quiz/pages/online/start.question.page')
);
const AddQuestionPage = lazy(
  () => import('@/features/quiz/pages/question/add.question.page')
);
const QuizResultsPage = lazy(
  () => import('@/features/quiz/pages/results/results.page')
);

const withSuspense = (
  Component: React.LazyExoticComponent<any>,
  role?: string
) => (
  <Suspense fallback={<PageLoading />}>
    <ProtectedRoute role={role}>
      <Component />
    </ProtectedRoute>
  </Suspense>
);

export const quizRoutes: RouteObject[] = [
  {
    path: ROUTES.QUIZ.LIST,
    element: withSuspense(QuizListPage),
  },
  {
    path: ROUTES.QUIZ.CREATE,
    element: withSuspense(QuizCreatePage, 'ADMIN'),
  },
  {
    path: ROUTES.QUIZ.EDIT(':id'),
    element: withSuspense(QuizEditPage, 'ADMIN'),
  },
  {
    path: ROUTES.QUIZ.MEMBERS(':id'),
    element: withSuspense(QuizMembersPage, 'ADMIN'),
  },
  {
    path: ROUTES.QUIZ.DETAILS(':id'),
    element: withSuspense(QuizDetailPage),
  },
  {
    path: ROUTES.QUIZ.OVERVIEW(':id'),
    element: withSuspense(QuizOverviewPage),
  },
  {
    path: ROUTES.QUIZ.START(':id'),
    element: withSuspense(StartQuestionPage),
  },
  {
    path: ROUTES.QUIZ.ADD_QUESTION(':id'),
    element: withSuspense(AddQuestionPage, 'ADMIN'),
  },
  {
    path: ROUTES.QUIZ.RESULTS(':id'),
    element: withSuspense(QuizResultsPage),
  },
];
