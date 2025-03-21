import { RootState } from '@/redux/store';
import { quizService } from '@/features/quiz/services/quiz.service';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ROUTES } from '@/routes/route.constants';
import { CreateQuiz } from '../types';
import { Button, CardHeader, DeleteConfirmAlert, InputField, Modal, PageLoading } from '@/components/common';
import NotFoundPage from '@/features/error/pages/not-found.page';

function QuizEditPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((root: RootState) => root.auth);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState<CreateQuiz>({
    title: '',
    description: '',
    category: '',
    is_public: true,
  });

  const getQuiz = useCallback(async (id: string) => {
    if (id == undefined) return;
    setLoading(true);
    const { data, error } = await quizService.getQuizById(id);
    console.log({ data, error });

    setLoading(false);
    if (data) {
      const payload: CreateQuiz = {
        title: data.title,
        category: data.category,
        description: data.description,
        is_public: data.is_public,
      };
      setFormData(payload);
    } else {
      setError(error);
    }
  }, []);

  useEffect(() => {
    if (id == undefined) return;
    getQuiz(id);
  }, [getQuiz, id]);

  const handleInputChange = (name: string, value: string | boolean) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id) return;
    setUpdating(true);
    const { data, error } = await quizService.updateQuiz(id, formData);
    setUpdating(false);
    if (data) {
      toast.success('Updated Successfully');
    } else {
      if (typeof error != 'string') return;
      toast.error(error);
    }
  };

  const deleteHandler = async () => {
    const userId = user?.id;
    if (!id) return;
    if (!userId) return;
    const { data, error } = await quizService.deleteQuiz(id, userId);
    if (data) {
      toast.success('Deleted Successfully!');
      const path = ROUTES.QUIZ.LIST;
      navigate(path);
    } else {
      toast.error(error);
    }
  };

  if (loading) {
    return <PageLoading />;
  }

  if (error) {
    return <NotFoundPage />;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 my-6 border border-gray-200  w-full space-y-8 bg-white rounded-lg shadow-md">
      <CardHeader
        title={t('quiz.editQuiz')}
        buttonTitle="Delete"
        onClick={() => setIsOpen(true)}
        buttonVariant="danger"
      />
      <hr />
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
          <Button type="submit" variant="primary" disabled={updating}>
            {updating ? t('quiz.updating') : t('quiz.update')}
          </Button>
        </div>
      </form>
      <Modal
        title="Delete Confirm"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <DeleteConfirmAlert
          title="Are you sure, You want to Delete this Quiz?"
          onConfirm={deleteHandler}
          onCancel={() => setIsOpen(false)}
        />
      </Modal>
    </div>
  );
}

export default QuizEditPage;
