import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    add(state, action) {
      const product = action.payload;
      const existingItem = state.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.push({ ...product, quantity: 1 });
      }
    },

    remove(state, action) {
      return state.filter((item) => item.id !== action.payload);
    },

    plus(state, action) {
      const existingItem = state.find((item) => item.id === action.payload);
      if (existingItem) {
        existingItem.quantity++;
      }
    },

    minus(state, action) {
      const existingItem = state.find((item) => item.id === action.payload);
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity--;
      }
    },
  },
});

export const { add, remove, plus, minus } = cartSlice.actions;

export default cartSlice.reducer;
