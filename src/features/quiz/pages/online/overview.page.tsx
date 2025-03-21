import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import {
  createQuizAttempt,
  getQuizAttempt,
  setCurrentAttempt,
} from '@/redux/quiz-attempt.slice';
import { Button } from '@/components/common';

const OverviewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);
  const {
    loading: { get: loading },
    quiz,
  } = useSelector((state: RootState) => state.quizAttempt);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    if (!id) return;
    dispatch(getQuizAttempt(id));
  }, [id]);

  const handleStartQuiz = async () => {
    const userId = auth.user?.id;
    const quizAttemptId = quiz?.quiz_attempts?.[0];
    if (!userId || !id) return;
    if (quizAttemptId) {
      await dispatch(setCurrentAttempt(quizAttemptId));
    } else {
      await dispatch(
        createQuizAttempt({
          quiz_id: id,
        })
      );
    }
    navigate(`/quizzes/${id}/start`);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-6"></div>
            <div className="space-y-3">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="h-4 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">Quiz not found</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{quiz.title}</h1>
            <p className="text-gray-600">{quiz.description}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Quiz Rules & Guidelines</h2>
            <div className="space-y-3 text-gray-700">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>Read each question carefully before selecting your answer</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>You can only select one answer per question</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>Once you submit an answer, you cannot go back to change it</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>Ensure you have a stable internet connection before starting</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>Do not refresh the page during the quiz as it may cause data loss</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>Complete all questions to finish the quiz</p>
              </div>
            </div>
          </div>

          <div className="mb-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">Important Notice</h3>
            <p className="text-blue-700 text-sm">
              By clicking "Accept & Start Quiz", you acknowledge that you have read and understood
              the rules above. The quiz will begin immediately after you click the start button.
            </p>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <input
              type="checkbox"
              id="accept-rules"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
            <label htmlFor="accept-rules" className="text-gray-700">
              I have read and agree to the quiz rules and guidelines
            </label>
          </div>

          <div className="flex justify-center">
            <Button
              variant="primary"
              onClick={handleStartQuiz}
              disabled={!accepted}
              className="px-8 py-3 text-lg"
            >
              {quiz.quiz_attempts?.length && quiz.quiz_attempts?.length > 0
                ? 'Continue Quiz'
                : 'Accept & Start Quiz'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
