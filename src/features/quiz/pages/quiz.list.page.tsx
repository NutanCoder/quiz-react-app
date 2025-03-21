import React, { useState } from 'react';
import QuizList from '@/components/quiz/QuizList';
import { BookOpen } from 'lucide-react';
import HideStudent from '@/components/hide.students';
import { LinkStyled } from '@/components/common';
import { Quiz } from '../types';

const QuizPage: React.FC = () => {
  const [__, setShowCreateForm] = useState(false);
  const [_, setSelectedQuiz] = useState<Quiz | null>(null);

  const handleQuizSelect = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setShowCreateForm(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold">Quizzes</h1>
        <HideStudent>
          <LinkStyled to="/quizzes/create">
            <BookOpen className="h-5 w-5" />
            <span>Create New Quiz</span>
          </LinkStyled>
        </HideStudent>
      </div>

      <QuizList onQuizSelect={handleQuizSelect} />
    </div>
  );
};

export default QuizPage;
