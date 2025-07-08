import { LinkStyled } from '@/components/common';
import { Quiz } from '@/features/quiz';
import { RootState } from '@/redux/store';
import { ROUTES } from '@/routes/route.constants';
import { BookOpen, BarChart3 } from 'lucide-react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const RecentQuiz = ({ quizzes }: { quizzes: Quiz[] }) => {
  const { profile } = useSelector((state: RootState) => state.profile);

  return (
    <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Recent Quizzes</h2>
        <LinkStyled to="/quizzes">View All</LinkStyled>
      </div>
      {quizzes.length > 0 ? (
        <div className="space-y-4">
          {quizzes.map((quiz) => (
            <Link
              to={
                profile?.role == 'ADMIN'
                  ? ROUTES.QUIZ.DETAILS(quiz.uuid)
                  : ROUTES.QUIZ.OVERVIEW(quiz.uuid)
              }
              key={quiz.uuid}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{quiz.title}</h3>
                  <p className="text-sm text-gray-500">
                    {quiz.quiz_attempts?.length || 0} questions • {quiz.status}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {quiz.attemptsCount || 0} attempts
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(quiz.created_at || '').toLocaleDateString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No quizzes created yet</p>
          <button className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium">
            Create your first quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentQuiz;
