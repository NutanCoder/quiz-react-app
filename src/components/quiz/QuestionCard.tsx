import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { Answer, Question } from '@/features/quiz/types';
import { fetchSelectedQuizQuestions } from '@/redux/selected-quiz.slice';
import { toast } from 'react-toastify';
import { questionService } from '@/features/quiz/services/question.service';
import { Button } from '../common';

interface QuestionCardProps {
  question: Question | null;
  quizId: string;
  isLoading?: boolean;
}

export const QuestionCardSkeleton: React.FC = () => {
  return (
    <div className="border border-amber-50 rounded-lg p-4 animate-pulse">
      <div className="flex justify-between items-start gap-2">
        <div className="flex-1">
          <div className="h-5 bg-gray-200 rounded mb-2 w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>
        <div className="h-8 bg-gray-200 rounded w-16"></div>
      </div>
      <div className="mt-2 space-y-1">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="h-4 bg-gray-200 rounded w-full"></div>
        ))}
      </div>
    </div>
  );
};

const QuestionCard = ({ question, quizId, isLoading = false }: QuestionCardProps) => {
  const dispatch = useDispatch<AppDispatch>();

  if (isLoading || !question) {
    return <QuestionCardSkeleton />;
  }

  const handleDeleteQuestion = async (questionId: string) => {
    const { data, error } = await questionService.deleteQuestion(questionId);
    if (data) {
      toast.success('Deleted Successfully');
      dispatch(fetchSelectedQuizQuestions(quizId));
    } else {
      toast.error(error);
    }
  };

  return (
    <div key={question.uuid} className="border rounded-lg p-4 hover:bg-gray-50">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium">{question.question_text}</h4>
          <span className="text-sm text-gray-500">Difficulty: {question.difficulty_level}</span>
        </div>
        <Button variant="danger" onClick={() => handleDeleteQuestion(question.uuid)}>
          Delete
        </Button>
      </div>
      <div className="mt-2 space-y-1">
        {question.quiz_options?.map((answer: Answer, index: number) => (
          <div
            key={answer.uuid}
            className={`text-sm ${
              answer.is_correct ? 'text-green-600 font-medium' : 'text-gray-600'
            }`}
          >
            {index + 1}. {answer.option_text}
            {answer.is_correct && ' ✓'}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
