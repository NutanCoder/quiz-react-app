import HideStudent from '@/components/hide.students';
import { BookOpen, Users, Trophy, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

const QuickActions = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Quick Actions
      </h2>
      <div className="space-y-4">
        <HideStudent>
          <Link
            to="/quizzes/create"
            className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <BookOpen className="h-5 w-5" />
            <span>Create New Quiz</span>
          </Link>
        </HideStudent>
        <Link
          to="/quiz/take"
          className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors"
        >
          <Users className="h-5 w-5" />
          <span>Take a Quiz</span>
        </Link>
        <Link
          to="/results"
          className="w-full flex items-center justify-center space-x-2 bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Trophy className="h-5 w-5" />
          <span>View Results</span>
        </Link>
        <Link
          to="/analytics"
          className="w-full flex items-center justify-center space-x-2 bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors"
        >
          <BarChart3 className="h-5 w-5" />
          <span>View Analytics</span>
        </Link>
      </div>
    </div>
  );
};

export default QuickActions;
