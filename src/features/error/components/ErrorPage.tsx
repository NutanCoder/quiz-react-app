import { FC } from 'react';
import { motion, Variants } from 'framer-motion';
import { Button } from '../../../components/common/Button';
import { useNavigate } from 'react-router-dom';

interface ErrorPageProps {
  code: string | number;
  title: string;
  message: string;
  actionText?: string;
  onActionClick?: () => void;
}

const ErrorPage: FC<ErrorPageProps> = ({
  code,
  title,
  message,
  actionText = 'Go Back Home',
  onActionClick,
}) => {
  const navigate = useNavigate();
  const handleAction = () => {
    if (onActionClick) {
      onActionClick();
    } else {
      navigate('/');
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const codeVariants: Variants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <motion.div
        className="text-center px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 className="text-9xl font-bold text-white" variants={codeVariants}>
          {code}
        </motion.h1>
        <motion.h2 className="text-4xl font-semibold text-gray-300 mt-4" variants={itemVariants}>
          {title}
        </motion.h2>
        <motion.p className="text-lg text-gray-400 mt-4 mb-8" variants={itemVariants}>
          {message}
        </motion.p>
        <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button onClick={handleAction} variant="secondary">
            {actionText}
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export { ErrorPage };
export type { ErrorPageProps }; 