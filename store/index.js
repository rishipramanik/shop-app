import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './slices/cartSlice';

export const store = configureStore({
  reducer: rootReducer,
});

export const RootState = rootReducer;
export const AppDispatch = store.dispatch;
