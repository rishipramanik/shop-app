import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import favReducer from './slices/favoritesSlice';

const rootReducer = {
  cart: cartReducer,
  fav: favReducer,
};

export const store = configureStore({
  reducer: rootReducer,
});

export default store;
