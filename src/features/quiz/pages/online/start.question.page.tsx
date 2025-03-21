import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { quizService } from '@/features/quiz/services/quiz.service';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { getQuizQuestions, getQuizProgress } from '@/redux/quiz-attempt.slice';
import { toast } from 'react-toastify';
import { QuizProgressPayload } from '../../types';
import { Button } from '@/components/common';

const StartQuestionPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const {
    quiz,
    loading: { get: loading },
    questions,
    currentAttempt,
    progress,
  } = useSelector((state: RootState) => state.quizAttempt);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const quizAttemptId = currentAttempt?.uuid;
    if (!id) {
      console.log('no id');
      navigate(`/quizzes`);
      return;
    } else if (!quizAttemptId) {
      console.log('no quiz attempt id');
      navigate(`/quizzes/${id}/overview`);
      return;
    }
    dispatch(getQuizProgress(quizAttemptId));
    dispatch(getQuizQuestions(id));
  }, [id]);

  useEffect(() => {
    const updated = progress.reduce(
      (acc, question) => {
        acc[question.question_id] = question.option_id;
        return acc;
      },
      {} as Record<string, string>
    );
    setAnswers(updated);
    console.log(updated);
  }, [progress]);

  const handleAnswerSelect = (answerId: string) => {
    setSelectedAnswer(answerId);
    setAnswers((prev) => ({
      ...prev,
      [questions[currentQuestionIndex].uuid]: answerId,
    }));
  };

  const handleQuestionNavigation = (questionIndex: number) => {
    setCurrentQuestionIndex(questionIndex);
    setSelectedAnswer(answers[questions[questionIndex].uuid] || '');
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(answers[questions[currentQuestionIndex + 1].uuid] || '');
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(answers[questions[currentQuestionIndex - 1].uuid] || '');
    }
  };

  const handleSubmitQuiz = () => {
    const quizAttemptId = currentAttempt?.uuid;
    if (!quizAttemptId) return;
    handleSaveProgress();
    quizService.submitQuiz(quizAttemptId);
    toast.success('Quiz submitted successfully');
    navigate(`/quizzes/${id}/results`);
  };

  const isQuestionAnswered = (questionIndex: number) => {
    return answers[questions[questionIndex]?.uuid] !== undefined;
  };

  const handleSaveProgress = async () => {
    const quizAttemptId = currentAttempt?.uuid;
    const userId = user?.id;
    if (!id || !quiz || !currentAttempt || !userId || !quizAttemptId) return;
    const payload = Object.entries(answers).map<QuizProgressPayload>(([questionId, answerId]) => {
      return {
        quiz_id: id,
        question_id: questionId,
        option_id: answerId,
        quiz_attempt_id: quizAttemptId,
      };
    });
    try {
      setSaving(true);
      await quizService.saveQuizProgress(payload);
      showSaveProgressToast(true);
    } catch (error) {
      console.error('Failed to save progress:', error);
      showSaveProgressToast(false);
    } finally {
      setSaving(false);
    }
  };

  const showSaveProgressToast = (success: boolean) => {
    if (success) {
      toast.success('Progress saved successfully');
    } else {
      toast.error('Failed to save progress for this question');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-6"></div>
        </div>
      </div>
    );
  }

  if (!quiz || questions.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">
            Quiz not found or no questions available
          </h2>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Side - Question Navigator */}
        <div className="w-full lg:w-64 bg-white rounded-lg shadow-lg p-4 h-fit order-2 lg:order-1">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Question Navigator</h3>
          <div className="grid grid-cols-5 gap-2">
            {questions.map((_, index) => (
              <button
                key={index}
                onClick={() => handleQuestionNavigation(index)}
                className={`w-8 h-8 lg:w-10 lg:h-10 rounded-lg border-2 text-xs lg:text-sm font-medium transition-colors ${
                  index === currentQuestionIndex
                    ? 'bg-blue-500 text-white border-blue-500'
                    : isQuestionAnswered(index)
                      ? 'bg-green-500 text-white border-green-500'
                      : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span className="text-sm text-gray-600">Current</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span className="text-sm text-gray-600">Answered</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-300 rounded"></div>
              <span className="text-sm text-gray-600">Unanswered</span>
            </div>
          </div>
        </div>

        {/* Right Side - Question Content */}
        <div className="flex-1 bg-white rounded-lg shadow-lg p-4 lg:p-8 order-1 lg:order-2">
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
              <h2 className="text-xl lg:text-2xl font-bold text-gray-800">{quiz.title}</h2>
              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  onClick={handleSaveProgress}
                  disabled={saving}
                  className="text-sm"
                >
                  {saving ? 'Saving...' : 'Save Progress'}
                </Button>
                <span className="text-sm text-gray-500">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
                }}
              ></div>
            </div>
          </div>

          <div className="mb-8">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {currentQuestion.difficulty_level}
              </span>
            </div>
            <h3 className="text-lg lg:text-xl font-semibold text-gray-800 mb-6">
              {currentQuestion.question_text}
            </h3>
          </div>

          <div className="space-y-3 mb-8">
            {(currentQuestion.quiz_options ?? []).map((answer) => (
              <label
                key={answer.uuid}
                className={`flex items-center p-3 lg:p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                  selectedAnswer === answer.uuid
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="answer"
                  value={answer.uuid}
                  checked={selectedAnswer === answer.uuid}
                  onChange={() => handleAnswerSelect(answer.uuid)}
                  className="sr-only"
                />
                <div
                  className={`w-4 h-4 border-2 rounded-full mr-3 flex items-center justify-center ${
                    selectedAnswer === answer.uuid
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}
                >
                  {selectedAnswer === answer.uuid && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
                <span className="text-gray-800 text-sm lg:text-base">{answer.option_text}</span>
              </label>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Button
              variant="secondary"
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className="w-full sm:w-auto"
            >
              Previous
            </Button>

            <div className="flex gap-3 w-full sm:w-auto">
              {currentQuestionIndex === questions.length - 1 ? (
                <Button
                  variant="primary"
                  onClick={handleSubmitQuiz}
                  className="w-full sm:w-auto"
                >
                  Submit Quiz
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={handleNextQuestion}
                  disabled={currentQuestionIndex === questions.length - 1}
                  className="w-full sm:w-auto"
                >
                  Next
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartQuestionPage;
