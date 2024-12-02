import { configureStore } from '@reduxjs/toolkit';
import worksReducer from './WorksSlice';

const storage = configureStore({
  reducer: {
    works: worksReducer,
  },
});

export default storage;