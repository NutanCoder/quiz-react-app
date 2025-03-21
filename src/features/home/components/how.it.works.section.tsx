import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const HowItWorksSection = () => {
  const { t } = useTranslation();

  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl font-bold text-white text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {t('home.howItWorks.title')}
        </motion.h2>
        <motion.div 
          className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center text-2xl mx-auto mb-6 text-white">
              1
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">
              {t('home.howItWorks.steps.create.title')}
            </h3>
            <p className="text-gray-400">{t('home.howItWorks.steps.create.description')}</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center text-2xl mx-auto mb-6 text-white">
              2
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">
              {t('home.howItWorks.steps.share.title')}
            </h3>
            <p className="text-gray-400">{t('home.howItWorks.steps.share.description')}</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center text-2xl mx-auto mb-6 text-white">
              3
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">
              {t('home.howItWorks.steps.track.title')}
            </h3>
            <p className="text-gray-400">{t('home.howItWorks.steps.track.description')}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection; 