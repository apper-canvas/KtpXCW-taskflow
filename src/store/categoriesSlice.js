import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: {
    work: { name: 'Work', color: 'bg-blue-500' },
    personal: { name: 'Personal', color: 'bg-green-500' },
    study: { name: 'Study', color: 'bg-purple-500' },
    health: { name: 'Health', color: 'bg-yellow-500' }
  },
  loading: false,
  error: null
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    fetchCategoriesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCategoriesSuccess: (state, action) => {
      // Merge the fetched categories with the predefined color mapping
      const fetchedCategories = {};
      action.payload.forEach(category => {
        fetchedCategories[category.id] = {
          name: category.name,
          color: state.categories[category.id]?.color || 'bg-gray-500' // Default color if not found
        };
      });
      state.categories = fetchedCategories;
      state.loading = false;
    },
    fetchCategoriesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  },
});

export const { 
  fetchCategoriesStart, 
  fetchCategoriesSuccess, 
  fetchCategoriesFailure 
} = categoriesSlice.actions;

export default categoriesSlice.reducer;