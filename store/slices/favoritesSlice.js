import { createSlice } from '@reduxjs/toolkit';

const initialFavState = {
  items: [],
};

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState: initialFavState,
  reducers: {
    updateFavorite: (state, action) => {
      const { id, title, thumbnail, price } = action.payload;
      //if item is already set to favorite, remove it from favorite array
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
  },
});

export const { updateFavorite } = favoriteSlice.actions;

export default favoriteSlice.reducer;
