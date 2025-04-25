import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, Circle, Clock, Calendar, Flag, Trash2, 
  Edit, ChevronDown, ChevronUp, AlertTriangle, Plus
} from 'lucide-react';
import { format } from 'date-fns';

const MainFeature = ({ activeFilter, showCompleted }) => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [
      {
        id: '1',
        title: 'Complete project proposal',
        description: 'Finish the draft and send it to the team for review',
        isCompleted: false,
        priority: 'high',
        dueDate: new Date(Date.now() + 86400000).toISOString(), // tomorrow
        createdAt: new Date().toISOString(),
        categoryId: 'work'
      },
      {
        id: '2',
        title: 'Go for a 30-minute run',
        description: 'Morning run in the park',
        isCompleted: false,
        priority: 'medium',
        dueDate: new Date().toISOString(), // today
        createdAt: new Date().toISOString(),
        categoryId: 'health'
      },
      {
        id: '3',
        title: 'Read chapter 5 of textbook',
        description: 'Take notes on key concepts',
        isCompleted: true,
        priority: 'low',
        dueDate: new Date(Date.now() - 86400000).toISOString(), // yesterday
        createdAt: new Date().toISOString(),
        categoryId: 'study'
      }
    ];
  });
  
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: format(new Date(), 'yyyy-MM-dd'),
    categoryId: 'personal'
  });
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [expandedTaskId, setExpandedTaskId] = useState(null);
  const [editingTaskId, setEditingTaskId] = useState(null);
  
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  
  const categories = {
    work: { name: 'Work', color: 'bg-blue-500' },
    personal: { name: 'Personal', color: 'bg-green-500' },
    study: { name: 'Study', color: 'bg-purple-500' },
    health: { name: 'Health', color: 'bg-yellow-500' }
  };
  
  const priorityStyles = {
    high: { 
      badge: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
      icon: <Flag size={14} className="text-red-500" />
    },
    medium: { 
      badge: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      icon: <Flag size={14} className="text-yellow-500" />
    },
    low: { 
      badge: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      icon: <Flag size={14} className="text-blue-500" />
    }
  };
  
  const handleToggleComplete = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
    ));
  };
  
  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };
  
  const handleAddTask = (e) => {
    e.preventDefault();
    
    const newTaskItem = {
      id: Date.now().toString(),
      ...newTask,
      isCompleted: false,
      createdAt: new Date().toISOString(),
      dueDate: new Date(newTask.dueDate).toISOString()
    };
    
    setTasks([newTaskItem, ...tasks]);
    setNewTask({
      title: '',
      description: '',
      priority: 'medium',
      dueDate: format(new Date(), 'yyyy-MM-dd'),
      categoryId: 'personal'
    });
    setIsFormOpen(false);
  };
  
  const handleUpdateTask = (taskId, updatedFields) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, ...updatedFields } : task
    ));
    setEditingTaskId(null);
  };
  
  const filteredTasks = tasks.filter(task => {
    // First apply the completed filter
    if (!showCompleted && task.isCompleted) return false;
    
    // Then apply the active filter
    const today = new Date().setHours(0, 0, 0, 0);
    const taskDate = new Date(task.dueDate).setHours(0, 0, 0, 0);
    
    switch (activeFilter) {
      case 'today':
        return taskDate === today;
      case 'upcoming':
        return taskDate > today;
      case 'important':
        return task.priority === 'high';
      default:
        return true;
    }
  });
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          {activeFilter === 'all' ? 'All Tasks' : 
           activeFilter === 'today' ? 'Today\'s Tasks' :
           activeFilter === 'upcoming' ? 'Upcoming Tasks' : 'Important Tasks'}
          <span className="ml-2 text-sm font-normal text-surface-500 dark:text-surface-400">
            ({filteredTasks.length})
          </span>
        </h2>
        
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="btn btn-outline flex items-center gap-2"
        >
          {isFormOpen ? 'Cancel' : (
            <>
              <Plus size={18} />
              <span>Add Task</span>
            </>
          )}
        </motion.button>
      </div>
      
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <form onSubmit={handleAddTask} className="card p-5 mb-6 border-2 border-primary/20">
              <h3 className="text-lg font-semibold mb-4">Create New Task</h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="label">Task Title</label>
                  <input
                    id="title"
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                    className="input"
                    placeholder="What needs to be done?"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="label">Description (Optional)</label>
                  <textarea
                    id="description"
                    value={newTask.description}
                    onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                    className="input min-h-[80px]"
                    placeholder="Add details about this task..."
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="priority" className="label">Priority</label>
                    <select
                      id="priority"
                      value={newTask.priority}
                      onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                      className="input"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="dueDate" className="label">Due Date</label>
                    <input
                      id="dueDate"
                      type="date"
                      value={newTask.dueDate}
                      onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                      className="input"
                      min={format(new Date(), 'yyyy-MM-dd')}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="category" className="label">Category</label>
                    <select
                      id="category"
                      value={newTask.categoryId}
                      onChange={(e) => setNewTask({...newTask, categoryId: e.target.value})}
                      className="input"
                    >
                      {Object.entries(categories).map(([id, category]) => (
                        <option key={id} value={id}>{category.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="btn btn-outline"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    Create Task
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      
      {filteredTasks.length === 0 ? (
        <div className="card p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-surface-100 dark:bg-surface-700 flex items-center justify-center">
            <CheckCircle2 size={32} className="text-surface-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No tasks found</h3>
          <p className="text-surface-500 dark:text-surface-400 mb-6">
            {isFormOpen 
              ? "Create a new task using the form above" 
              : "Click the 'Add Task' button to create a new task"}
          </p>
          
          {!isFormOpen && (
            <button
              onClick={() => setIsFormOpen(true)}
              className="btn btn-primary mx-auto"
            >
              <Plus size={18} className="mr-2" />
              Add Your First Task
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {filteredTasks.map(task => (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                className={`card overflow-hidden ${
                  task.isCompleted ? 'bg-surface-50/50 dark:bg-surface-800/50' : ''
                }`}
              >
                {editingTaskId === task.id ? (
                  <div className="p-4">
                    <div className="space-y-4">
                      <div>
                        <label className="label">Task Title</label>
                        <input
                          type="text"
                          value={task.title}
                          onChange={(e) => handleUpdateTask(task.id, { title: e.target.value })}
                          className="input"
                        />
                      </div>
                      
                      <div>
                        <label className="label">Description</label>
                        <textarea
                          value={task.description}
                          onChange={(e) => handleUpdateTask(task.id, { description: e.target.value })}
                          className="input min-h-[80px]"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="label">Priority</label>
                          <select
                            value={task.priority}
                            onChange={(e) => handleUpdateTask(task.id, { priority: e.target.value })}
                            className="input"
                          >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="label">Due Date</label>
                          <input
                            type="date"
                            value={format(new Date(task.dueDate), 'yyyy-MM-dd')}
                            onChange={(e) => handleUpdateTask(task.id, { 
                              dueDate: new Date(e.target.value).toISOString() 
                            })}
                            className="input"
                          />
                        </div>
                        
                        <div>
                          <label className="label">Category</label>
                          <select
                            value={task.categoryId}
                            onChange={(e) => handleUpdateTask(task.id, { categoryId: e.target.value })}
                            className="input"
                          >
                            {Object.entries(categories).map(([id, category]) => (
                              <option key={id} value={id}>{category.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      
                      <div className="flex justify-end gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => setEditingTaskId(null)}
                          className="btn btn-outline"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingTaskId(null)}
                          className="btn btn-primary"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="p-4 flex items-start gap-3">
                      <button 
                        onClick={() => handleToggleComplete(task.id)}
                        className="mt-0.5 flex-shrink-0 text-surface-400 hover:text-primary transition-colors"
                      >
                        {task.isCompleted ? (
                          <CheckCircle2 size={22} className="text-primary" />
                        ) : (
                          <Circle size={22} />
                        )}
                      </button>
                      
                      <div className="flex-grow min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className={`font-medium ${
                            task.isCompleted ? 'line-through text-surface-500 dark:text-surface-400' : ''
                          }`}>
                            {task.title}
                          </h3>
                          
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`badge ${priorityStyles[task.priority].badge} flex items-center gap-1`}>
                              {priorityStyles[task.priority].icon}
                              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                            </span>
                            
                            <span className={`badge flex items-center gap-1 ${
                              categories[task.categoryId]?.color.replace('bg-', 'bg-opacity-20 text-')
                            }`}>
                              <div className={`w-2 h-2 rounded-full ${categories[task.categoryId]?.color}`}></div>
                              {categories[task.categoryId]?.name}
                            </span>
                          </div>
                        </div>
                        
                        {task.description && (
                          <p className={`text-sm text-surface-600 dark:text-surface-400 mb-2 ${
                            task.isCompleted ? 'line-through opacity-70' : ''
                          }`}>
                            {expandedTaskId === task.id 
                              ? task.description 
                              : task.description.length > 100 
                                ? `${task.description.substring(0, 100)}...` 
                                : task.description
                            }
                          </p>
                        )}
                        
                        <div className="flex items-center text-xs text-surface-500 dark:text-surface-400 gap-4">
                          <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            <span>
                              Due: {format(new Date(task.dueDate), 'MMM d, yyyy')}
                            </span>
                            
                            {new Date(task.dueDate) < new Date().setHours(0, 0, 0, 0) && !task.isCompleted && (
                              <span className="text-red-500 flex items-center gap-1">
                                <AlertTriangle size={14} />
                                Overdue
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-1">
                            <Clock size={14} />
                            <span>
                              Created: {format(new Date(task.createdAt), 'MMM d')}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setEditingTaskId(task.id)}
                          className="p-1.5 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-500 hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-200 transition-colors"
                          aria-label="Edit task"
                        >
                          <Edit size={16} />
                        </button>
                        
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="p-1.5 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-500 hover:text-red-500 dark:text-surface-400 dark:hover:text-red-400 transition-colors"
                          aria-label="Delete task"
                        >
                          <Trash2 size={16} />
                        </button>
                        
                        {task.description && task.description.length > 100 && (
                          <button
                            onClick={() => setExpandedTaskId(expandedTaskId === task.id ? null : task.id)}
                            className="p-1.5 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-500 hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-200 transition-colors"
                            aria-label={expandedTaskId === task.id ? "Show less" : "Show more"}
                          >
                            {expandedTaskId === task.id ? (
                              <ChevronUp size={16} />
                            ) : (
                              <ChevronDown size={16} />
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default MainFeature;