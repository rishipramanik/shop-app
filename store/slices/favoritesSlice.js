import { combineReducers, createSlice } from '@reduxjs/toolkit';

const initialFavState = {
  items: [],
};

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState: initialFavState,
  reducers: {
    updateFavorite: (state, action) => {
      const { id, title, thumbnail, price } = action.payload;
      const existingFav = state.items.find((item) => item.id === id);
      if (existingFav) {
        const toRemove = state.items.indexOf(existingFav);
        state.items.splice(toRemove, 1);
      } else {
        state.items.push({
          id,
          title,
          thumbnail,
          price,
        });
      }
    },
    renoveFavorite: (state, action) => {
      const checkItem = state.items.find((item) => item.id === action.payload);
      if (checkItem) {
        checkItem.quantity -= 1;
      }
    },
  },
});

export const { updateFavorite } = favoriteSlice.actions;

export default favoriteSlice.reducer;
