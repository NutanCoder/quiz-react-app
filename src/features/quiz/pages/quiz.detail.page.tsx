import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { fetchAttempts, getQuizStats } from '@/redux/selected-quiz.slice';
import {
  getQuizProgress,
  getQuizQuestions,
  setCurrentAttempt,
} from '@/redux/quiz-attempt.slice';
import { ROUTES } from '@/routes/route.constants';
import { PencilIcon } from 'lucide-react';
import { Button, LinkStyled } from '@/components/common';

interface QuizStats {
  name: string;
  description: string;
  questionCount: number;
  totalAttempts: number;
  completedAttempts: number;
  incompleteAttempts: number;
  averageMarks: number;
  timeLimit?: number; // in minutes
  passingScore?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  category?: string;
  lastUpdated?: string;
  createdBy?: string;
}

const QuizPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { quizStats: quizStatsState, attempts } = useSelector(
    (state: RootState) => state.selectedQuiz
  );

  const { id } = useParams();
  const [quizStats, setQuizStats] = useState<QuizStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      dispatch(getQuizStats(id));
      dispatch(fetchAttempts(id));
    }
    // TODO: Fetch quiz data from API
    // This is mock data for demonstration
    const mockQuizData: QuizStats = {
      name: 'JavaScript Fundamentals',
      description:
        'Test your knowledge of JavaScript basics including variables, functions, and DOM manipulation.',
      questionCount: 25,
      totalAttempts: 150,
      completedAttempts: 120,
      incompleteAttempts: 30,
      averageMarks: 78.5,
      timeLimit: 30,
      passingScore: 70,
      difficulty: 'medium',
      category: 'Programming',
      lastUpdated: '2024-01-15',
      createdBy: 'John Doe',
    };

    setTimeout(() => {
      setQuizStats(mockQuizData);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!quizStats || !quizStatsState) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-gray-500">Quiz not found</div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const quiz = quizStatsState.quiz_info;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Quiz Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <div className="flex gap-2 items-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {quiz.title}
            </h1>
            <Link to={ROUTES.QUIZ.EDIT(quiz.uuid)}>
              <PencilIcon className="text-blue-700" />
            </Link>
          </div>
          <p className="text-gray-600 text-lg">{quiz.description}</p>
        </div>
        <div className="flex gap-2">
          <LinkStyled
            variant="outline"
            to={ROUTES.QUIZ.ADD_QUESTION(quiz.uuid)}
          >
            Add Questions
          </LinkStyled>
          <LinkStyled variant="outline" to={ROUTES.QUIZ.MEMBERS(quiz.uuid)}>
            Members
          </LinkStyled>
        </div>
      </div>

      {/* Quiz Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Basic Info */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Basic Information
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Questions:</span>
              <span className="font-medium">
                {quizStatsState?.questions_count}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Category:</span>
              <span className="font-medium">
                {quizStatsState?.quiz_info?.category}
              </span>
            </div>
          </div>
        </div>

        {/* Attempt Statistics */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Attempt Statistics
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Attempts:</span>
              <span className="font-medium">
                {quizStatsState?.total_attempts || 0}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Completed:</span>
              <span className="font-medium text-green-600">
                {quizStatsState?.completed_attempts || 0}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Incomplete:</span>
              <span className="font-medium text-red-600">
                {quizStatsState?.incomplete_attempts || 0}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Completion Rate:</span>
              <span className="font-medium">
                {quizStatsState?.total_attempts
                  ? (
                      (quizStatsState.completed_attempts /
                        quizStatsState.total_attempts) *
                      100
                    ).toFixed(1)
                  : 0}
                %
              </span>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Performance Metrics
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Average Score:</span>
              <span className="font-medium">{quizStats.averageMarks}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Passing Score:</span>
              <span className="font-medium">
                {quizStats.passingScore || 0}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Pass Rate:</span>
              <span className="font-medium">
                {quizStats.averageMarks >= (quizStats.passingScore || 0)
                  ? 'Above'
                  : 'Below'}{' '}
                Average
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Additional Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Created By:</span>
            <span className="font-medium">{quizStats.createdBy}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Last Updated:</span>
            <span className="font-medium">{quizStats.lastUpdated}</span>
          </div>
        </div>
      </div>

      {/* Attempt Listing */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Quiz Attempts
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Attempt ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Started At
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {attempts.map((attempt) => (
                <tr key={attempt.uuid}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {attempt.uuid.slice(-6)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {attempt.profiles?.first_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        attempt.completed
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {attempt.completed ? 'Completed' : 'In Progress'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(attempt.created_at)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <Button
                      variant="primary"
                      onClick={() => {
                        dispatch(setCurrentAttempt(attempt));
                        dispatch(getQuizProgress(attempt.uuid));
                        dispatch(getQuizQuestions(attempt.quiz_id));
                        navigate(`/quizzes/${id}/results`);
                      }}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
