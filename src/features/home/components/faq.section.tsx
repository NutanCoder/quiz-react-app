import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const FAQSection = () => {
  const { t } = useTranslation();

  return (
    <section id="faq" className="py-20">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl font-bold text-white text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {t('home.faq.title')}
        </motion.h2>
        <motion.div 
          className="max-w-3xl mx-auto space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-800">
            <h3 className="text-xl font-semibold text-white mb-2">
              {t('home.faq.questions.free.question')}
            </h3>
            <p className="text-gray-400">{t('home.faq.questions.free.answer')}</p>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-800">
            <h3 className="text-xl font-semibold text-white mb-2">
              {t('home.faq.questions.export.question')}
            </h3>
            <p className="text-gray-400">{t('home.faq.questions.export.answer')}</p>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-800">
            <h3 className="text-xl font-semibold text-white mb-2">
              {t('home.faq.questions.participants.question')}
            </h3>
            <p className="text-gray-400">{t('home.faq.questions.participants.answer')}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection; 