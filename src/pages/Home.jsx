import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Filter, Calendar, CheckCircle2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import MainFeature from '../components/MainFeature';
import { 
  setActiveFilter, 
  setShowCompleted,
  fetchTasksStart,
  fetchTasksSuccess,
  fetchTasksFailure
} from '../store/tasksSlice';
import apperService from '../services/apperService';

const Home = () => {
  const dispatch = useDispatch();
  const { activeFilter, showCompleted } = useSelector((state) => state.tasks.filters);
  const { categories } = useSelector((state) => state.categories);
  
  useEffect(() => {
    const loadTasks = async () => {
      try {
        dispatch(fetchTasksStart());
        const tasks = await apperService.fetchTasks();
        dispatch(fetchTasksSuccess(tasks));
      } catch (error) {
        dispatch(fetchTasksFailure(error.message));
      }
    };
    
    loadTasks();
  }, [dispatch]);

  const filters = [
    { id: 'all', label: 'All Tasks' },
    { id: 'today', label: 'Today' },
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'important', label: 'Important' }
  ];
  
  return (
    <div className="space-y-8">
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            My Tasks
          </h1>
          <p className="text-surface-600 dark:text-surface-400 mt-1">
            Organize, prioritize, and complete your tasks efficiently
          </p>
        </div>
      </section>
      
      <section className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="card p-4 sticky top-24">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Filter size={18} className="text-primary" />
              <span>Filters</span>
            </h3>
            
            <ul className="space-y-1">
              {filters.map(filter => (
                <li key={filter.id}>
                  <button
                    onClick={() => dispatch(setActiveFilter(filter.id))}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-all flex items-center ${
                      activeFilter === filter.id 
                        ? 'bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light font-medium'
                        : 'hover:bg-surface-100 dark:hover:bg-surface-700'
                    }`}
                  >
                    {filter.label}
                    
                    {activeFilter === filter.id && (
                      <motion.div 
                        layoutId="activeFilterIndicator"
                        className="ml-auto w-1.5 h-5 bg-primary rounded-full"
                      />
                    )}
                  </button>
                </li>
              ))}
            </ul>
            
            <div className="mt-6 pt-4 border-t border-surface-200 dark:border-surface-700">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Calendar size={18} className="text-secondary" />
                <span>Categories</span>
              </h3>
              
              <div className="space-y-2">
                {Object.entries(categories).map(([id, category]) => (
                  <div key={id} className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                    <span>{category.name}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-surface-200 dark:border-surface-700">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={showCompleted}
                  onChange={() => dispatch(setShowCompleted(!showCompleted))}
                  className="rounded text-primary focus:ring-primary"
                />
                <span className="flex items-center gap-1">
                  <CheckCircle2 size={16} className="text-secondary" />
                  Show completed
                </span>
              </label>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-3">
          <MainFeature />
        </div>
      </section>
    </div>
  );
};

export default Home;