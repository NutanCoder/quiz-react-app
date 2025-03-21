import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const TestimonialsSection = () => {
  const { t } = useTranslation();

  return (
    <section id="testimonials" className="bg-gray-900 py-20">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl font-bold text-white text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {t('home.testimonials.title')}
        </motion.h2>
        <motion.div 
          className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-800">
            <p className="text-gray-300 mb-6">{t('home.testimonials.users.teacher.text')}</p>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-800 rounded-full mr-4"></div>
              <div>
                <div className="text-white font-semibold">
                  {t('home.testimonials.users.teacher.name')}
                </div>
                <div className="text-gray-400">{t('home.testimonials.users.teacher.role')}</div>
              </div>
            </div>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-800">
            <p className="text-gray-300 mb-6">{t('home.testimonials.users.trainer.text')}</p>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-800 rounded-full mr-4"></div>
              <div>
                <div className="text-white font-semibold">
                  {t('home.testimonials.users.trainer.name')}
                </div>
                <div className="text-gray-400">{t('home.testimonials.users.trainer.role')}</div>
              </div>
            </div>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-800">
            <p className="text-gray-300 mb-6">{t('home.testimonials.users.enthusiast.text')}</p>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-800 rounded-full mr-4"></div>
              <div>
                <div className="text-white font-semibold">
                  {t('home.testimonials.users.enthusiast.name')}
                </div>
                <div className="text-gray-400">
                  {t('home.testimonials.users.enthusiast.role')}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection; 