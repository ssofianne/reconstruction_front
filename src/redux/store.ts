import { configureStore } from '@reduxjs/toolkit';
import worksReducer from './WorksSlice';
import authReducer from './AuthSlice';
import loggerMiddleware from './loggerMiddleware';

const store = configureStore({
  reducer: {
    works: worksReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware), // Добавление loggerMiddleware
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;