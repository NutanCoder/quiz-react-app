import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '@/routes/route.constants';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const HeroSection = () => {
  const { t } = useTranslation();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="container mx-auto px-4 pt-32 pb-16">
      <motion.div
        className="text-center"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.3,
            },
          },
        }}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 className="text-6xl font-bold text-white mb-6" variants={itemVariants}>
          {t('home.welcome')}
        </motion.h1>
        <motion.p
          className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto"
          variants={itemVariants}
        >
          {t('home.subtitle')}
        </motion.p>

        <motion.div className="flex flex-wrap justify-center gap-6 mb-16" variants={itemVariants}>
          {!isAuthenticated ? (
            <>
              <Link
                to={ROUTES.AUTH.REGISTER}
                className="px-8 py-4 bg-blue-600 text-white rounded-full font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-blue-900/20"
              >
                {t('home.buttons.getStarted')}
              </Link>
              <Link
                to={ROUTES.AUTH.LOGIN}
                className="px-8 py-4 bg-transparent border-2 border-gray-700 text-white rounded-full font-semibold text-lg hover:border-gray-600 transition-colors"
              >
                {t('home.buttons.signIn')}
              </Link>
            </>
          ) : (
            <Link
              to={ROUTES.DASHBOARD}
              className="px-8 py-4 bg-blue-600 text-white rounded-full font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-blue-900/20"
            >
              {t('home.buttons.goToDashboard')}
            </Link>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroSection; 