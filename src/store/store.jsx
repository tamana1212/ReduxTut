import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import productReducer from "./productSlice"
import toastReducer from "./toastSlice"

const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productReducer,
    toast: toastReducer,
  },
});

export default store;