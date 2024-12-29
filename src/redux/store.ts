import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './SearchSlice';
import worksReducer from './WorksSlice';
import authReducer from './AuthSlice';
import workReducer from './WorkSlice';
import reconstructionsReducer from './ReconstructionsSlice';
import reconstructionReducer from './ReconstructionSlice';
import loggerMiddleware from './loggerMiddleware';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const store = configureStore({
  reducer: {
    search: searchReducer,
    auth: authReducer,
    works: worksReducer,
    work: workReducer,
    reconstructions: reconstructionsReducer,
    reconstruction: reconstructionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware), // Добавление loggerMiddleware
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Кастомный хук для диспетчера
export const useAppDispatch = () => useDispatch<AppDispatch>();
// Кастомный хук для селектора
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;