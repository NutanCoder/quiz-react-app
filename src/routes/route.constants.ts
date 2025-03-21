export const ROUTES = {
  HOME: '/',
  LANDING: '/welcome',
  DASHBOARD: '/dashboard',
  QUIZ: {
    LIST: '/quizzes',
    CREATE: '/quizzes/create',
    EDIT: (id: string) => `/quizzes/${id}/edit`,
    MEMBERS: (id: string) => `/quizzes/${id}/members`,
    DETAILS: (id: string) => `/quizzes/${id}`,
    OVERVIEW: (id: string) => `/quizzes/${id}/overview`,
    START: (id: string) => `/quizzes/${id}/start`,
    ADD_QUESTION: (id: string) => `/quizzes/${id}/add-question`,
    RESULTS: (id: string) => `/quizzes/${id}/results`,
  },
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
    FORGET_PASSWORD: '/forget-password',
  },
  PROFILE: {
    ROOT: '/profile',
    PERSONAL: '/profile/personal',
    SECURITY: '/profile/security',
  },
  ERROR: {
    FORBIDDEN: '/403',
    SERVER_ERROR: '/500',
    NOT_FOUND: '*',
  },
} as const;

// Type-safe route params
export interface RouteParams {
  quizId: string;
}

export type AppRoute = typeof ROUTES;
