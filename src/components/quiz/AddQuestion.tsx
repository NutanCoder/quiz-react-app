import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { AppDispatch, RootState } from '@/redux/store';
import { CreateQuestionPayload } from '@/features/quiz/types';
import { createQuestion } from '@/redux/selected-quiz.slice';
import { toast } from 'react-toastify';
import { Button, InputField } from '../common';

interface AddQuestionProps {
  quizId: string;
  onQuestionAdded: () => void;
}

const AddQuestion: React.FC<AddQuestionProps> = ({
  quizId,
  onQuestionAdded,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.selectedQuiz);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<CreateQuestionPayload>({
    question_text: '',
    difficulty_level: 'Medium',
    quiz_id: quizId,
    answers: [
      { option_text: '', is_correct: false },
      { option_text: '', is_correct: false },
      { option_text: '', is_correct: false },
      { option_text: '', is_correct: false },
    ],
  });

  const handleQuestionChange = (name: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      difficulty_level: e.target.value as 'Easy' | 'Medium' | 'Hard',
    }));
  };

  const handleAnswerChange = (index: number, value: string | boolean) => {
    if (typeof value != 'string') return;
    setFormData((prev) => {
      const newAnswers = [...prev.answers];
      newAnswers[index] = { ...newAnswers[index], option_text: value };
      return { ...prev, answers: newAnswers };
    });
  };

  const handleCorrectAnswerChange = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      answers: prev.answers.map((answer, i) => ({
        ...answer,
        is_correct: i === index,
      })),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      // Validate that at least one answer is marked as correct
      if (!formData.answers.some((answer) => answer.is_correct)) {
        throw new Error(t('quiz.question.markCorrect'));
      }

      // Validate that all answers have text
      if (formData.answers.some((answer) => !answer.option_text.trim())) {
        throw new Error(t('quiz.question.fillAllOptions'));
      }

      await dispatch(createQuestion({ quizId, question: formData })).unwrap();
      onQuestionAdded();
      toast.success('Question Added Successfully');

      // Reset form
      setFormData({
        question_text: '',
        difficulty_level: 'Medium',
        quiz_id: quizId,
        answers: [
          { option_text: '', is_correct: false },
          { option_text: '', is_correct: false },
          { option_text: '', is_correct: false },
          { option_text: '', is_correct: false },
        ],
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : t('quiz.question.addFailed')
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="s">
      <div className="flex flex-col gap-4">
        <InputField
          size="lg"
          label={t('quiz.question.text')}
          value={formData.question_text}
          name="question_text"
          onChange={handleQuestionChange}
          required
          placeholder={t('quiz.question.enterQuestion')}
        />
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('quiz.question.difficulty')}
          </label>
          <select
            value={formData.difficulty_level}
            onChange={handleDifficultyChange}
            className="border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed w-full border-gray-300 focus:border-black focus:ring-gray-500 bg-white px-4 py-3 text-base"
          >
            <option value="Easy">{t('quiz.question.levels.easy')}</option>
            <option value="Medium">{t('quiz.question.levels.medium')}</option>
            <option value="Hard">{t('quiz.question.levels.hard')}</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {formData.answers.map((answer, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div className="flex items-center whitespace-nowrap">
              <input
                type="radio"
                name="correct_answer"
                checked={answer.is_correct}
                onChange={() => handleCorrectAnswerChange(index)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
              />
            </div>
            <div className="flex-1">
              <InputField
                size="lg"
                value={answer.option_text}
                onChange={(_, value) => handleAnswerChange(index, value)}
                required
                placeholder={t('quiz.question.option', { number: index + 1 })}
              />
            </div>
          </div>
        ))}
      </div>

      {error && <div className="text-red-600 text-sm">{error}</div>}

      <div className="flex justify-end mt-4">
        <Button
          type="submit"
          variant="primary"
          disabled={loading.questions}
          fullWidth
          size="lg"
        >
          {loading.questions
            ? t('quiz.question.addingQuestion')
            : t('quiz.addQuestion')}
        </Button>
      </div>
    </form>
  );
};

export default AddQuestion;
