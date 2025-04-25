import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary-light dark:text-primary">404</h1>
          <div className="h-2 w-24 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto my-6"></div>
          <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
          <p className="text-surface-600 dark:text-surface-400 max-w-md mx-auto">
            The page you are looking for might have been removed, had its name changed, 
            or is temporarily unavailable.
          </p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="btn btn-primary flex items-center gap-2 mx-auto"
        >
          <ArrowLeft size={18} />
          <span>Back to Home</span>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default NotFound;