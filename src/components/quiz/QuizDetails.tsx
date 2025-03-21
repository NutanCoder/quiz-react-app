import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';

import {
  fetchSelectedQuiz,
  fetchSelectedQuizQuestions,
  clearSelectedQuiz,
} from '../../redux/selected-quiz.slice';
import QuestionCard, { QuestionCardSkeleton } from './QuestionCard';

interface QuizDetailsProps {
  quizId: string;
}

const QuizDetails: React.FC<QuizDetailsProps> = ({ quizId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { questions, loading, error } = useSelector((state: RootState) => state.selectedQuiz);

  useEffect(() => {
    // Load quiz and questions when component mounts
    dispatch(fetchSelectedQuiz(quizId));
    dispatch(fetchSelectedQuizQuestions(quizId));

    // Clear selected quiz when component unmounts
    return () => {
      dispatch(clearSelectedQuiz());
    };
  }, [dispatch, quizId]);

  return (
    <div className="space-y-6">
      {/* Questions List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-6">Questions List</h3>

          {error && <div className="text-red-600 mb-4">{error}</div>}

          {loading.questions && questions.length !== 0 ? (
            <QuestionCardSkeleton />
          ) : (
            loading.questions && (
              <div>
                {Array.from({ length: 10 }).map((_, index) => (
                  <QuestionCard key={index} question={null} quizId={quizId} isLoading={true} />
                ))}
              </div>
            )
          )}

          <div className="space-y-4">
            {questions.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                No questions added yet. Use the form above to add your first question.
              </p>
            ) : (
              questions.map((question) => (
                <QuestionCard key={question.uuid} question={question} quizId={quizId} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizDetails;
