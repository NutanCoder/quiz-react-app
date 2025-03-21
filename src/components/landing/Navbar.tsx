import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes/route.constants';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { motion } from 'framer-motion';

const Navbar = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <motion.nav 
      className="fixed w-full z-50 bg-black/40 backdrop-blur-2xl"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to={ROUTES.HOME} className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-white">📚 QuizMaster</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="#features" className="text-gray-300 hover:text-white transition-colors">
              Features
            </Link>
            <Link to="#how-it-works" className="text-gray-300 hover:text-white transition-colors">
              How It Works
            </Link>
            <Link to="#testimonials" className="text-gray-300 hover:text-white transition-colors">
              Testimonials
            </Link>
            <Link to="#faq" className="text-gray-300 hover:text-white transition-colors">
              FAQ
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                <Link
                  to={ROUTES.AUTH.LOGIN}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to={ROUTES.AUTH.REGISTER}
                  className="px-4 py-2 bg-white text-black rounded-full font-semibold hover:bg-gray-100 transition-colors"
                >
                  Get Started
                </Link>
              </>
            ) : (
              <Link
                to={ROUTES.DASHBOARD}
                className="px-4 py-2 bg-white text-black rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                Dashboard
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar; 