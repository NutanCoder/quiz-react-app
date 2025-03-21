import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '@/routes/route.constants';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const FinalCtaSection = () => {
  const { t } = useTranslation();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-white mb-6">{t('home.cta.title')}</h2>
          <p className="text-xl text-gray-400 mb-8">{t('home.cta.subtitle')}</p>
          {!isAuthenticated && (
            <Link
              to={ROUTES.AUTH.REGISTER}
              className="px-8 py-4 bg-blue-600 text-white rounded-full font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-blue-900/20 inline-block"
            >
              {t('home.buttons.createAccount')}
            </Link>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCtaSection;
