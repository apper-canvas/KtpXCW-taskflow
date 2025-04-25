import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertCircle, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <AlertCircle size={80} className="text-surface-300 dark:text-surface-600 mb-6" />
      </motion.div>
      
      <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
      <p className="text-surface-600 dark:text-surface-400 mb-8 max-w-md">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      
      <motion.button
        onClick={() => navigate('/')}
        className="btn btn-primary flex items-center gap-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft size={18} />
        <span>Go to Home</span>
      </motion.button>
    </div>
  );
};

export default NotFound;