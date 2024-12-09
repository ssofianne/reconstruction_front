import { configureStore } from '@reduxjs/toolkit';
import worksReducer from './WorksSlice';
import authReducer from './AuthSlice';

const store = configureStore({
  reducer: {
    works: worksReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;