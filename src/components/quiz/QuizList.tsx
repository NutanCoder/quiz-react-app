import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { fetchQuizzes } from '@/redux/quiz.slice';
import { Quiz } from '@/features/quiz/types';
import QuizCard from '@/components/quiz/QuizCard';

interface QuizListProps {
  onQuizSelect: (quiz: Quiz) => void;
}

const QuizList: React.FC<QuizListProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { quizzes, loading, error } = useSelector((state: RootState) => ({
    quizzes: state.quiz.quizzes,
    loading: state.quiz.loading,
    error: state.quiz.error,
  }));

  useEffect(() => {
    try {
      dispatch(fetchQuizzes());
    } catch (err) {
      console.error('Failed to fetch quizzes:', err);
    }
  }, [dispatch]);

  if (loading) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold mb-4">My Quizzes</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <QuizCard key={index} isLoading={true} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-600 mb-2">Error loading quizzes</div>
        <div className="text-sm text-gray-500">{error}</div>
      </div>
    );
  }

  if (quizzes.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No quizzes found. Create your first quiz!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">My Quizzes</h2>
      <div className="grid gap-4 lg:grid-cols-2">
        {quizzes.map((quiz) => (
          <QuizCard key={quiz.uuid} quiz={quiz} />
        ))}
      </div>
    </div>
  );
};

export default QuizList;
