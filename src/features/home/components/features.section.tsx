import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const FeaturesSection = () => {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.div
      id="features"
      className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-32"
      variants={containerVariants}
    >
      <motion.div
        className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-800"
        variants={itemVariants}
      >
        <div className="text-4xl mb-4">🎯</div>
        <h3 className="text-xl font-semibold mb-4 text-white">
          {t('home.features.createQuizzes.title')}
        </h3>
        <p className="text-gray-400">{t('home.features.createQuizzes.description')}</p>
      </motion.div>

      <motion.div
        className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-800"
        variants={itemVariants}
      >
        <div className="text-4xl mb-4">🌟</div>
        <h3 className="text-xl font-semibold mb-4 text-white">
          {t('home.features.shareKnowledge.title')}
        </h3>
        <p className="text-gray-400">{t('home.features.shareKnowledge.description')}</p>
      </motion.div>

      <motion.div
        className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-800"
        variants={itemVariants}
      >
        <div className="text-4xl mb-4">📊</div>
        <h3 className="text-xl font-semibold mb-4 text-white">
          {t('home.features.trackProgress.title')}
        </h3>
        <p className="text-gray-400">{t('home.features.trackProgress.description')}</p>
      </motion.div>
    </motion.div>
  );
};

export default FeaturesSection; 