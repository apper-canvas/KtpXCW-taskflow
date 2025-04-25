import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { loginSuccess } from '../store/userSlice';

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
      return;
    }

    const { ApperClient, ApperUI } = window.ApperSDK;
    const apperClient = new ApperClient("YOUR_CANVAS_ID"); // Replace with actual canvas ID
    
    ApperUI.setup(apperClient, {
      target: '#authentication',
      clientId: "YOUR_CANVAS_ID", // Replace with actual canvas ID
      hide: [],
      view: 'signup',
      onSuccess: function(user, account) {
        dispatch(loginSuccess(user));
        navigate('/');
      },
      onError: function(error) {
        console.error("Authentication failed:", error);
      }
    });
    
    ApperUI.showSignup("#authentication");

    return () => {
      // Clean up the authentication container
      const authContainer = document.getElementById('authentication');
      if (authContainer) {
        authContainer.innerHTML = '';
      }
    };
  }, [navigate, dispatch, isAuthenticated]);

  return (
    <div className="max-w-md mx-auto pt-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <h1 className="text-3xl font-bold mb-2">Create Account</h1>
        <p className="text-surface-600 dark:text-surface-400">
          Sign up for TaskFlow to organize your tasks efficiently
        </p>
      </motion.div>

      <div className="card p-6">
        <div 
          id="authentication" 
          className="min-h-[400px] flex items-center justify-center" 
        />
        
        <div className="mt-6 text-center">
          <p className="text-surface-600 dark:text-surface-400">
            Already have an account?{' '}
            <button 
              onClick={() => navigate('/login')}
              className="text-primary hover:text-primary-dark transition-colors"
            >
              Log in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;