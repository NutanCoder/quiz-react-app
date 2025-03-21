import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { BookOpen, Users, Trophy, TrendingUp } from 'lucide-react';
import { fetchQuizzes } from '@/redux/quiz.slice';
import QuickActions from './components/quick_actions';
import RecentQuiz from './components/dashboard.recent.quiz';

interface DashboardStats {
  totalQuizzes: number;
  totalAttempts: number;
  averageScore: number;
  completionRate: number;
  recentActivity: number;
  totalQuestions: number;
}

const DashboardPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { quizzes } = useSelector((state: RootState) => state.quiz);
  const [stats, __] = useState<DashboardStats>({
    totalQuizzes: 0,
    totalAttempts: 0,
    averageScore: 0,
    completionRate: 0,
    recentActivity: 0,
    totalQuestions: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchQuizzes());
    setLoading(false);
  }, []);

  const statCards = [
    {
      title: 'Total Quizzes',
      value: stats.totalQuizzes,
      icon: BookOpen,
      color: 'bg-blue-500',
      change: '+12%',
      changeType: 'positive' as const,
    },
    {
      title: 'Total Attempts',
      value: stats.totalAttempts,
      icon: Users,
      color: 'bg-green-500',
      change: '+8%',
      changeType: 'positive' as const,
    },
    {
      title: 'Average Score',
      value: `${stats.averageScore}%`,
      icon: Trophy,
      color: 'bg-yellow-500',
      change: '+5%',
      changeType: 'positive' as const,
    },
    {
      title: 'Completion Rate',
      value: `${stats.completionRate}%`,
      icon: TrendingUp,
      color: 'bg-purple-500',
      change: '+15%',
      changeType: 'positive' as const,
    },
  ];

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow p-6">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-8 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user?.email}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stat.value}
                </p>
                <div className="flex items-center mt-2">
                  <span
                    className={`text-sm font-medium ${
                      stat.changeType === 'positive'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">
                    from last month
                  </span>
                </div>
              </div>
              <div className={`p-3 rounded-full ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <RecentQuiz quizzes={quizzes} />
        <QuickActions />
      </div>
    </div>
  );
};

export default DashboardPage;
