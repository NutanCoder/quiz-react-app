import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RootState } from '@/redux/store';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { quizService } from '@/features/quiz/services/quiz.service';
import { Button, InputField } from '../common';

const CreateQuiz: React.FC = () => {
  const { t } = useTranslation();
  const { loading, error } = useSelector((state: RootState) => state.quiz);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    is_public: false,
  });

  const handleInputChange = (name: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const quiz = await quizService.createQuiz(formData);
      toast.success(t('quiz.createdSuccess'));
      setFormData({
        title: '',
        description: '',
        category: '',
        is_public: true,
      });
      navigate(`/quizzes/${quiz.uuid}/add-question`);
    } catch (err) {
      toast.error(t('quiz.createdError'));
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 my-6 border border-gray-200  w-full space-y-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">{t('quiz.createNew')}</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          label={t('quiz.title')}
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
          placeholder={t('quiz.enterTitle')}
        />

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {t('quiz.description')}
          </label>
          <InputField
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder={t('quiz.enterDescription')}
          />
        </div>

        <InputField
          label={t('quiz.category')}
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          placeholder={t('quiz.enterCategory')}
        />

        <InputField
          type="checkbox"
          id="is_public"
          name="is_public"
          label={t('quiz.makePublic')}
          checked={formData.is_public}
          onChange={handleInputChange}
        />

        {error && <div className="text-red-600 text-sm">{error}</div>}

        <div className="flex justify-end space-x-3">
          <Button
            type="button"
            variant="secondary"
            onClick={() =>
              setFormData({
                title: '',
                description: '',
                category: '',
                is_public: true,
              })
            }
          >
            {t('common.clear')}
          </Button>
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? t('quiz.creating') : t('quiz.create')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateQuiz;
