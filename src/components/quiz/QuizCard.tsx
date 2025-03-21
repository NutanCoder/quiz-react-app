import React from 'react';
import { Quiz } from '@/features/quiz/types';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes/route.constants';
import HideStudent from '../hide.students';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { LinkStyled } from '../common';

interface QuizCardProps {
  quiz?: Quiz;
  isLoading?: boolean;
}

const QuizCardSkeleton: React.FC = () => {
  return (
    <div className="block bg-white rounded-lg shadow-md p-6 animate-pulse border border-gray-200">
      <div className="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded mb-4 w-full"></div>
      <div className="flex items-center justify-between">
        <div className="h-6 bg-gray-200 rounded w-16"></div>
        <div className="space-x-2">
          <div className="h-8 bg-gray-200 rounded w-16 inline-block"></div>
          <div className="h-8 bg-gray-200 rounded w-16 inline-block"></div>
        </div>
      </div>
      <div className="mt-4 flex items-center">
        <div className="h-4 bg-gray-200 rounded w-20"></div>
        <div className="mx-2 h-4 bg-gray-200 rounded w-1"></div>
        <div className="h-4 bg-gray-200 rounded w-16"></div>
      </div>
    </div>
  );
};

const QuizCard: React.FC<QuizCardProps> = ({ quiz, isLoading = false }) => {
  const { profile } = useSelector((root: RootState) => root.profile);
  const isAdmin = profile?.role == 'ADMIN';
  if (isLoading || !quiz) {
    return <QuizCardSkeleton />;
  }

  return (
    <Link
      to={
        isAdmin
          ? ROUTES.QUIZ.DETAILS(quiz.uuid)
          : ROUTES.QUIZ.OVERVIEW(quiz.uuid)
      }
      className="block bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer border border-gray-200 hover:border-gray-300"
    >
      <h3 className="text-xl font-semibold mb-2 text-black">{quiz.title}</h3>
      <p className="text-gray-600 mb-4">
        {quiz.description || 'No description'}
      </p>
      <div className="flex items-center justify-between">
        <span
          className={`px-2 py-1 rounded text-sm ${
            quiz.status === 'published'
              ? 'bg-green-100 text-green-800 border border-green-200'
              : quiz.status === 'draft'
                ? 'bg-gray-100 text-gray-800 border border-gray-200'
                : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
          }`}
        >
          {quiz.status.charAt(0).toUpperCase() + quiz.status.slice(1)}
        </span>
        <div className="space-x-2">
          <HideStudent>
            <LinkStyled
              variant="outline"
              to={ROUTES.QUIZ.ADD_QUESTION(quiz.uuid)}
            >
              Add Question
            </LinkStyled>
            <LinkStyled variant="outline" to={ROUTES.QUIZ.EDIT(quiz.uuid)}>
              Edit
            </LinkStyled>
          </HideStudent>
        </div>
      </div>
      <div className="mt-4 text-sm text-gray-500">
        <span>{quiz.category || 'Uncategorized'}</span>
        <span className="mx-2">•</span>
        <span>{quiz.is_public ? 'Public' : 'Private'}</span>
      </div>
    </Link>
  );
};

export default QuizCard;
