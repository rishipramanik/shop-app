import { combineReducers, createSlice } from '@reduxjs/toolkit';

const initialCartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    addToCart: (state, action) => {
      const { id, title, thumbnail, price } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        // If the item is already in the cart, increase the quantity
        existingItem.quantity += 1;
      } else {
        // If the item is not in the cart, add a new object
        state.items.push({
          id,
          title,
          thumbnail,
          quantity: 1,
          price,
        });
      }
    },
    removeFromCart: (state, action) => {
      const checkItem = state.items.find((item) => item.id === action.payload);
      if (checkItem) {
        if (checkItem.quantity < 2) {
          const toRemove = state.items.indexOf(checkItem);
          state.items.splice(toRemove, 1);
        } else {
          checkItem.quantity -= 1;
        }
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
