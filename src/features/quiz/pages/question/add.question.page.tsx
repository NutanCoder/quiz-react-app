import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { quizService } from '@/features/quiz/services/quiz.service';
import QuizDetails from '@/components/quiz/QuizDetails';
import AddQuestion from '@/components/quiz/AddQuestion';
import { fetchSelectedQuizQuestions } from '@/redux/selected-quiz.slice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { PageLoading } from '@/components/common';
import { Quiz } from '../../types';

function AddQuestionPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const [quiz, setQuiz] = useState<Quiz | null>(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      if (!id) return;
      setLoading(true);
      const { data } = await quizService.getQuizById(id);
      setLoading(false);
      if (!data) return;
      setQuiz(data);
    };
    fetchQuiz();
  }, [id]);

  const handleQuestionAdded = () => {
    if (!id) return;
    dispatch(fetchSelectedQuizQuestions(id));
  };

  if (loading) {
    return <PageLoading />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex mb-8 flex-col">
        <div className="flex flex-col gap-4">
          {quiz && (
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center my-4 gap-4">
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl font-bold">{quiz.title}</h2>
                <p className="text-gray-600 text-sm sm:text-base">
                  {quiz.description}
                </p>
              </div>
              <Link
                to={`/quizzes/${id}`}
                className="text-blue-600 hover:text-blue-800"
              >
                Back to Quizzes
              </Link>
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full [&>*:nth-child(1)]:order-2 lg:[&>*:nth-child(1)]:order-1 [&>*:nth-child(2)]:order-1 lg:[&>*:nth-child(2)]:order-2">
          {quiz && <QuizDetails quizId={id ?? ''} />}
          {quiz && (
            <div className="bg-white rounded-lg shadow p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold mb-4">
                Add New Question
              </h3>
              <AddQuestion
                quizId={quiz.uuid}
                onQuestionAdded={handleQuestionAdded}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddQuestionPage;
