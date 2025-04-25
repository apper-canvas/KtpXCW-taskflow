import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  loading: false,
  error: null,
  currentTask: null,
  filters: {
    activeFilter: 'all',
    showCompleted: true
  }
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    fetchTasksStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTasksSuccess: (state, action) => {
      state.tasks = action.payload;
      state.loading = false;
    },
    fetchTasksFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addTaskSuccess: (state, action) => {
      state.tasks = [action.payload, ...state.tasks];
    },
    updateTaskSuccess: (state, action) => {
      state.tasks = state.tasks.map(task => 
        task.id === action.payload.id ? action.payload : task
      );
    },
    deleteTaskSuccess: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    setActiveFilter: (state, action) => {
      state.filters.activeFilter = action.payload;
    },
    setShowCompleted: (state, action) => {
      state.filters.showCompleted = action.payload;
    },
    setCurrentTask: (state, action) => {
      state.currentTask = action.payload;
    },
    clearCurrentTask: (state) => {
      state.currentTask = null;
    }
  },
});

export const { 
  fetchTasksStart, 
  fetchTasksSuccess, 
  fetchTasksFailure,
  addTaskSuccess,
  updateTaskSuccess,
  deleteTaskSuccess,
  setActiveFilter,
  setShowCompleted,
  setCurrentTask,
  clearCurrentTask
} = tasksSlice.actions;

export default tasksSlice.reducer;