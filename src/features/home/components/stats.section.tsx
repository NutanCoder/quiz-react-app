import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const StatsSection = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-gray-900 py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-white">
            <div className="text-4xl font-bold mb-2">10K+</div>
            <div className="text-gray-400">{t('home.stats.activeUsers')}</div>
          </div>
          <div className="text-white">
            <div className="text-4xl font-bold mb-2">50K+</div>
            <div className="text-gray-400">{t('home.stats.quizzesCreated')}</div>
          </div>
          <div className="text-white">
            <div className="text-4xl font-bold mb-2">100K+</div>
            <div className="text-gray-400">{t('home.stats.questionsAsked')}</div>
          </div>
          <div className="text-white">
            <div className="text-4xl font-bold mb-2">95%</div>
            <div className="text-gray-400">{t('home.stats.satisfactionRate')}</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection; 