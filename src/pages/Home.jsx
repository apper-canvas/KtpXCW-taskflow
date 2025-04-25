import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Filter, Calendar, CheckCircle2 } from 'lucide-react';
import MainFeature from '../components/MainFeature';

const Home = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [showCompleted, setShowCompleted] = useState(true);
  
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
        
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="btn btn-primary flex items-center gap-2 rounded-full px-5 py-2.5 shadow-soft"
        >
          <Plus size={18} />
          <span>New Task</span>
        </motion.button>
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
                    onClick={() => setActiveFilter(filter.id)}
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
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span>Work</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>Personal</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <span>Study</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span>Health</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-surface-200 dark:border-surface-700">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={showCompleted}
                  onChange={() => setShowCompleted(!showCompleted)}
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
          <MainFeature activeFilter={activeFilter} showCompleted={showCompleted} />
        </div>
      </section>
    </div>
  );
};

export default Home;