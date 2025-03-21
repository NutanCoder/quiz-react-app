import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { getQuizProgress } from '@/redux/quiz-attempt.slice';
import { getQuizStats } from '@/redux/selected-quiz.slice';
import { LinkStyled } from '@/components/common';

const QuizResultsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { currentAttempt, progress, questions } = useSelector(
    (state: RootState) => state.quizAttempt
  );
  const { quizStats } = useSelector((state: RootState) => state.selectedQuiz);

  useEffect(() => {
    if (!id) {
      navigate('/quizzes');
      return;
    }
    if (!currentAttempt?.uuid) {
      navigate(`/quizzes/${id}/overview`);
      return;
    }
    dispatch(getQuizProgress(currentAttempt.uuid));
    dispatch(getQuizStats(id));
  }, [id, currentAttempt?.uuid]);

  const calculateScore = () => {
    if (!questions.length || !progress.length) return 0;
    const correctAnswers = questions.filter((question) =>
      progress.some(
        (p) =>
          p.question_id === question.uuid &&
          p.option_id ===
            question.quiz_options?.find((opt) => opt.is_correct)?.uuid
      )
    ).length;
    return (correctAnswers / questions.length) * 100;
  };

  const score = calculateScore();
  const passingScore = quizStats?.quiz_info?.passing_score || 70;
  const isPassed = score >= passingScore;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Results Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Quiz Results</h1>
        <div
          className={`text-4xl font-bold mb-2 ${isPassed ? 'text-green-600' : 'text-red-600'}`}
        >
          {score.toFixed(1)}%
        </div>
        <div
          className={`text-lg font-medium ${isPassed ? 'text-green-600' : 'text-red-600'}`}
        >
          {isPassed
            ? 'Congratulations! You passed!'
            : 'Keep practicing! You can do better!'}
        </div>
      </div>

      {/* Score Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Score Breakdown
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Questions:</span>
              <span className="font-medium">{questions.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Correct Answers:</span>
              <span className="font-medium text-green-600">
                {
                  questions.filter((q) =>
                    progress.some(
                      (p) =>
                        p.question_id === q.uuid &&
                        p.option_id ===
                          q.quiz_options?.find((opt) => opt.is_correct)?.uuid
                    )
                  ).length
                }
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Incorrect Answers:</span>
              <span className="font-medium text-red-600">
                {
                  questions.filter((q) =>
                    progress.some(
                      (p) =>
                        p.question_id === q.uuid &&
                        p.option_id !==
                          q.quiz_options?.find((opt) => opt.is_correct)?.uuid
                    )
                  ).length
                }
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Passing Score:</span>
              <span className="font-medium">{passingScore}%</span>
            </div>
          </div>
        </div>

        {/* Quiz Stats */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quiz Statistics
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Average Score:</span>
              <span className="font-medium">
                {quizStats?.quiz_info?.average_score?.toFixed(1) || 'N/A'}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Attempts:</span>
              <span className="font-medium">
                {quizStats?.total_attempts || 0}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Pass Rate:</span>
              <span className="font-medium">
                {quizStats?.completed_attempts
                  ? (
                      (quizStats.completed_attempts /
                        quizStats.total_attempts) *
                      100
                    ).toFixed(1)
                  : 'N/A'}
                %
              </span>
            </div>
          </div>
        </div>

        {/* Time Stats */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Time Statistics
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Time Taken:</span>
              <span className="font-medium">
                {currentAttempt?.time_taken
                  ? `${Math.floor(currentAttempt.time_taken / 60)}m ${currentAttempt.time_taken % 60}s`
                  : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Time Limit:</span>
              <span className="font-medium">
                {quizStats?.quiz_info?.time_limit
                  ? `${quizStats.quiz_info.time_limit} minutes`
                  : 'No limit'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Question Review */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Question Review
        </h3>
        <div className="space-y-6">
          {questions.map((question, index) => {
            const userAnswer = (progress ?? []).find(
              (p) => p.question_id === question.uuid
            );
            const userOptionId = userAnswer?.option_id;
            const correctOption = question?.quiz_options?.find(
              (opt) => opt.is_correct
            );
            const isCorrect =
              correctOption && userOptionId === correctOption.uuid;

            return (
              <div
                key={question.uuid}
                className="border-b pb-6 last:border-b-0"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      isCorrect
                        ? 'bg-green-100 text-green-600'
                        : 'bg-red-100 text-red-600'
                    }`}
                  >
                    {isCorrect ? '✓' : '✗'}
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-lg font-medium text-gray-900 mb-2">
                      Question {index + 1}: {question.question_text}
                    </h4>
                    <div className="space-y-2">
                      <div className="text-sm">
                        <span className="text-gray-600">Your Answer: </span>
                        <span
                          className={
                            isCorrect ? 'text-green-600' : 'text-red-600'
                          }
                        >
                          {(question.quiz_options ?? []).find(
                            (opt) => opt.uuid === userAnswer?.option_id
                          )?.option_text || 'Not answered'}
                        </span>
                      </div>

                      <div className="text-sm">
                        <span className="text-gray-600">Correct Answer: </span>
                        <span className="text-green-600">
                          {
                            (question.quiz_options ?? []).find(
                              (opt) => opt.is_correct
                            )?.option_text
                          }
                        </span>
                      </div>

                      <div className="mt-3">
                        <span className="text-gray-600 text-sm font-medium">
                          All Options:
                        </span>
                        <div className="mt-2 space-y-1">
                          {(question.quiz_options ?? []).map((option) => (
                            <div
                              key={option.uuid}
                              className="flex items-center gap-2 text-sm"
                            >
                              <div
                                className={`w-2 h-2 rounded-full ${
                                  option.is_correct
                                    ? 'bg-green-500'
                                    : 'bg-gray-300'
                                }`}
                              ></div>
                              <span
                                className={
                                  option.is_correct
                                    ? 'text-green-600 font-medium'
                                    : 'text-gray-600'
                                }
                              >
                                {option.option_text}
                              </span>
                              {option.is_correct && (
                                <span className="text-green-600 text-xs">
                                  (Correct)
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
        <LinkStyled to={`/quizzes/${id}/overview`}>Back to Quiz</LinkStyled>
        <LinkStyled to="/dashboard">Dashboard</LinkStyled>
        <LinkStyled to="/quizzes">All Quizzes</LinkStyled>
      </div>
    </div>
  );
};

export default QuizResultsPage;
